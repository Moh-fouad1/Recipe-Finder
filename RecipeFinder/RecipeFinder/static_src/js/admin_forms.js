document.addEventListener('DOMContentLoaded', function () {
    var addBtn = document.getElementById('addIngredientBtn');
    var container = document.getElementById('ingredients-container');
    var totalForms = document.getElementById('id_ingredients-TOTAL_FORMS');
    if (!addBtn || !container || !totalForms) return;

    var formPrefix = 'ingredients';

    function bindRemoveButton(group) {
        var btn = group.querySelector('.remove-ingredient');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var deleteInput = group.querySelector('input[name$="-DELETE"]');
            var idInput = group.querySelector('input[name$="-id"]');
            if (deleteInput && idInput && idInput.value) {
                deleteInput.checked = true;
                group.style.display = 'none';
            } else {
                group.remove();
            }
        });
    }

    function addIngredientRow() {
        var idx = parseInt(totalForms.value, 10);
        var group = document.createElement('div');
        group.className = 'ingredient-group';

        var nameRow = document.createElement('div');
        nameRow.className = 'form-row';
        var nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'id_' + formPrefix + '-' + idx + '-name');
        nameLabel.textContent = 'Ingredient name';
        var nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = formPrefix + '-' + idx + '-name';
        nameInput.id = 'id_' + formPrefix + '-' + idx + '-name';
        nameInput.placeholder = 'e.g. Flour';
        nameInput.required = true;
        nameRow.appendChild(nameLabel);
        nameRow.appendChild(nameInput);

        var qtyRow = document.createElement('div');
        qtyRow.className = 'form-row';
        var qtyLabel = document.createElement('label');
        qtyLabel.setAttribute('for', 'id_' + formPrefix + '-' + idx + '-quantity');
        qtyLabel.textContent = 'Quantity';
        var qtyInput = document.createElement('input');
        qtyInput.type = 'text';
        qtyInput.name = formPrefix + '-' + idx + '-quantity';
        qtyInput.id = 'id_' + formPrefix + '-' + idx + '-quantity';
        qtyInput.placeholder = 'e.g. 2 cups';
        qtyInput.required = true;
        qtyRow.appendChild(qtyLabel);
        qtyRow.appendChild(qtyInput);

        var hiddenId = document.createElement('input');
        hiddenId.type = 'hidden';
        hiddenId.name = formPrefix + '-' + idx + '-id';
        hiddenId.id = 'id_' + formPrefix + '-' + idx + '-id';

        var hiddenRecipe = document.createElement('input');
        hiddenRecipe.type = 'hidden';
        hiddenRecipe.name = formPrefix + '-' + idx + '-recipe';
        hiddenRecipe.id = 'id_' + formPrefix + '-' + idx + '-recipe';

        var hiddenDelete = document.createElement('input');
        hiddenDelete.type = 'hidden';
        hiddenDelete.name = formPrefix + '-' + idx + '-DELETE';
        hiddenDelete.id = 'id_' + formPrefix + '-' + idx + '-DELETE';

        var removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-ingredient btn-danger btn-sm';
        removeBtn.textContent = 'Remove';

        group.appendChild(nameRow);
        group.appendChild(qtyRow);
        group.appendChild(hiddenId);
        group.appendChild(hiddenRecipe);
        group.appendChild(hiddenDelete);
        group.appendChild(removeBtn);
        group.appendChild(document.createElement('hr'));

        container.appendChild(group);
        totalForms.value = idx + 1;
        bindRemoveButton(group);
    }

    addBtn.addEventListener('click', addIngredientRow);
    container.querySelectorAll('.ingredient-group').forEach(bindRemoveButton);
});
