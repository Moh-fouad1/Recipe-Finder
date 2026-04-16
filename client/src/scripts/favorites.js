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

    if (!favorites.some(fav => fav.id === recipe.id)) {
        favorites.push(id);
        localStorage.setItem('userFavorites', JSON.stringify(favorites));
        alert("Added to favorites!");
    } else {
        alert("Already in favorites!");
    }
}

function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    favorites = favorites.filter(recipe => recipe.id !== id);
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
    displayFavorites(); // Refresh the UI
}

async function displayFavorites() {
    const favoritesList = document.querySelector('#favoritesList');
    const myFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];

    if (myFavorites.length === 0) {
        favoritesList.innerHTML = "<li>No favorites added yet.</li>";
        return;
    }

    // Per your requirements: Link is only on "View Details", not the name
    favoritesList.innerHTML = myFavorites.map(recipe => `
        <li>
            <div>
                <strong>Saved Recipe:</strong> ${recipe.name}
            </div>
            <div class="action-buttons">
                <a href="${recipe.link}" class="view-btn">View Details</a>
                <button class="remove-btn" onclick="removeFromFavorites('${recipe.id}')">Remove</button>
            </div>
        </li>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});