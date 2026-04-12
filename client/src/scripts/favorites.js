async function getRecipesFromHTML() {
    try {
        const response = await fetch('../../public/pages/recipes.html');
        const htmlString = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        
        const rows = doc.querySelectorAll('table tbody tr');
        
        return Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 4) return null; 
    
        return {
            id: cells[0].innerText.trim(),
            name: cells[1].innerText.trim(),
            course: cells[2].innerText.trim(),
            link: cells[3].querySelector('a')?.getAttribute('href') || '#'
               };

        }).filter(recipe => recipe !== null);

    } catch (error) {
        console.error("Error loading recipes:", error);
        return [];
    }
}

function addToFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('userFavorites', JSON.stringify(favorites));
        alert("Added to favorites!");
    } else {
        alert("Already in favorites!");
    }
}

async function displayFavorites() {
    const favoritesList = document.querySelector('#favoritesList');
    if (!favoritesList) return;

    const allRecipes = await getRecipesFromHTML();
    
    const favoriteIds = JSON.parse(localStorage.getItem('userFavorites')) || [];
    
    const myFavorites = allRecipes.filter(recipe => favoriteIds.includes(recipe.id));

    if (myFavorites.length === 0) {
        favoritesList.innerHTML = "<li>No favorites added yet.</li>";
        return;
    }

    favoritesList.innerHTML = myFavorites.map(recipe => `
        <li>
            <strong>Saved Recipe:</strong> ${recipe.name}
            <a href="${recipe.link}">View Recipe Details</a>
        </li>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});