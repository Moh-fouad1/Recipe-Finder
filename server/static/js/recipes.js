// Helper: get recipes from localStorage
function getRecipes() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

// Helper: get favourites from localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem('userFavorites')) || [];
}

// Helper: save favourites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem('userFavorites', JSON.stringify(favorites));
}

// Render the recipe table dynamically
function renderRecipeTable() {
  const tbody = document.querySelector('.recipe-table tbody');
  if (!tbody) return;

  const recipes = getRecipes();
  const favorites = getFavorites();

  tbody.innerHTML = recipes.map(recipe => {
    const isFavorited = favorites.some(fav => fav.id === recipe.id);
    const activeClass = isFavorited ? 'active' : '';
    // Escape single quotes in recipe name for onclick attribute
    const escapedName = recipe.name.replace(/'/g, "\\'");
    return `
      <tr>
        <td>${recipe.id}</td>
        <td>${recipe.name}</td>
        <td>${recipe.course}</td>
        <td>
          <a href="recipe-detail.html?id=${recipe.id}" class="view-link">View Details</a>
          <button class="heart-btn ${activeClass}" onclick="toggleFavorite('${recipe.id}', '${escapedName}', 'recipe-detail.html?id=${recipe.id}', this)">❤</button>
        </td>
      </tr>
    `;
  }).join('');
}

// Toggle favourite status when heart is clicked
window.toggleFavorite = function(recipeId, name, link, buttonElement) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    alert('Please log in to save favourites.');
    return;
  }

  let favorites = getFavorites();
  const existingIndex = favorites.findIndex(fav => fav.id === recipeId);

  if (existingIndex === -1) {
    // Add to favourites
    favorites.push({ id: recipeId, name: name, link: link });
    buttonElement.classList.add('active');
  } else {
    // Remove from favourites
    favorites.splice(existingIndex, 1);
    buttonElement.classList.remove('active');
  }

  saveFavorites(favorites);
};

// Initialise on page load
document.addEventListener('DOMContentLoaded', () => {
  renderRecipeTable();
});