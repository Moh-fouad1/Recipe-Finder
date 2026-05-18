from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from accounts.models import Profile


class Command(BaseCommand):
    help = 'Create Profile rows for users that do not have one yet.'

    def handle(self, *args, **options):
        created = 0
        for user in User.objects.all():
            if not Profile.objects.filter(user=user).exists():
                Profile.objects.create(user=user, account_type='admin' if user.is_superuser else 'user')
                created += 1
                self.stdout.write(f'Created profile for {user.username}')
        self.stdout.write(self.style.SUCCESS(f'Done. {created} profile(s) created.'))
