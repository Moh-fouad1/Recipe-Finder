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
    removeBtn.addEventListener('click', () => groupDiv.remove());
  }

  addBtn.addEventListener('click', addIngredientGroup);

  // Handle existing remove buttons (first one)
  document.querySelectorAll('.remove-ingredient').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.closest('.ingredient-group').remove();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather recipe info
    let recipeId = document.querySelector('input[name="recipe_id"]').value.trim();
    const recipeName = document.querySelector('input[name="recipe_name"]').value.trim();
    const course = document.querySelector('select[name="course"]').value;
    const description = document.querySelector('textarea[name="description"]').value.trim();

    // Gather ingredients
    const ingredients = [];
    document.querySelectorAll('.ingredient-group').forEach(group => {
      const ingId = group.querySelector('input[name="ingredient_id[]"]').value.trim();
      const ingName = group.querySelector('input[name="ingredient_name[]"]').value.trim();
      const qty = group.querySelector('input[name="quantity[]"]').value.trim();

      if (ingName && qty) {
        ingredients.push({
          id: ingId || null,
          name: ingName,
          quantity: qty
        });
      }
    });

    // Validation
    if (!recipeName) {
      alert('Please enter a recipe name.');
      return;
    }
    if (ingredients.length === 0) {
      alert('Please add at least one ingredient with name and quantity.');
      return;
    }

    // Generate ID if empty
    if (!recipeId) {
      recipeId = Date.now().toString();
    }

    const newRecipe = {
      id: recipeId,
      name: recipeName,
      course: course,
      description: description,
      ingredients: ingredients
    };

    // Save to localStorage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    alert('Recipe added successfully!');
    window.location.href = 'admin_manage_recipes.html';
  });
});
