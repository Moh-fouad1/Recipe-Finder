import logging
import uuid

from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Count, Q

from .forms import IngredientFormSet, RecipeForm
from .models import Recipe

User = get_user_model()
logger = logging.getLogger('recipes')


def generate_recipe_id() -> str:
    return f'R-{uuid.uuid4().hex[:8].upper()}'


def get_dashboard_stats() -> dict:
    """Aggregate counts for the admin dashboard."""
    course_counts = (
        Recipe.objects.values('course')
        .annotate(total=Count('id'))
    )
    by_course = {row['course']: row['total'] for row in course_counts}

    return {
        'total_recipes': Recipe.objects.count(),
        'total_desserts': by_course.get('Dessert', 0),
        'total_appetizers': by_course.get('Appetizers', 0),
        'total_main_course': by_course.get('Main Course', 0),
        'total_users': User.objects.count(),
    }


def filter_recipes(query: str = '', course: str = '') -> list:
    """Search by name and optionally filter by course."""
    qs = Recipe.objects.all()
    if query:
        qs = qs.filter(name__icontains=query.strip())
    if course:
        qs = qs.filter(course=course)
    return list(qs.order_by('name'))


@transaction.atomic
def create_recipe(request) -> tuple[Recipe | None, RecipeForm, IngredientFormSet, list[str]]:
    """
    Validate and persist a new recipe with ingredients.
    Returns (recipe, form, formset, error_messages).
    """
    form = RecipeForm(request.POST, request.FILES)
    formset = IngredientFormSet(request.POST, prefix='ingredients')  # prefix must match template/JS

    errors = []
    if not form.is_valid():
        errors.extend(_flatten_form_errors(form))
    if not formset.is_valid():
        errors.extend(_flatten_formset_errors(formset))

    if errors:
        return None, form, formset, errors

    try:
        recipe = form.save(commit=False)
        if not recipe.id:
            recipe.id = generate_recipe_id()
        recipe.created_by = request.user
        recipe.save()

        formset.instance = recipe
        formset.save()
        logger.info('Admin %s created recipe %s', request.user.username, recipe.id)
        return recipe, form, formset, []
    except Exception as exc:
        logger.exception('Failed to create recipe: %s', exc)
        return None, form, formset, ['Could not save recipe. Please try again.']


@transaction.atomic
def update_recipe(request, recipe: Recipe) -> tuple[Recipe | None, RecipeForm, IngredientFormSet, list[str]]:
    """Update recipe and related ingredients."""
    form = RecipeForm(request.POST, request.FILES, instance=recipe)
    formset = IngredientFormSet(request.POST, instance=recipe, prefix='ingredients')

    errors = []
    if not form.is_valid():
        errors.extend(_flatten_form_errors(form))
    if not formset.is_valid():
        errors.extend(_flatten_formset_errors(formset))

    if errors:
        return None, form, formset, errors

    try:
        recipe = form.save()
        formset.save()
        logger.info('Admin %s updated recipe %s', request.user.username, recipe.id)
        return recipe, form, formset, []
    except Exception as exc:
        logger.exception('Failed to update recipe %s: %s', recipe.id, exc)
        return None, form, formset, ['Could not update recipe. Please try again.']


@transaction.atomic
def delete_recipe(recipe: Recipe, username: str) -> None:
    recipe_id = recipe.id
    recipe.delete()
    logger.info('Admin %s deleted recipe %s', username, recipe_id)


def _flatten_form_errors(form) -> list[str]:
    messages = []
    for field, field_errors in form.errors.items():
        label = form.fields[field].label if field in form.fields else field
        for err in field_errors:
            messages.append(f'{label}: {err}')
    return messages


def _flatten_formset_errors(formset) -> list[str]:
    messages = []
    for i, form_errors in enumerate(formset.errors):
        if form_errors:
            for field, errs in form_errors.items():
                for err in errs:
                    messages.append(f'Ingredient {i + 1} ({field}): {err}')
    if formset.non_form_errors():
        for err in formset.non_form_errors():
            messages.append(str(err))
    return messages
