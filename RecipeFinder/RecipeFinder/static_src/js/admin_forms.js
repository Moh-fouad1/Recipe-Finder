document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('addIngredientBtn');
    if (!addBtn) return;

    const container = document.getElementById('ingredients-container');
    const totalForms = document.getElementById('id_ingredients-TOTAL_FORMS');
    const formPrefix = 'ingredients';

    function getNewFormIndex() {
        return parseInt(totalForms.value);
    }

    function addIngredientRow() {
        const idx = getNewFormIndex();
        const newDiv = document.createElement('div');
        newDiv.className = 'ingredient-group';
        newDiv.innerHTML = `
            <p>
                <label for="id_${formPrefix}-${idx}-ingredient_id">Ingredient ID:</label>
                <input type="text" name="${formPrefix}-${idx}-ingredient_id" id="id_${formPrefix}-${idx}-ingredient_id">
            </p>
            <p>
                <label for="id_${formPrefix}-${idx}-name">Name:</label>
                <input type="text" name="${formPrefix}-${idx}-name" id="id_${formPrefix}-${idx}-name" required>
            </p>
            <p>
                <label for="id_${formPrefix}-${idx}-quantity">Quantity:</label>
                <input type="text" name="${formPrefix}-${idx}-quantity" id="id_${formPrefix}-${idx}-quantity" required>
            </p>
            <input type="hidden" name="${formPrefix}-${idx}-id" id="id_${formPrefix}-${idx}-id">
            <input type="hidden" name="${formPrefix}-${idx}-recipe" id="id_${formPrefix}-${idx}-recipe">
            <button type="button" class="remove-ingredient" style="background:#e74c3c; margin-top:10px;">Remove</button>
            <hr>
        `;
        container.appendChild(newDiv);
        totalForms.value = idx + 1;
        const removeBtn = newDiv.querySelector('.remove-ingredient');
        removeBtn.addEventListener('click', () => newDiv.remove());
    }

    addBtn.addEventListener('click', addIngredientRow);
    document.querySelectorAll('.remove-ingredient').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.target.closest('.ingredient-group').remove();
        });
    });
});