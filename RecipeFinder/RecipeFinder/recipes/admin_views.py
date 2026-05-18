import logging

from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.views import View
from django.views.generic import TemplateView

from .exports import build_export_csv_response, build_export_pdf_response, get_filtered_recipes_for_export
from .forms import IngredientFormSet, RecipeForm
from .mixins import AdminRequiredMixin
from .models import Recipe
from . import services

logger = logging.getLogger('recipes')


class AdminDashboardView(AdminRequiredMixin, TemplateView):
    template_name = 'recipes/admin/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['stats'] = services.get_dashboard_stats()
        return context


class AdminRecipeListView(AdminRequiredMixin, View):
    """Manage recipes with search and course filter."""

    template_name = 'recipes/admin/manage_recipes.html'

    def get(self, request):
        query = request.GET.get('q', '').strip()
        course = request.GET.get('course', '').strip()
        recipes = services.filter_recipes(query, course)
        return render(request, self.template_name, {
            'recipes': recipes,
            'query': query,
            'course_filter': course,
            'course_choices': Recipe.COURSE_CHOICES,
            'stats': services.get_dashboard_stats(),
        })


class AdminRecipeCreateView(AdminRequiredMixin, View):
    template_name = 'recipes/admin/add_recipe.html'

    def get(self, request):
        return render(request, self.template_name, {
            'form': RecipeForm(),
            'formset': IngredientFormSet(prefix='ingredients'),
        })

    def post(self, request):
        try:
            recipe, form, formset, errors = services.create_recipe(request)
        except Exception as exc:
            logger.exception('Unexpected error creating recipe: %s', exc)
            messages.error(request, 'An unexpected error occurred.')
            return render(request, self.template_name, {
                'form': RecipeForm(request.POST, request.FILES),
                'formset': IngredientFormSet(request.POST, prefix='ingredients'),
            })

        if recipe:
            messages.success(request, f'Recipe "{recipe.name}" added successfully.')
            return redirect('recipes:manage_recipes')

        for err in errors:
            messages.error(request, err)
        return render(request, self.template_name, {'form': form, 'formset': formset})


class AdminRecipeUpdateView(AdminRequiredMixin, View):
    template_name = 'recipes/admin/edit_recipe.html'

    def get(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        return render(request, self.template_name, {
            'recipe': recipe,
            'form': RecipeForm(instance=recipe),
            'formset': IngredientFormSet(instance=recipe, prefix='ingredients'),
        })

    def post(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        try:
            updated, form, formset, errors = services.update_recipe(request, recipe)
        except Exception as exc:
            logger.exception('Unexpected error updating recipe %s: %s', pk, exc)
            messages.error(request, 'An unexpected error occurred.')
            return redirect('recipes:edit_recipe', pk=pk)

        if updated:
            messages.success(request, f'Recipe "{updated.name}" updated successfully.')
            return redirect('recipes:manage_recipes')

        for err in errors:
            messages.error(request, err)
        return render(request, self.template_name, {
            'recipe': recipe,
            'form': form,
            'formset': formset,
        })


class AdminRecipeDeleteView(AdminRequiredMixin, View):
    def post(self, request, pk):
        recipe = get_object_or_404(Recipe, pk=pk)
        name = recipe.name
        try:
            services.delete_recipe(recipe, request.user.username)
            messages.success(request, f'Recipe "{name}" deleted.')
        except Exception as exc:
            logger.exception('Failed to delete recipe %s: %s', pk, exc)
            messages.error(request, 'Could not delete recipe.')
        return redirect('recipes:manage_recipes')


class AdminExportCSVView(AdminRequiredMixin, View):
    """Download filtered recipes as CSV."""

    def get(self, request):
        query = request.GET.get('q', '').strip()
        course = request.GET.get('course', '').strip()
        try:
            recipes = get_filtered_recipes_for_export(query, course)
            return build_export_csv_response(recipes, request.user.username)
        except Exception as exc:
            logger.exception('CSV export failed: %s', exc)
            messages.error(request, 'Could not generate CSV export.')
            return redirect('recipes:manage_recipes')


class AdminExportPDFView(AdminRequiredMixin, View):
    """Download filtered recipes as PDF."""

    def get(self, request):
        query = request.GET.get('q', '').strip()
        course = request.GET.get('course', '').strip()
        try:
            recipes = get_filtered_recipes_for_export(query, course)
            return build_export_pdf_response(recipes, request.user.username, query, course)
        except Exception as exc:
            logger.exception('PDF export failed: %s', exc)
            messages.error(request, 'Could not generate PDF export.')
            return redirect('recipes:manage_recipes')
