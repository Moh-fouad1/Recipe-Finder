function getRecipes() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
  favorites = favorites.filter(fav => fav.id !== id);
  localStorage.setItem('userFavorites', JSON.stringify(favorites));
  displayFavorites();
}

async function displayFavorites() {
  const favoritesList = document.getElementById('favoritesList');
  if (!favoritesList) return;

  const myFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
  const allRecipes = getRecipes();

  if (myFavorites.length === 0) {
    favoritesList.innerHTML = '<li>No favorites added yet.</li>';
    return;
  }

  // Map favorite IDs to full recipe objects
  const favoriteRecipes = myFavorites
    .map(fav => allRecipes.find(r => r.id === fav.id))
    .filter(r => r); // Remove any that no longer exist

  favoritesList.innerHTML = favoriteRecipes.map(recipe => `
    <li>
      <div>
        <strong>Saved Recipe:</strong> ${recipe.name}
      </div>
      <div class="action-buttons">
        <a href="recipe-detail.html?id=${recipe.id}" class="view-btn">View Details</a>
        <button class="remove-btn" onclick="removeFromFavorites('${recipe.id}')">Remove</button>
      </div>
    </li>
  `).join('');
}

document.addEventListener('DOMContentLoaded', displayFavorites);