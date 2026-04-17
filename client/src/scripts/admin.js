
// Load recipes from localStorage
function getRecipes() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

// Save recipes to localStorage
function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

//  Manage Recipes Page

function loadManageTable() {
  const tbody = document.getElementById('recipe-table-body');
  if (!tbody) return; // Not on manage page

  const recipes = getRecipes();

  tbody.innerHTML = recipes.map(recipe => `
    <tr>
      <td>${recipe.id}</td>
      <td>${recipe.name}</td>
      <td>${recipe.course}</td>
      <td>
        <a href="admin_edit_recipe.html?id=${recipe.id}" class="btn btn-sm">Edit</a>
        <button class="btn btn-sm btn-danger" onclick="deleteRecipe('${recipe.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Global delete function called from onclick
window.deleteRecipe = function(id) {
  if (!confirm('Are you sure you want to delete this recipe?')) return;

  let recipes = getRecipes();
  recipes = recipes.filter(r => r.id !== id);
  saveRecipes(recipes);
  loadManageTable(); // Refresh the table
};

// Edit Recipe Page

// Add an ingredient row to the container
window.addIngredientRow = function(container, id = '', name = '', quantity = '') {
  const row = document.createElement('div');
  row.className = 'ingredient-row';
  row.innerHTML = `
    <input type="text" placeholder="Ingredient ID (optional)" value="${id}" class="ing-id" style="flex:1;">
    <input type="text" placeholder="Name" value="${name}" required class="ing-name" style="flex:2;">
    <input type="text" placeholder="Quantity" value="${quantity}" required class="ing-qty" style="flex:2;">
    <button type="button" class="btn btn-sm btn-danger" onclick="this.closest('.ingredient-row').remove()">Remove</button>
  `;
  container.appendChild(row);
};

function loadRecipeForEdit() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
  if (!recipeId) return;

  const recipes = getRecipes();
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) {
    alert('Recipe not found.');
    window.location.href = 'admin_manage_recipes.html';
    return;
  }

  document.getElementById('recipe-id').value = recipe.id;
  document.getElementById('recipe-name').value = recipe.name;
  document.getElementById('recipe-course').value = recipe.course;
  document.getElementById('recipe-desc').value = recipe.description;

  const container = document.getElementById('ingredients-container');
  container.innerHTML = '';
  recipe.ingredients.forEach(ing => {
    addIngredientRow(container, ing.id || '', ing.name, ing.quantity);
  });
}

function setupEditForm() {
  const form = document.getElementById('edit-recipe-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('recipe-id').value;
    const name = document.getElementById('recipe-name').value.trim();
    const course = document.getElementById('recipe-course').value;
    const description = document.getElementById('recipe-desc').value.trim();

    // Gather ingredients
    const ingredientRows = document.querySelectorAll('#ingredients-container .ingredient-row');
    const ingredients = [];
    ingredientRows.forEach(row => {
      const ingId = row.querySelector('.ing-id').value.trim();
      const ingName = row.querySelector('.ing-name').value.trim();
      const ingQty = row.querySelector('.ing-qty').value.trim();
      if (ingName && ingQty) {
        ingredients.push({ id: ingId || null, name: ingName, quantity: ingQty });
      }
    });

    if (!name) {
      alert('Recipe name is required.');
      return;
    }
    if (ingredients.length === 0) {
      alert('At least one ingredient is required.');
      return;
    }

    // Update the recipe in the array
    let recipes = getRecipes();
    const index = recipes.findIndex(r => r.id === id);
    if (index !== -1) {
      recipes[index] = { id, name, course, description, ingredients };
      saveRecipes(recipes);
      alert('Recipe updated successfully!');
      window.location.href = 'admin_manage_recipes.html';
    } else {
      alert('Error: Recipe not found.');
    }
  });
}

// Initialise Based on Page 

document.addEventListener('DOMContentLoaded', () => {
  // Manage page
  loadManageTable();

  // Edit page
  if (document.getElementById('edit-recipe-form')) {
    loadRecipeForEdit();
    setupEditForm();
  }
});