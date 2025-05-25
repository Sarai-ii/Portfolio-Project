// Declaring Variable For Elements On The webpage
const form = document.querySelector("form")
const recipeContainer = document.querySelector("#cocktail-ideas")
const shuffleButton = document.querySelector("#random-recipe-shuffle")
const messageArea = document.querySelector("#message-area")

// Variable to store the last search term to shuffle based on the last search
let lastSearchTerm = ""
// stores current recipes globally
let currentRecipes = []
//ensures unique recipes no duplicates, once shown -> added to set
let shownRecipes = new Set();

// Utility: Show a temporary in-page message
function showMessage(message) {
    messageArea.innerHTML = `<p>${message}</p>`; // Display the message
    setTimeout(() => messageArea.innerHTML = "", 4000); // Clear it after 4 sec
}

//dynamically fetching measurements and ingredients
function displayCocktailRecipe(recipe) {
    const ingredientsList = [];
    //iterating through numbers 1 to 20
    for(let i = 1; i <= 20; i++){
        // data.drinks[index] = recipe - matching ing to meas
        const ing = recipe[`strIngredient${i}`]
        const meas = recipe[`strMeasure${i}`]
        // if value[i] is null fail and stop iteration
        if(ing && ing.trim()){
            ingredientsList.push(`<li>${meas || ""} ${ing}</li>`);
        }
    }

    recipeContainer.innerHTML = `
        <div class="recipe-card">
            <h1 id="title">${recipe.strDrink}</h1>
            <img id="meals" src="${recipe.strDrinkThumb}" alt="Photo of ${recipe.strDrink}">
            <section class="recipe-section">
                <h2 class="section-heading">🧂 Ingredients</h2>
                ul class="ingredients-list">${ingredientsList.join("")}</ul>
                <h2 class="section-heading">👩‍🍳 Directions</h2>
                <p class="instructions">${recipe.strInstructions}</p>
            </section>
        </div>
    `;

}

const cocktailSearch = (cocktail) => {
    fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
    //convert data to json format
    .then(response => response.json())
    //print out data
    .then(data => {
    
        // Declaring an easier pathway w/ variables
        let drinkArr = data.drinks

        if (!drinkArr){
            recipeContainer.innerHTML = `<p id="no-results-found"> No Results Found.</p>`

            // if no values, the recipes array should be empty
            currentRecipes = []
            // clear the shown recipes set
            shownRecipes.clear();
            return;
        }

        // If the recipes are found, store them in the currentRecipes array
        currentRecipes = drinkArr
        shownRecipes.clear(); // reset which recipes have been shown for new search

        // Randomizing The API Data for a more fun experience
        // this will give a random meal from the currentRecipes array
        let randomRecipe;
        do {
            randomRecipe = currentRecipes[Math.floor(Math.random() * currentRecipes.length)];
        } while (shownRecipes.has(randomRecipe.idDrink) && shownRecipes.size < currentRecipes.length);

        // Mark the selected recipe as shown
        shownRecipes.add(randomRecipe.idDrink);

        // Display the recipe using reusable function
        displayCocktailRecipe(randomRecipe);
    })
    .catch(error  => {
        //  If the API call fails, display an error message
        recipeContainer.innerHTML = "<p>Error fetching recipe</p>"
    })
}

// This handles the form submission and calls the cocktail search function when a user searches
form.addEventListener("submit", (event)=> {
    // this prevents the page from refreshing
    event.preventDefault() 
    // get the search term from the first input in the form
    lastSearchTerm = event.target[0].value.trim()  // FIXED: assign to global lastSearchTerm
    // edge case: for empty search, display a message
    if(!lastSearchTerm) {
        recipeContainer.innerHTML = '<p>Please enter a cocktail to search.</p>';
        return;
    }
    // Call the function to search and display the recipe
    cocktailSearch(lastSearchTerm)
}); 

// A Button that shuffles the recipe from the same search 
shuffleButton.addEventListener("click", () => {
    // If there's no previous search, show message
    if (!lastSearchTerm || currentRecipes.length === 0) {
        showMessage("Please search for a cocktail first before shuffling.");
        return;
    }
    // Check if all recipes have been shown
    if (shownRecipes.size === currentRecipes.length) {
        showMessage("You've seen all the recipes for this category!");
        form.reset(); // Reset the form
        // Disable the button and remove clicking effect
        return;
    }
    // Pick a random recipe that hasn't been shown yet
    let randomRecipe;
    do {
        randomRecipe = currentRecipes[Math.floor(Math.random() * currentRecipes.length)];
    } while (shownRecipes.has(randomRecipe.idDrink));

    shownRecipes.add(randomRecipe.idDrink);
    displayCocktailRecipe(randomRecipe);
});