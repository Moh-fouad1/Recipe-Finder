from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator


def recipe_image_upload_path(instance, filename):
    """Store uploaded images under media/recipes/."""
    safe_name = filename.replace(' ', '_')
    return f'recipes/{instance.id}_{safe_name}'


class Recipe(models.Model):
    COURSE_CHOICES = [
        ('Appetizers', 'Appetizers'),
        ('Main Course', 'Main Course'),
        ('Dessert', 'Dessert'),
        ('Beverages', 'Beverages'),
    ]

    id = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=200, unique=True)
    course = models.CharField(max_length=20, choices=COURSE_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to=recipe_image_upload_path, blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    # Legacy optional field kept for existing rows; not required in admin UI.
    ingredient_id = models.CharField(max_length=20, blank=True)
    name = models.CharField(max_length=100, validators=[MinLengthValidator(2)])
    quantity = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name} ({self.quantity})'


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'recipe')
