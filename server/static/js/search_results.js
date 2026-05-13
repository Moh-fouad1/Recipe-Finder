const recipes = [
    { id: 1, name: "Chicken Alfredo Pasta", course: "Main Course", url: "recipe1.html" },
    { id: 2, name: "Chicken Parm with Pink Sauce Pasta", course: "Main Course", url: "recipe2.html" },
    { id: 3, name: "Chicken Shawarma", course: "Main Course", url: "recipe3.html" },
    { id: 4, name: "Crispy Vegetable Spring Rolls", course: "Appetizers", url: "recipe4.html" },
    { id: 5, name: "Spicy Buffalo Wings", course: "Appetizers", url: "recipe5.html" },
    { id: 6, name: "Traditional Beef Lasagna", course: "Main Course", url: "recipe6.html" },
    { id: 7, name: "Rich Chocolate Lava Cake", course: "Dessert", url: "recipe7.html" },
    { id: 8, name: "Classic New York Cheesecake", course: "Dessert", url: "recipe8.html" }
];

if (!localStorage.getItem('recipeDatabase')) {
    localStorage.setItem('recipeDatabase', JSON.stringify(recipes));
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('form');
    const resultsContainer = document.querySelector('p[id="results-area"]'); 
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const dishNameQuery = document.getElementById('dish_name').value.toLowerCase().trim();
        const storedRecipes = JSON.parse(localStorage.getItem('recipeDatabase'));
        
        const filteredResults = storedRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(dishNameQuery)
        );

        displayResults(filteredResults);
    });

    function displayResults(results) {
        const resultsSection = document.querySelector('h3').nextElementSibling;
        
        if (results.length === 0) {
            resultsSection.innerHTML = "<em>No recipes found matching your search.</em>";
            return;
        }

        let htmlContent = '<ul style="list-style: none; padding: 0; max-width: 600px; margin: 20px auto;">';
        
        results.forEach(recipe => {
            htmlContent += `
                <li style="background: white; margin-bottom: 10px; padding: 15px; border-radius: 8px; border: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${recipe.name}</strong> - <span style="color: #666;">${recipe.course}</span>
                    </div>
                    <a href="${recipe.url}" style="color: #e67e22; text-decoration: none; font-weight: bold;">View</a>
                </li>
            `;
        });
        
        htmlContent += '</ul>';
        resultsSection.innerHTML = htmlContent;
    }
});