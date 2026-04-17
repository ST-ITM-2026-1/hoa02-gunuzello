[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/oZexKI4n)
# HOA02 

## Enhancing Your Portfolio with JavaScript

JAVASCRIPT INTERACTIVITY &amp; DYNAMIC CONTENT


## Objective

Extend your static portfolio (from Assignment 1) by integrating interactive and dynamic features using JavaScript. This assignment builds on your foundational work in HTML and CSS while incorporating JavaScript fundamentals, DOM manipulation and Asynchronous JavaScript.

---

## Requirements

### 1. Theme Switcher

- Create a JavaScript function that toggles between two themes (for example, dark/light, pastel/contrast, etc.). You can be creative with the names.
- Provide a user interface control (e.g., a toggle button) that triggers the theme switch.
- Use DOM manipulation to add or remove CSS classes or modify CSS variables dynamically.

---

### 2. Project Filtering

- On the Projects page, add functionality to filter projects by category or keyword.
- Implement the necessary changes to distinguish categories on your projects.
- Use JavaScript to dynamically show/hide projects as per the selected filter.

---

### 3. GitHub Profile and Repositories Page

- Create a new page (e.g., labeled “GitHub Stats” or “My GitHub”) that displays your public GitHub profile information and a list of your public repositories.
- Add this page to your navigation bar.

#### Public Profile Data
- Using the GitHub REST API endpoint:  
  https://api.github.com/users/<your_username>
- Fetch and display key details such as:
  - Avatar (profile picture)
  - Name
  - Bio
  - Number of public repositories
  - Followers
  - Following

#### Repository Cards
- Use the endpoint:  
  https://api.github.com/users/<your_username>/repos
- Dynamically create and display repository cards that include:
  - Repository name
  - Description
  - Primary language
  - Star count
  - Forks
  - Link to the repository

- Handle asynchronous data retrieval with proper error handling.
- Ensure the design is engaging and integrates smoothly with your overall portfolio style.
- Use DOM manipulation to dynamically inject the fetched information into your page layout.

---

### 4. GitHub Integration & Project Organization

- Start this assignment from the final commit of Assignment 1.

1. Accept the Assignment 2 repository from GitHub Classroom and clone it locally.  
2. Copy the files from your final commit in Assignment 1 into the Assignment 2 repository.  
3. Create an initial commit with a clear message:  
   `"Initial commit: Base files carried over from Assignment 1 for Assignment 2 enhancements"`  
4. Continue development by adding your enhancements:
   - Theme switcher  
   - Project filtering  
   - GitHub Profile & Repositories page  
5. Use branches as needed for organizing different features and maintain a good commit history.  
6. Deploy your final project on GitHub Pages and update your repository’s README with the deployed URL.  

---

## Deliverables

- A GitHub repository (via GitHub Classroom) with JavaScript enhancements.  
- Updated live version of your portfolio on GitHub Pages.
