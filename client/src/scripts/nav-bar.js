document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const accountType = localStorage.getItem('accountType');

    const navLinks = document.querySelector('.nav-links');

    const heroBtns = document.querySelector('.hero-buttons');
    if (heroBtns && isLoggedIn) {
        const joinBtn = heroBtns.querySelector('a[href="signup.html"]');
        if (joinBtn) joinBtn.style.display = 'none';
    }

    if (!navLinks) return;

    if (!isLoggedIn) {
        navLinks.innerHTML = `
            <li><a href="home.html">Home</a></li>
            <li><a href="recipes.html">Browse</a></li>
            <li><a href="search_results.html">Search</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="signup.html" class="btn-signup">Sign Up</a></li>
        `;

    } else if (accountType === 'admin') {
        navLinks.innerHTML = `
            <li><a href="home.html">Home</a></li>
            <li><a href="recipes.html">Browse</a></li>
            <li><a href="search_results.html">Search</a></li>
            <li><a href="admin_manage_recipes.html">Manage Recipes</a></li>
            <li><a href="admin_add_recipe.html">Add Recipe</a></li>
            <li><a href="#" class="btn-signup" id="logout-btn">Logout</a></li>
        `;

    } else {
        navLinks.innerHTML = `
            <li><a href="home.html">Home</a></li>
            <li><a href="recipes.html">Browse</a></li>
            <li><a href="search_results.html">Search</a></li>
            <li><a href="favorites.html">Favorites</a></li>
            <li><a href="#" class="btn-signup" id="logout-btn">Logout</a></li>
        `;
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('accountType');
            window.location.href = 'home.html';
        });
    }
});