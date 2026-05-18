from django.core.management.base import BaseCommand, CommandError

from recipes.utils import get_backup_dir, restore_db_backup


class Command(BaseCommand):
    help = 'Restore the SQLite database from a file in backups/. Usage: python manage.py restore_backup backup_YYYYMMDD_HHMMSS.sqlite3'

    def add_arguments(self, parser):
        parser.add_argument('backup_filename', type=str, help='Backup file name inside backups/')

    def handle(self, *args, **options):
        filename = options['backup_filename']
        backup_dir = get_backup_dir()
        if not (backup_dir / filename).exists():
            available = [p.name for p in backup_dir.glob('backup_*.sqlite3')]
            raise CommandError(
                f'Backup "{filename}" not found in {backup_dir}. '
                f'Available: {", ".join(available) or "none"}'
            )

        try:
            restore_db_backup(filename)
        except Exception as exc:
            raise CommandError(str(exc)) from exc

        self.stdout.write(self.style.SUCCESS(f'Database restored from {filename}.'))
