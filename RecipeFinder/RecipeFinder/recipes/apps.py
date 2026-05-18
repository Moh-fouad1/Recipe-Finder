import logging

from django.apps import AppConfig
from django.db.models.signals import pre_migrate

logger = logging.getLogger('recipes')


_migration_backup_done = False


def backup_database_before_migrate(sender, **kwargs):
    """Automatic SQLite backup once per migrate command (before migrations run)."""
    global _migration_backup_done
    if _migration_backup_done:
        return
    _migration_backup_done = True

    from .utils import create_db_backup

    try:
        create_db_backup()
    except Exception as exc:
        logger.exception('Pre-migration backup failed: %s', exc)


class RecipesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'recipes'

    def ready(self):
        pre_migrate.connect(backup_database_before_migrate)
