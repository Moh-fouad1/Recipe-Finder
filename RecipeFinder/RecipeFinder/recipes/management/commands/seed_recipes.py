from django.core.management.base import BaseCommand
from recipes.models import Recipe, Ingredient

DEFAULT_RECIPES = [
    {
        'id': '1',
        'name': 'Chicken Alfredo Pasta',
        'course': 'Main Course',
        'description': 'Creamy fettuccine Alfredo with grilled chicken breast.',
        'ingredients': [
            {'ingredient_id': 'ing101', 'name': 'Fettuccine pasta', 'quantity': '200g'},
            {'ingredient_id': 'ing102', 'name': 'Heavy cream', 'quantity': '1 cup'},
            {'ingredient_id': 'ing103', 'name': 'Parmesan cheese', 'quantity': '1/2 cup grated'},
            {'ingredient_id': 'ing104', 'name': 'Chicken breast', 'quantity': '2 pieces'},
        ],
    },
    {
        'id': '2',
        'name': 'Chicken Parm with Pink Sauce Pasta',
        'course': 'Main Course',
        'description': 'Breaded chicken cutlets topped with mozzarella and served with pink sauce pasta.',
        'ingredients': [
            {'ingredient_id': 'ing201', 'name': 'Chicken breast', 'quantity': '2 pieces'},
            {'ingredient_id': 'ing202', 'name': 'Breadcrumbs', 'quantity': '1 cup'},
            {'ingredient_id': 'ing203', 'name': 'Mozzarella cheese', 'quantity': '100g'},
            {'ingredient_id': 'ing204', 'name': 'Tomato sauce', 'quantity': '1 cup'},
            {'ingredient_id': 'ing205', 'name': 'Heavy cream', 'quantity': '1/4 cup'},
        ],
    },
    {
        'id': '3',
        'name': 'Chicken Shawarma',
        'course': 'Main Course',
        'description': 'Middle Eastern spiced chicken wrapped in pita with garlic sauce.',
        'ingredients': [
            {'ingredient_id': 'ing301', 'name': 'Chicken thighs', 'quantity': '500g'},
            {'ingredient_id': 'ing302', 'name': 'Shawarma spice mix', 'quantity': '2 tbsp'},
            {'ingredient_id': 'ing303', 'name': 'Garlic', 'quantity': '4 cloves'},
            {'ingredient_id': 'ing304', 'name': 'Yogurt', 'quantity': '1/2 cup'},
        ],
    },
    {
        'id': '4',
        'name': 'Crispy Vegetable Spring Rolls',
        'course': 'Appetizers',
        'description': 'Golden fried rolls filled with shredded vegetables.',
        'ingredients': [
            {'ingredient_id': 'ing401', 'name': 'Spring roll wrappers', 'quantity': '10 pieces'},
            {'ingredient_id': 'ing402', 'name': 'Cabbage', 'quantity': '1 cup shredded'},
            {'ingredient_id': 'ing403', 'name': 'Carrot', 'quantity': '1 cup julienned'},
            {'ingredient_id': 'ing404', 'name': 'Soy sauce', 'quantity': '2 tbsp'},
        ],
    },
    {
        'id': '5',
        'name': 'Spicy Buffalo Wings',
        'course': 'Appetizers',
        'description': 'Crispy chicken wings coated in spicy buffalo sauce.',
        'ingredients': [
            {'ingredient_id': 'ing501', 'name': 'Chicken wings', 'quantity': '12 pieces'},
            {'ingredient_id': 'ing502', 'name': 'Hot sauce', 'quantity': '1/2 cup'},
            {'ingredient_id': 'ing503', 'name': 'Butter', 'quantity': '2 tbsp'},
        ],
    },
    {
        'id': '6',
        'name': 'Traditional Beef Lasagna',
        'course': 'Main Course',
        'description': 'Layered pasta with rich meat sauce and béchamel.',
        'ingredients': [
            {'ingredient_id': 'ing601', 'name': 'Lasagna noodles', 'quantity': '12 sheets'},
            {'ingredient_id': 'ing602', 'name': 'Ground beef', 'quantity': '500g'},
            {'ingredient_id': 'ing603', 'name': 'Tomato sauce', 'quantity': '2 cups'},
            {'ingredient_id': 'ing604', 'name': 'Ricotta cheese', 'quantity': '250g'},
            {'ingredient_id': 'ing605', 'name': 'Mozzarella', 'quantity': '200g'},
        ],
    },
    {
        'id': '7',
        'name': 'Rich Chocolate Lava Cake',
        'course': 'Dessert',
        'description': 'Warm chocolate cake with a gooey molten centre.',
        'ingredients': [
            {'ingredient_id': 'ing701', 'name': 'Dark chocolate', 'quantity': '150g'},
            {'ingredient_id': 'ing702', 'name': 'Butter', 'quantity': '100g'},
            {'ingredient_id': 'ing703', 'name': 'Eggs', 'quantity': '2 large'},
            {'ingredient_id': 'ing704', 'name': 'Sugar', 'quantity': '1/2 cup'},
            {'ingredient_id': 'ing705', 'name': 'Flour', 'quantity': '1/4 cup'},
        ],
    },
    {
        'id': '8',
        'name': 'Classic New York Cheesecake',
        'course': 'Dessert',
        'description': 'Creamy and dense cheesecake with a graham cracker crust.',
        'ingredients': [
            {'ingredient_id': 'ing801', 'name': 'Cream cheese', 'quantity': '500g'},
            {'ingredient_id': 'ing802', 'name': 'Sugar', 'quantity': '1 cup'},
            {'ingredient_id': 'ing803', 'name': 'Eggs', 'quantity': '3 large'},
            {'ingredient_id': 'ing804', 'name': 'Graham cracker crumbs', 'quantity': '1.5 cups'},
        ],
    },
]


class Command(BaseCommand):
    help = 'Load default recipes from the original client data (skips existing IDs).'

    def handle(self, *args, **options):
        added = 0
        for data in DEFAULT_RECIPES:
            if Recipe.objects.filter(pk=data['id']).exists():
                continue
            ingredients = data.pop('ingredients')
            recipe = Recipe.objects.create(**data)
            for ing in ingredients:
                Ingredient.objects.create(recipe=recipe, **ing)
            added += 1
            self.stdout.write(f"Added recipe: {recipe.name}")
        self.stdout.write(self.style.SUCCESS(f'Done. {added} recipe(s) added.'))
