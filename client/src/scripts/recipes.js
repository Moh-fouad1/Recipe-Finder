/**
 * Recipe Finder - Shared Frontend Logic
 * Handles Dynamic Navigation and Favorites System
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Check Login Status from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const accountType = localStorage.getItem('accountType'); // 'admin' or 'user'
    const navLinks = document.getElementById('nav-links');

    // 2. Dynamic Navbar Structure (Matches home.js logic)
    if (navLinks) {
        if (!isLoggedIn) {
            navLinks.innerHTML = `
                <li><a href="home.html">Home</a></li>
                <li><a href="recipes.html">Browse Recipes</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="signup.html" class="btn-signup">Sign Up</a></li>
            `;
        } else if (accountType === 'admin') {
            navLinks.innerHTML = `
                <li><a href="home.html">Home</a></li>
                <li><a href="recipes.html">Browse Recipes</a></li>
                <li><a href="admin_manage_recipes.html">Manage Recipes</a></li>
                <li><a href="admin_add_recipe.html">Add Recipe</a></li>
                <li><a href="#" class="btn-signup" id="logout-btn">Logout</a></li>
            `;
        } else {
            navLinks.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="recipes.html">Browse Recipes</a></li>
                <li><a href="favorites.html">Favorites</a></li>
                <li><a href="#" class="btn-signup" id="logout-btn">Logout</a></li>
            `;
        }
    }

    // 3. Handle Logout Action
    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'logout-btn') {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('accountType');
            alert("Logging out...");
            window.location.href = 'index.html';
        }
    });

    /**
     * 4. Add to Favorites Logic
     * Saves the recipe ID to an array in localStorage
     */
    window.addToFavorites = function (recipeId, name, link, event) {
    if (!isLoggedIn) {
        alert("You must be logged in to save favorites!");
        window.location.href = 'login.html';
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    const existingIndex = favorites.findIndex(r => r.id === recipeId);

    if (existingIndex === -1) {
        // Add to favorites
        favorites.push({ id: recipeId, name: name, link: link });
        localStorage.setItem('userFavorites', JSON.stringify(favorites));
        
        if (event && event.target) {
            event.target.classList.add('active');
        }
        alert("Recipe added to your favorites!");
    } else {
        // Remove from favorites (Toggle off)
        favorites.splice(existingIndex, 1);
        localStorage.setItem('userFavorites', JSON.stringify(favorites));
        
        if (event && event.target) {
            event.target.classList.remove('active');
        }
        alert("Recipe removed from favorites.");
    }
};