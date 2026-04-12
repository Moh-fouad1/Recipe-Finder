document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ingredientsContainer');
    const addBtn = document.getElementById('addIngredientBtn');
    const form = document.getElementById('recipeForm');


    function addIngredientGroup() {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'ingredient-group';
        groupDiv.innerHTML = `
            <label>Ingredient ID:</label>
            <input type="text" name="ingredient_id[]" placeholder="e.g., ING001">

            <label>Ingredient Name:</label>
            <input type="text" name="ingredient_name[]" placeholder="e.g., Flour" required>

            <label>Quantity:</label>
            <input type="text" name="quantity[]" placeholder="e.g., 2 cups" required>

            <button type="button" class="remove-ingredient" style="background:#e74c3c; width:auto; padding:5px 10px;">Remove</button>
            <hr>
        `;
        container.appendChild(groupDiv);
        
        const removeBtn = groupDiv.querySelector('.remove-ingredient');
        removeBtn.addEventListener('click', () => {
            groupDiv.remove();
        });
    }

    addBtn.addEventListener('click', addIngredientGroup);

    
    document.querySelectorAll('.remove-ingredient').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.ingredient-group').remove();
        });
    });

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        
        const recipeData = {
            recipe_id: document.querySelector('input[name="recipe_id"]').value,
            recipe_name: document.querySelector('input[name="recipe_name"]').value,
            course: document.querySelector('select[name="course"]').value,
            description: document.querySelector('textarea[name="description"]').value,
            ingredients: []
        };

    
        const ingredientGroups = document.querySelectorAll('.ingredient-group');
        ingredientGroups.forEach(group => {
            const ingId = group.querySelector('input[name="ingredient_id[]"]').value;
            const ingName = group.querySelector('input[name="ingredient_name[]"]').value;
            const qty = group.querySelector('input[name="quantity[]"]').value;

            
            if (ingName && qty) {
                recipeData.ingredients.push({
                    id: ingId || null,
                    name: ingName,
                    quantity: qty
                });
            }
        });

        
        if (!recipeData.recipe_name) {
            alert('Please enter recipe name.');
            return;
        }
        if (recipeData.ingredients.length === 0) {
            alert('Please add at least one ingredient with name and quantity.');
            return;
        }

        
        console.log('Recipe Data:', recipeData);
        alert('Recipe added successfully! (Check console for data)');

    
    });
});
