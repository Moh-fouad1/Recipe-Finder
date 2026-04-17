// src/scripts/data.js

(function() {
  if (!localStorage.getItem('recipes')) {
    const defaultRecipes = [
      {
        id: "1",
        name: "Chicken Alfredo Pasta",
        course: "Main Course",
        description: "Creamy fettuccine Alfredo with grilled chicken breast.",
        ingredients: [
          { id: "ing101", name: "Fettuccine pasta", quantity: "200g" },
          { id: "ing102", name: "Heavy cream", quantity: "1 cup" },
          { id: "ing103", name: "Parmesan cheese", quantity: "1/2 cup grated" },
          { id: "ing104", name: "Chicken breast", quantity: "2 pieces" }
        ]
      },
      {
        id: "2",
        name: "Chicken Parm with Pink Sauce Pasta",
        course: "Main Course",
        description: "Breaded chicken cutlets topped with mozzarella and served with pink sauce pasta.",
        ingredients: [
          { id: "ing201", name: "Chicken breast", quantity: "2 pieces" },
          { id: "ing202", name: "Breadcrumbs", quantity: "1 cup" },
          { id: "ing203", name: "Mozzarella cheese", quantity: "100g" },
          { id: "ing204", name: "Tomato sauce", quantity: "1 cup" },
          { id: "ing205", name: "Heavy cream", quantity: "1/4 cup" }
        ]
      },
      {
        id: "3",
        name: "Chicken Shawarma",
        course: "Main Course",
        description: "Middle Eastern spiced chicken wrapped in pita with garlic sauce.",
        ingredients: [
          { id: "ing301", name: "Chicken thighs", quantity: "500g" },
          { id: "ing302", name: "Shawarma spice mix", quantity: "2 tbsp" },
          { id: "ing303", name: "Garlic", quantity: "4 cloves" },
          { id: "ing304", name: "Yogurt", quantity: "1/2 cup" }
        ]
      },
      {
        id: "4",
        name: "Crispy Vegetable Spring Rolls",
        course: "Appetizers",
        description: "Golden fried rolls filled with shredded vegetables.",
        ingredients: [
          { id: "ing401", name: "Spring roll wrappers", quantity: "10 pieces" },
          { id: "ing402", name: "Cabbage", quantity: "1 cup shredded" },
          { id: "ing403", name: "Carrot", quantity: "1 cup julienned" },
          { id: "ing404", name: "Soy sauce", quantity: "2 tbsp" }
        ]
      },
      {
        id: "5",
        name: "Spicy Buffalo Wings",
        course: "Appetizers",
        description: "Crispy chicken wings coated in spicy buffalo sauce.",
        ingredients: [
          { id: "ing501", name: "Chicken wings", quantity: "12 pieces" },
          { id: "ing502", name: "Hot sauce", quantity: "1/2 cup" },
          { id: "ing503", name: "Butter", quantity: "2 tbsp" }
        ]
      },
      {
        id: "6",
        name: "Traditional Beef Lasagna",
        course: "Main Course",
        description: "Layered pasta with rich meat sauce and béchamel.",
        ingredients: [
          { id: "ing601", name: "Lasagna noodles", quantity: "12 sheets" },
          { id: "ing602", name: "Ground beef", quantity: "500g" },
          { id: "ing603", name: "Tomato sauce", quantity: "2 cups" },
          { id: "ing604", name: "Ricotta cheese", quantity: "250g" },
          { id: "ing605", name: "Mozzarella", quantity: "200g" }
        ]
      },
      {
        id: "7",
        name: "Rich Chocolate Lava Cake",
        course: "Dessert",
        description: "Warm chocolate cake with a gooey molten centre.",
        ingredients: [
          { id: "ing701", name: "Dark chocolate", quantity: "150g" },
          { id: "ing702", name: "Butter", quantity: "100g" },
          { id: "ing703", name: "Eggs", quantity: "2 large" },
          { id: "ing704", name: "Sugar", quantity: "1/2 cup" },
          { id: "ing705", name: "Flour", quantity: "1/4 cup" }
        ]
      },
      {
        id: "8",
        name: "Classic New York Cheesecake",
        course: "Dessert",
        description: "Creamy and dense cheesecake with a graham cracker crust.",
        ingredients: [
          { id: "ing801", name: "Cream cheese", quantity: "500g" },
          { id: "ing802", name: "Sugar", quantity: "1 cup" },
          { id: "ing803", name: "Eggs", quantity: "3 large" },
          { id: "ing804", name: "Graham cracker crumbs", quantity: "1.5 cups" }
        ]
      }
    ];

    localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
  }
})();