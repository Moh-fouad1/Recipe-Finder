from django import forms
from .models import Recipe, Ingredient

class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'course', 'description']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['id'].disabled = True

IngredientFormSet = forms.inlineformset_factory(
    Recipe, Ingredient, fields=('ingredient_id', 'name', 'quantity'),
    extra=1, can_delete=True, widgets={
        'ingredient_id': forms.TextInput(attrs={'placeholder': 'e.g., ING001'}),
        'name': forms.TextInput(attrs={'placeholder': 'Ingredient name'}),
        'quantity': forms.TextInput(attrs={'placeholder': 'e.g., 2 cups'}),
    }
)