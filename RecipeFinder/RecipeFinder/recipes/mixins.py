from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse


class AdminRequiredMixin(LoginRequiredMixin):
    """
    Restrict views to authenticated users with profile.account_type == 'admin'.
    Non-admins are redirected to home with a message.
    """

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()

        if not hasattr(request.user, 'profile'):
            messages.error(request, 'Your account profile is missing. Please contact support.')
            return redirect('home')

        if request.user.profile.account_type != 'admin':
            messages.error(request, 'You need an admin account to access that page.')
            return redirect('home')

        return super().dispatch(request, *args, **kwargs)

    def get_login_url(self):
        return reverse('login')
