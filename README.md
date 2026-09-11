# Recipe Finder

A web application for discovering, searching, and managing recipes.

The platform provides a simple interface for users to browse recipes, search by name or ingredients, view detailed cooking instructions, and save recipes to their favorites. It also includes an administrative interface for managing the recipe collection.

---

## Overview

Recipe Finder was developed as a web technology project with a focus on building a complete recipe browsing and management experience.

The application supports two main types of users:

* **Users** — browse, search, view, and save recipes
* **Administrators** — manage the recipe database and user-facing content

---

## Features

### User Features

* User registration
* User login
* Browse available recipes
* Search recipes by name or ingredients
* View detailed recipe instructions
* Add recipes to favorites
* View saved favorite recipes

### Admin Features

* Admin registration and authentication
* Add new recipes
* Edit existing recipes
* Delete recipes
* View and manage the recipe collection

---

## Pages

The application includes dedicated pages for the main user workflows:

| Page                        | Description                         |
| --------------------------- | ----------------------------------- |
| `index.html`                | Homepage                            |
| `signup.html`               | User and admin registration         |
| `login.html`                | Authentication                      |
| `recipes.html`              | Recipe listing                      |
| `recipe_details.html`       | Recipe information and instructions |
| `search_results.html`       | Search results                      |
| `favorites.html`            | Saved recipes                       |
| `admin_add_recipe.html`     | Add a recipe                        |
| `admin_manage_recipes.html` | Manage existing recipes             |
| `cover.html`                | Project landing/cover page          |

---

## Project Structure

```text
Web-project/
│
├── RecipeFinder/
│   ├── index.html
│   ├── signup.html
│   ├── login.html
│   ├── recipes.html
│   ├── recipe_details.html
│   ├── search_results.html
│   ├── favorites.html
│   ├── admin_add_recipe.html
│   ├── admin_manage_recipes.html
│   └── cover.html
│
├── client/
│
├── README.md
├── requriments.txt
└── users.txt
```

---

## Technologies

### Frontend

* HTML5
* CSS3

### Development

* Git
* GitHub

The initial implementation was developed without frontend frameworks as required by the project specifications.

---

## Application Flow

### User

```text
Register / Login
       ↓
Browse Recipes
       ↓
Search or Select Recipe
       ↓
View Recipe Details
       ↓
Add to Favorites
       ↓
View Favorites
```

### Administrator

```text
Admin Login
     ↓
Recipe Management
     ↓
┌──────────────┬──────────────┬──────────────┐
│ Add Recipe   │ Edit Recipe  │ Delete Recipe│
└──────────────┴──────────────┴──────────────┘
```

---

## How to Run

Clone the repository:

```bash
git clone https://github.com/Moh-fouad1/Web-project.git
```

Open the project directory and launch:

```text
RecipeFinder/index.html
```

The initial frontend implementation does not require a build system or additional dependencies.

---

## Team

| Name           | Student ID |
| -------------- | ---------- |
| Mohamed Fouad  | 20240522   |
| Yousef Semary  | 20240676   |
| Romissa Medhat | 20240201   |
| Hassan Abdul-  | 20240163   |
| Omar Abdul-    | 20240376   |
| Habiba Ehab    | 20240159   |

---

## Project Goals

The project focused on applying web development fundamentals to a practical application while implementing:

* Structured web pages
* User authentication flows
* Recipe browsing
* Search functionality
* Favorites management
* Administrative CRUD operations
* Consistent navigation
* Responsive and user-friendly interfaces
* Collaborative development using Git and GitHub

---

## Project Status

Completed project.

---

## License

This project was developed as part of an academic team project.

The source code is provided for educational and portfolio purposes. Please contact the authors before using or redistributing the project commercially.
