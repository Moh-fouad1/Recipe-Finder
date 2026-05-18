import logging
import re
import shutil
from datetime import datetime
from pathlib import Path

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile

logger = logging.getLogger('recipes')

# Quantity must contain at least one digit and reasonable length (e.g. "2 cups", "500g").
QUANTITY_PATTERN = re.compile(r'.*\d.*', re.DOTALL)

ALLOWED_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


def get_backup_dir() -> Path:
    backup_dir = Path(getattr(settings, 'BACKUP_DIR', settings.BASE_DIR / 'backups'))
    backup_dir.mkdir(parents=True, exist_ok=True)
    return backup_dir


def get_database_path() -> Path:
    return Path(settings.DATABASES['default']['NAME'])


def create_db_backup() -> Path:
    """
    Copy the SQLite database into backups/backup_YYYYMMDD_HHMMSS.sqlite3.
    Called automatically before migrations (see recipes.apps).
    """
    db_path = get_database_path()
    if not db_path.exists():
        logger.warning('Database file not found at %s; skipping backup.', db_path)
        return None

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = get_backup_dir() / f'backup_{timestamp}.sqlite3'
    shutil.copy2(db_path, backup_path)
    logger.info('Database backup created: %s', backup_path.name)
    return backup_path


def restore_db_backup(backup_filename: str) -> Path:
    """Replace the active database with a file from backups/."""
    backup_path = get_backup_dir() / backup_filename
    if not backup_path.is_file():
        raise FileNotFoundError(f'Backup not found: {backup_filename}')

    db_path = get_database_path()
    # Safety copy of current DB before overwrite.
    create_db_backup()
    shutil.copy2(backup_path, db_path)
    logger.info('Database restored from %s', backup_filename)
    return db_path


def validate_quantity(value: str) -> None:
    value = (value or '').strip()
    if len(value) < 2:
        raise ValidationError('Quantity is too short.')
    if len(value) > 100:
        raise ValidationError('Quantity must be 100 characters or fewer.')
    if not QUANTITY_PATTERN.match(value):
        raise ValidationError('Quantity must include a number (e.g. "2 cups", "500g").')


def validate_recipe_image(image: UploadedFile) -> None:
    if not image:
        return

    ext = Path(image.name).suffix.lower()
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValidationError(
            f'Unsupported image type "{ext}". Allowed: {", ".join(sorted(ALLOWED_IMAGE_EXTENSIONS))}.'
        )

    if image.size > MAX_IMAGE_SIZE_BYTES:
        raise ValidationError('Image must be 5 MB or smaller.')
