const initialRecipes = [
    { id: 1, name: "Chicken Alfredo Pasta", course: "Main Course",description: "Delicious creamy chicken pasta recipe.", ingredients: [{ id: 1, name: "Chicken", qty: 200 }, { id: 2, name: "Pasta", qty: 300 }] },
    { id: 2, name: "Chicken Parm with Pink Sauce Pasta", course: "Main Course",description: "Classic chicken parm.", ingredients: [] },
    { id: 3, name: "Chicken Shawarma", course: "Main Course", description: " Authentic spices.",ingredients: []},
    { id: 4, name: "Crispy Vegetable Spring Rolls", course: "Appetizers", description: "Crispy and light.",ingredients: [] },
    { id: 5, name: "Spicy Buffalo Wings",course: "Appetizers",description: "Hot and spicy.", ingredients: [] },
    { id: 6, name: "Traditional Beef Lasagna",course: "Main Course", description: "Layers of goodness.", ingredients: [] },
    { id: 7, name: "Rich Chocolate Lava Cake", course: "Dessert",description: "Melts in your mouth.",ingredients: [] },
    { id: 8, name: "Classic New York Cheesecake",course: "Dessert", description: "Creamy and rich.", ingredients: [] }
];

if (!localStorage.getItem('admin_recipes')) {
    localStorage.setItem('admin_recipes', JSON.stringify(initialRecipes));
}

function getRecipes() {
    return JSON.parse(localStorage.getItem('admin_recipes')) || [];
}

function saveRecipesToDB(recipes) {
    localStorage.setItem('admin_recipes', JSON.stringify(recipes));
}

function loadRecipes() {
    const tableBody = document.getElementById('recipe-table-body');
    if (!tableBody) return;

    const recipes = getRecipes();
    tableBody.innerHTML = '';

    recipes.forEach(recipe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recipe.id}</td>
            <td>${recipe.name}</td>
            <td>${recipe.course}</td>
            <td>
                <a href="recipe${recipe.id}.html">View</a>
                <a href="admin_edit_recipe.html?id=${recipe.id}" class="btn btn-sm">Edit</a>
                <button class="btn btn-sm btn-danger" onclick="deleteRecipe(${recipe.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteRecipe(id) {
    if (confirm("Are you sure you want to delete recipe " + id + "?")) {
        let recipes = getRecipes();
        recipes = recipes.filter(r => r.id !== id);
        saveRecipesToDB(recipes);
        loadRecipes();
    }
}


function validateEditForm() {

    const nameInput = document.getElementById('recipe-name');
    const descInput = document.getElementById('recipe-desc');
    let isValid = true;
    
    if (nameInput.value.trim().length < 3) {
        alert("Recipe name must be at least 3 characters long.");
        isValid = false;
    }
    
    if (descInput.value.trim().length < 10) {
        alert("Description must be at least 10 characters long.");
        isValid = false;
    }

    return isValid;
}

function loadRecipeForEdit() {
    const form = document.getElementById('edit-recipe-form');
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    
    const targetId = idParam ? parseInt(idParam) : 1; 

    const recipes = getRecipes();
    const recipe = recipes.find(r => r.id === targetId);

    if (recipe) {
        document.getElementById('recipe-id').value = recipe.id;
        document.getElementById('recipe-name').value = recipe.name;
        document.getElementById('recipe-course').value = recipe.course;
        document.getElementById('recipe-desc').value = recipe.description;
        
        const ingredientsContainer = document.getElementById('ingredients-container');
        ingredientsContainer.innerHTML = '';

        if (recipe.ingredients && recipe.ingredients.length > 0) {
            recipe.ingredients.forEach(ing => {
                addIngredientRow(ingredientsContainer, ing.id, ing.name, ing.qty);
            });
        } else {
            addIngredientRow(ingredientsContainer, '', '', '');
        }
    } else {
        alert("Recipe not found!");
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateEditForm()) {
            saveEditedRecipe();
        }
    });

}

function addIngredientRow(container, idVal, nameVal, qtyVal) {
    const div = document.createElement('div');
    div.className = 'ingredient-row';
    div.innerHTML = `
        <input type="number" class="ing-id" value="${idVal}" placeholder="Ing ID" style="width:20%">
        <input type="text" class="ing-name" value="${nameVal}" placeholder="Ingredient Name" style="width:50%">
        <input type="number" class="ing-qty" value="${qtyVal}" placeholder="Qty" style="width:30%">
    `;
    container.appendChild(div);
}

function saveEditedRecipe() {
    const idStr = document.getElementById('recipe-id').value;
    const targetId = parseInt(idStr);

    let recipes = getRecipes();
    const index = recipes.findIndex(r => r.id === targetId);

    if (index !== -1) {
        // add new ingredient 
        const ingRows = document.querySelectorAll('.ingredient-row');
        let newIngredients = [];
        ingRows.forEach(row => {
            const iId = row.querySelector('.ing-id').value;
            const iName = row.querySelector('.ing-name').value;
            const iQty = row.querySelector('.ing-qty').value;
            if(iName) {
                newIngredients.push({ id: iId, name: iName, qty: iQty });
            }
        });

        recipes[index] = {
            id: targetId,
            name: document.getElementById('recipe-name').value,
            course: document.getElementById('recipe-course').value,
            description: document.getElementById('recipe-desc').value,
            ingredients: newIngredients
        };

        saveRecipesToDB(recipes);
        alert('Recipe ' + targetId + ' updated successfully!');
        window.location.href = 'admin_manage_recipes.html';
    } else {
        alert('Could not update because recipe ID was not found.');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('edit-recipe-form')) {
        loadRecipeForEdit();
    }
    if (document.getElementById('recipe-table-body')) {
        loadRecipes();
    }
});
