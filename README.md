# Recipe Finder

A web-based recipe discovery and management application developed as a collaborative web technology project.

Recipe Finder allows users to browse and search for recipes, view detailed recipe information, save their favorite recipes, and manage their accounts. The application also provides administrative functionality for managing the recipe collection.

---

## Overview

Recipe Finder was developed to provide a simple and organized way to discover recipes and manage saved recipes.

The application supports two main user roles:

* **Users** can register, log in, search for recipes, view recipe details, and manage their favorites.
* **Administrators** can manage the recipe collection by adding, editing, and deleting recipes.

The repository contains the original RecipeFinder implementation as well as a client-side application under the `client` directory.

---

## Features

### User Features

* User registration
* User login
* Browse recipes
* Search recipes
* Search by recipe name or ingredients
* View detailed recipe information
* View ingredients and preparation instructions
* Add recipes to favorites
* Remove recipes from favorites
* View saved recipes

### Administrator Features

* Administrator registration
* Administrator login
* View the recipe collection
* Add new recipes
* Edit existing recipes
* Delete recipes
* Manage recipe information

---

## Application Pages

The RecipeFinder application includes the following main pages:

| Page                        | Purpose                     |
| --------------------------- | --------------------------- |
| `index.html`                | Main landing page           |
| `signup.html`               | User registration           |
| `login.html`                | User authentication         |
| `recipes.html`              | Recipe browsing             |
| `recipe_details.html`       | Detailed recipe information |
| `search_results.html`       | Search results              |
| `favorites.html`            | Saved recipes               |
| `admin_add_recipe.html`     | Add a new recipe            |
| `admin_manage_recipes.html` | Manage existing recipes     |
| `cover.html`                | Project introduction        |

The original `RecipeFinder` directory contains these core pages and its associated CSS and image resources.

---

# Getting Started

## Requirements

To run the project locally, you need:

* Git
* A modern web browser
* Node.js and npm for the client application

Recommended browsers:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

---

# Installation

## 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/Moh-fouad1/Web-project.git
```

Move into the project directory:

```bash
cd Web-project
```

---

## 2. Run the Original RecipeFinder Version

The original HTML/CSS implementation can be opened directly in a browser.

Navigate to:

```text
RecipeFinder/
```

Then open:

```text
index.html
```

in your browser.

No package installation is required for this version.

---

# Client Application

The repository also contains a separate client application:

```text
client/
├── public/
└── src/
    ├── scripts/
    └── styles/
```

The client application is the more structured frontend portion of the project.

## Install Client Dependencies

Navigate to the client directory:

```bash
cd client
```

Install the required packages:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Open the local address shown by the development server in your browser.

If the project uses a different npm script configuration, run:

```bash
npm run
```

to display the available scripts.

---

# Using the Application

## Creating an Account

1. Open the application.
2. Navigate to the registration page.
3. Enter the required account information.
4. Submit the registration form.
5. Log in using the newly created account.

---

## Browsing Recipes

After logging in:

1. Open the recipe section.
2. Browse the available recipes.
3. Select a recipe to view its details.
4. Review the ingredients and preparation instructions.

---

## Searching for Recipes

Use the search functionality to find recipes based on the available search criteria.

For example:

```text
Chicken
Pasta
Pizza
Rice
Dessert
```

You can then select a result to view its complete recipe information.

---

## Managing Favorites

When viewing a recipe:

1. Select the option to add the recipe to your favorites.
2. Open the Favorites section.
3. Review your saved recipes.
4. Remove recipes from your favorites when they are no longer needed.

---

# Administrator Workflow

Administrators have access to recipe management functionality.

## Add a Recipe

1. Log in using an administrator account.
2. Open the recipe management section.
3. Select **Add Recipe**.
4. Enter the recipe information.
5. Submit the form.

---

## Edit a Recipe

1. Open the administrator recipe management page.
2. Select the recipe you want to modify.
3. Update the required information.
4. Save the changes.

---

## Delete a Recipe

1. Open the administrator recipe management page.
2. Select the recipe to remove.
3. Confirm the deletion.

---

# Project Structure

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
│   ├── cover.html
│   ├── css/
│   └── images/
│
├── client/
│   ├── public/
│   │   └── pages/
│   │
│   └── src/
│       ├── scripts/
│       └── styles/
│
├── README.md
├── requirements.txt
└── users.txt
```

The repository currently contains both the original `RecipeFinder` directory and the separate `client` application.

---

# Technologies

## Frontend

* HTML5
* CSS3
* JavaScript

## Development Tools

* Git
* GitHub
* Node.js
* npm

---

# Development Approach

The project was developed incrementally, beginning with the core HTML and CSS structure and progressing through the application's functionality.

The repository contains **86 commits**, reflecting the iterative development process throughout the project.

---

# User Flow

```text
                   Start
                     │
                     ▼
              ┌─────────────┐
              │   Register  │
              │  / Login    │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │    Home     │
              └──────┬──────┘
                     │
             ┌───────┴────────┐
             │                │
             ▼                ▼
      ┌─────────────┐  ┌─────────────┐
      │ Browse      │  │   Search    │
      │ Recipes     │  │   Recipes   │
      └──────┬──────┘  └──────┬──────┘
             │                │
             └───────┬────────┘
                     ▼
             ┌───────────────┐
             │ Recipe Details│
             └───────┬───────┘
                     │
              ┌──────┴───────┐
              │              │
              ▼              ▼
       ┌────────────┐  ┌────────────┐
       │ Add to     │  │ Return to  │
       │ Favorites  │  │ Recipes    │
       └─────┬──────┘  └────────────┘
             │
             ▼
       ┌────────────┐
       │ Favorites  │
       └────────────┘
```

---

# Administrator Flow

```text
                 Admin Login
                      │
                      ▼
              Admin Dashboard
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
       Add       Edit Recipe   Delete
      Recipe                   Recipe
          │           │           │
          └───────────┼───────────┘
                      ▼
              Updated Recipe List
```

---

# Project Goals

The project was developed to apply practical web-development concepts, including:

* Web page structure
* Responsive interface design
* User authentication flows
* Recipe search
* Recipe management
* Favorites functionality
* Administrative CRUD operations
* Client-side organization
* Git version control
* Collaborative development

---

# Team

| Name           | Student ID |
| -------------- | ---------- |
| Mohamed Fouad  | 20240522   |
| Yousef Semary  | 20240676   |
| Romissa Medhat | 20240201   |
| Hassan Abdul-  | 20240163   |
| Omar Abdul-    | 20240376   |
| Habiba Ehab    | 20240159   |

---

# Troubleshooting

## The HTML version does not start

Make sure you are opening:

```text
RecipeFinder/index.html
```

rather than a file inside one of the subdirectories.

---

## `npm install` does not work

Make sure Node.js and npm are installed:

```bash
node --version
npm --version
```

Then make sure you are inside:

```text
client/
```

before running:

```bash
npm install
```

---

## The development server does not start

Check the available npm scripts:

```bash
npm run
```

Then use the appropriate script listed by the project.

---

# Project Status

Completed.

The repository contains the completed project implementation and its development history.

---

# License

This project was developed as an academic team project.

The source code is provided for educational and portfolio purposes. Please contact the authors before using or redistributing the project commercially.

---

# Authors

**Mohamed Fouad**
**Yousef Semary**
**Romissa Medhat**
**Hassan Abdul-**
**Omar Abdul-**
**Habiba Ehab**

---

## Repository

The project source code is available on GitHub:

https://github.com/Moh-fouad1/Web-project
