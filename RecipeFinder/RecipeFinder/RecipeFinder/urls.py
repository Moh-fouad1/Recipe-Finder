from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from accounts.forms import RecipeLoginForm
from accounts.views import signup
from recipes.views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('recipes/', include('recipes.urls')),
    path(
        'accounts/login/',
        auth_views.LoginView.as_view(template_name='accounts/login.html', authentication_form=RecipeLoginForm),
        name='login',
    ),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('accounts/signup/', signup, name='signup'),
]