<script>
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let recipeId = document.querySelector("[name='recipe_id']").value.trim();
    let recipeName = document.querySelector("[name='recipe_name']").value.trim();
    let course = document.querySelector("[name='course']").value;
    let description = document.querySelector("[name='description']").value.trim();

    let ingredientId = document.querySelector("[name='ingredient_id']").value.trim();
    let ingredientName = document.querySelector("[name='ingredient_name']").value.trim();
    let quantity = document.querySelector("[name='quantity']").value.trim();

    if (
        !recipeId || !recipeName || !description ||
        !ingredientId || !ingredientName || !quantity
    ) {
        alert("Please fill in all fields");
        return;
    }

    let recipe = {
        id: recipeId,
        name: recipeName,
        course: course,
        description: description,
        ingredients: [
            {
                id: ingredientId,
                name: ingredientName,
                quantity: quantity
            }
        ]
    };

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.push(recipe);

    localStorage.setItem("recipes", JSON.stringify(recipes));

    alert("Recipe added successfully");

    document.querySelector("form").reset();
});
</script>