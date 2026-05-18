from django import forms
from django.core.exceptions import ValidationError

from .models import Ingredient, Recipe
from .utils import validate_quantity, validate_recipe_image


class RecipeForm(forms.ModelForm):
    """Recipe fields with uniqueness and image validation."""

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'course', 'description', 'image']
        widgets = {
            'id': forms.TextInput(attrs={'placeholder': 'Leave blank to auto-generate'}),
            'name': forms.TextInput(attrs={'placeholder': 'Recipe name'}),
            'description': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Describe the recipe'}),
            'course': forms.Select(attrs={'class': 'form-select'}),
            'image': forms.FileInput(attrs={'accept': 'image/*'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['id'].required = False
        self.fields['description'].required = True
        if self.instance and self.instance.pk:
            self.fields['id'].disabled = True

    def clean_name(self):
        name = self.cleaned_data['name'].strip()
        if not name:
            raise ValidationError('Recipe name is required.')
        qs = Recipe.objects.filter(name__iexact=name)
        if self.instance.pk:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise ValidationError('A recipe with this name already exists.')
        return name

    def clean_description(self):
        description = (self.cleaned_data.get('description') or '').strip()
        if len(description) < 10:
            raise ValidationError('Description must be at least 10 characters.')
        return description

    def clean_image(self):
        image = self.cleaned_data.get('image')
        validate_recipe_image(image)
        return image

    def clean(self):
        cleaned = super().clean()
        if self.instance.pk and 'id' in self.fields and self.fields['id'].disabled:
            cleaned['id'] = self.instance.pk
        return cleaned


class IngredientForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        fields = ('name', 'quantity')
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'e.g. Flour', 'required': True}),
            'quantity': forms.TextInput(attrs={'placeholder': 'e.g. 2 cups', 'required': True}),
        }

    def clean_name(self):
        name = (self.cleaned_data.get('name') or '').strip()
        if len(name) < 2:
            raise ValidationError('Ingredient name must be at least 2 characters.')
        return name

    def clean_quantity(self):
        quantity = (self.cleaned_data.get('quantity') or '').strip()
        validate_quantity(quantity)
        return quantity


IngredientFormSet = forms.inlineformset_factory(
    Recipe,
    Ingredient,
    form=IngredientForm,
    fields=('name', 'quantity'),
    extra=1,
    can_delete=True,
    min_num=1,
    validate_min=True,
)
