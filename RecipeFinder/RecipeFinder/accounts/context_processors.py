def account_nav(request):
    """Safe admin flag for templates (avoids errors when Profile is missing)."""
    is_admin = False
    if request.user.is_authenticated and hasattr(request.user, 'profile'):
        is_admin = request.user.profile.account_type == 'admin'
    return {'user_is_admin': is_admin}
