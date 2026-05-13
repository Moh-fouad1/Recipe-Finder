from django.urls import path
from . import views

app_name = 'recipes'
urlpatterns = [
    path('', views.recipe_list, name='recipe_list'),
    path('recipe/<str:pk>/', views.recipe_detail, name='recipe_detail'),
    path('favorite/<str:pk>/', views.toggle_favorite, name='toggle_favorite'),
    path('favorites/', views.favorites_list, name='favorites'),
    path('search/', views.search_results, name='search'),
    path('admin/manage/', views.manage_recipes, name='manage_recipes'),
    path('admin/add/', views.add_recipe, name='add_recipe'),
    path('admin/edit/<str:pk>/', views.edit_recipe, name='edit_recipe'),
    path('admin/delete/<str:pk>/', views.delete_recipe, name='delete_recipe'),
]