from django.contrib import admin

from .models import Favorite, Ingredient, Recipe


class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 1


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'course', 'created_at', 'updated_at')
    list_filter = ('course',)
    search_fields = ('name', 'id')
    inlines = [IngredientInline]


admin.site.register(Favorite)
