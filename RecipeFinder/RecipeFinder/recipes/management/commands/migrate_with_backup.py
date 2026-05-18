from django.core.management import call_command
from django.core.management.base import BaseCommand

from recipes.utils import create_db_backup


class Command(BaseCommand):
    """
    Run migrations after an explicit database backup.
    (pre_migrate signal also backs up automatically; this command is for manual safety.)
    """

    help = 'Create a DB backup, then run migrate.'

    def add_arguments(self, parser):
        parser.add_argument('app_label', nargs='*')
        parser.add_argument('--noinput', action='store_true')

    def handle(self, *args, **options):
        backup_path = create_db_backup()
        if backup_path:
            self.stdout.write(self.style.SUCCESS(f'Backup created: {backup_path.name}'))
        call_command('migrate', *options.get('app_label', []), verbosity=options.get('verbosity', 1))
