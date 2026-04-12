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
    window.addToFavorites = function (recipeId, event) {
        if (!isLoggedIn) {
            alert("You must be logged in to save favorites!");
            window.location.href = 'login.html';
            return;
        }

        // Get existing favorites or initialize empty array
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!favorites.includes(recipeId)) {
            favorites.push(recipeId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert("Recipe added to your favorites!");
            
            // Toggle visual state of the heart button if it exists
            if (event && event.target) {
                event.target.classList.add('active');
            }
        } else {
            alert("This recipe is already in your favorites.");
        }
    };
});