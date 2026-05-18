from functools import wraps

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.urls import reverse

from .models import Recipe, Favorite
from .forms import RecipeForm, IngredientFormSet


def admin_only(view_func):
    """Require login and profile.account_type == 'admin'; otherwise redirect with a message."""

    @wraps(view_func)
    def _wrapped(request, *args, **kwargs):
        if not request.user.is_authenticated:
            login_url = reverse('login')
            return redirect(f'{login_url}?next={request.get_full_path()}')
        if not hasattr(request.user, 'profile'):
            messages.error(request, 'Your account profile is missing. Please contact support.')
            return redirect('home')
        if request.user.profile.account_type != 'admin':
            messages.error(request, 'You need an admin account to access that page.')
            return redirect('home')
        return view_func(request, *args, **kwargs)

    return _wrapped

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
    query = request.GET.get('q', '')
    results = Recipe.objects.filter(name__icontains=query) if query else []
    return render(request, 'recipes/search_results.html', {'query': query, 'results': results})

@admin_only
def manage_recipes(request):
    recipes = Recipe.objects.all().order_by('id')
    return render(request, 'recipes/admin/manage_recipes.html', {'recipes': recipes})

@admin_only
def add_recipe(request):
    if request.method == 'POST':
        form = RecipeForm(request.POST)
        formset = IngredientFormSet(request.POST)
        if form.is_valid() and formset.is_valid():
            recipe = form.save(commit=False)
            recipe.created_by = request.user
            recipe.save()
            ingredients = formset.save(commit=False)
            for ing in ingredients:
                ing.recipe = recipe
                ing.save()
            formset.save_m2m()
            messages.success(request, 'Recipe added successfully.')
            return redirect('recipes:manage_recipes')
    else:
        form = RecipeForm()
        formset = IngredientFormSet()
    return render(request, 'recipes/admin/add_recipe.html', {'form': form, 'formset': formset})

@admin_only
def edit_recipe(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    if request.method == 'POST':
        form = RecipeForm(request.POST, instance=recipe)
        formset = IngredientFormSet(request.POST, instance=recipe)
        if form.is_valid() and formset.is_valid():
            form.save()
            formset.save()
            messages.success(request, 'Recipe updated.')
            return redirect('recipes:manage_recipes')
    else:
        form = RecipeForm(instance=recipe)
        formset = IngredientFormSet(instance=recipe)
    return render(request, 'recipes/admin/edit_recipe.html', {'form': form, 'formset': formset, 'recipe': recipe})

@admin_only
def delete_recipe(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    if request.method == 'POST':
        recipe.delete()
        messages.success(request, 'Recipe deleted.')
        return redirect('recipes:manage_recipes')
    return redirect('recipes:manage_recipes')