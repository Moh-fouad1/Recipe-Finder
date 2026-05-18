from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render

from .models import Favorite, Recipe


def home(request):
    return render(request, 'home.html')


def recipe_list(request):
    recipes = Recipe.objects.all().order_by('name')
    return render(request, 'recipes/recipe_list.html', {'recipes': recipes})


def recipe_detail(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    is_favorite = False
    if request.user.is_authenticated:
        is_favorite = Favorite.objects.filter(user=request.user, recipe=recipe).exists()
    return render(request, 'recipes/recipe_detail.html', {
        'recipe': recipe,
        'is_favorite': is_favorite,
    })


@login_required
def toggle_favorite(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    fav, created = Favorite.objects.get_or_create(user=request.user, recipe=recipe)
    if not created:
        fav.delete()
    return redirect('recipes:recipe_detail', pk=pk)


@login_required
def favorites_list(request):
    favorites = request.user.favorites.select_related('recipe').all()
    return render(request, 'recipes/favorites.html', {'favorites': favorites})


def search_results(request):
    query = request.GET.get('q', '').strip()
    results = Recipe.objects.filter(name__icontains=query) if query else Recipe.objects.none()
    return render(request, 'recipes/search_results.html', {'query': query, 'results': results})
