from django.urls import path

from . import views
from .admin_views import (
    AdminDashboardView,
    AdminRecipeCreateView,
    AdminRecipeDeleteView,
    AdminRecipeListView,
    AdminRecipeUpdateView,
)

app_name = 'recipes'

urlpatterns = [
    # Public recipe browsing
    path('', views.recipe_list, name='recipe_list'),
    path('recipe/<str:pk>/', views.recipe_detail, name='recipe_detail'),
    path('favorite/<str:pk>/', views.toggle_favorite, name='toggle_favorite'),
    path('favorites/', views.favorites_list, name='favorites'),
    path('search/', views.search_results, name='search'),
    # Admin recipe management (requires admin profile)
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('admin/manage/', AdminRecipeListView.as_view(), name='manage_recipes'),
    path('admin/add/', AdminRecipeCreateView.as_view(), name='add_recipe'),
    path('admin/edit/<str:pk>/', AdminRecipeUpdateView.as_view(), name='edit_recipe'),
    path('admin/delete/<str:pk>/', AdminRecipeDeleteView.as_view(), name='delete_recipe'),
]
