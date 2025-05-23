// Declaring Variable For Elements On The webpage
const form = document.querySelector("form")
const footer = document.getElementById("footer-container")
const recipeContainer = document.querySelector("#meal-ideas")
const shuffleButton = document.querySelector("#random-recipe-shuffle")
const messageArea = document.querySelector("#message-area")

// Variable to store the last search term to shuffle based on the last search
let lastSearchTerm = ""
// stores current recipes array globally
let currentRecipes = []
/* 
🧠 Related LeetCode-style Problems
"Random Pick Without Replacement"
"Insert, Delete, GetRandom O(1)"
"Design Randomized Set"
"Fisher-Yates Shuffle"*/
let shownRecipes = new Set();

// Utility: Show a temporary in-page message
function showMessage(message) {
    messageArea.innerHTML = `<p>${message}</p>`; // Display the message
    setTimeout(() => messageArea.innerHTML = "", 4000); // Clear it after 4 sec
}

// NEW reusable function to display any recipe passed in
function displayRecipe(recipe) {
    // Dynamically build the ingredients list (only non-empty)
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        const ing = recipe[`strIngredient${i}`];
        const meas = recipe[`strMeasure${i}`];
        if (ing && ing.trim()) {
            ingredientsList.push(`<li>${meas || ""} ${ing}</li>`);
        }
    }

    recipeContainer.innerHTML = `
        <h1 id="title">${recipe.strMeal}</h1>
        <hr>
        <img id="meals" src="${recipe.strMealThumb}">
        <hr>
        <h2>Ingredients</h2>
        <ul>${ingredientsList.join("")}</ul>
        <hr>
        <h2>Directions</h2>
        <p>${recipe.strInstructions}</p>
    `;
}

// This function is to search and display recipe based on user input
const foodSearch = (dish) => {
    // fetch the latest recipes from this API
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${dish}`)
        //after the fetch, convert the response to json format
        .then((response) => response.json())
        // after the format conversion print out that data
        .then((data) => {

            // if no recipes are found, display a message for no results
            if (!data.meals) {
                recipeContainer.innerHTML = `<p id="no-results-found"> No Results Found. </p>`
                // if no values, the recipes array should be empty
                currentRecipes = []
                // clear the shown recipes set
                shownRecipes.clear();
                return;
            }

            // If the recipes are found, store them in the currentRecipes array
            currentRecipes = data.meals
            shownRecipes.clear(); // reset which recipes have been shown for new search

            // Randomizing The API Data for a more fun experience
            // this will give a random meal from the currentRecipes array
            let randomRecipe;
            do {
                randomRecipe = currentRecipes[Math.floor(Math.random() * currentRecipes.length)];
            } while (shownRecipes.has(randomRecipe.idMeal) && shownRecipes.size < currentRecipes.length);

            // Mark the selected recipe as shown
            shownRecipes.add(randomRecipe.idMeal);

            // Display the recipe using reusable function
            displayRecipe(randomRecipe);
        })
        .catch(error  => {
            //  If the API call fails, display an error message
            recipeContainer.innerHTML =  "<p>Error fetching recipe</p>"
        })
}

// This handles the form submission and calls the food search function when a user searches for a dish
form.addEventListener("submit", (event)=> {
    // this prevents the page from refreshing
    event.preventDefault() 
    // get the search term from the first input in the form
    lastSearchTerm = event.target[0].value.trim()  // FIXED: assign to global lastSearchTerm
    // edge case: for empty search, display a message
    if(!lastSearchTerm) {
        recipeContainer.innerHTML = '<p>Please enter a dish to search.</p>';
        return;
    }
    // Call the function to search and display the recipe
    foodSearch(lastSearchTerm)
}); 

// A Button that shuffles the recipe from the same search 
shuffleButton.addEventListener("click", () => {
    // If there's no previous search, show message
    if (!lastSearchTerm || currentRecipes.length === 0) {
        showMessage("Please search for a dish first before shuffling.");
        return;
    }
    // Check if all recipes have been shown
    if (shownRecipes.size === currentRecipes.length) {
        showMessage("You've seen all the recipes for this !");
        return;
    }

    // Pick a random recipe that hasn't been shown yet
    let randomRecipe;
    do {
        randomRecipe = currentRecipes[Math.floor(Math.random() * currentRecipes.length)];
    } while (shownRecipes.has(randomRecipe.idMeal));

    shownRecipes.add(randomRecipe.idMeal);
    displayRecipe(randomRecipe);
});