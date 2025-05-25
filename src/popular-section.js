// retrieve name from url params
const params = new URLSearchParams(window.location.search);
const recipeName = params.get("name");
const type = params.get("type")
const popularSection = document.querySelector(".popular-recipe-section")

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
  // If a Youtube link is available, embed it
  const youtubeLink = recipe.strYoutube;
  const youtubeEmbed = youtubeLink
  ? `
    <section class="recipe-section video-ingredients-wrapper">
        <div class="ingredients-container">
        <h2 class="section-heading">🧂 Ingredients</h2>
        <ul class="ingredients-list">${ingredientsList.join("")}</ul>
        </div>
        <div class="video-wrapper">
        <h2 class="section-heading">🎥 Watch How It's Made</h2>
        <iframe 
            src="https://www.youtube.com/embed/${youtubeLink.split("v=")[1]}" 
            frameborder="0" 
            allowfullscreen 
            title="Recipe Video">
        </iframe>
        </div>
    </section>
    `
    : `
    <section class="recipe-section">
        <h2 class="section-heading">🧂 Ingredients</h2>
        <ul class="ingredients-list">${ingredientsList.join("")}</ul>
    </section>
  `;

    popularSection.innerHTML = `
      <div class="recipe-card">
        <h1 id="title">${recipe.strMeal}</h1>
        <img id="meals" src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
        <div class="recipe-details">
          <p><strong>Category:</strong> ${recipe.strCategory}</p>
          <p><strong>Area:</strong> ${recipe.strArea}</p>
        </div>
        ${youtubeEmbed}
        <section class="recipe-section-2">
          <h2 class="section-heading">👩‍🍳 Directions</h2>
          <p class="instructions">${recipe.strInstructions}</p>
        </section>
      </div>
    `;
}

function displayDrink(drink) {
  const ingredientsList = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const meas = drink[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredientsList.push(`<li>${meas || ""} ${ing}</li>`);
    }
  }

  popularSection.innerHTML = `
    <div class="recipe-card">
      <h1 id="title">${drink.strDrink}</h1>
      <img id="meals" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
      <div class="recipe-details">
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Glass:</strong> ${drink.strGlass}</p>
      </div>
      <section class="recipe-section-drinks">
        <h2 class="section-heading">🍹 Ingredients</h2>
        <ul class="ingredients-list">${ingredientsList.join("")}</ul>
        <h2 class="section-heading">👨‍🔬 Instructions</h2>
        <p class="instructions">${drink.strInstructions}</p>
      </section>
    </div>
  `;
}

function fetchMealData(recipeName) {
  //if there's no name in the link, stop
  if (!recipeName ) {
    popularSection.innerHTML = "<p>No meal selected.</p>";
  } else if (recipeName ) {
    //fetch data from the MealDB API using the name
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals?.[0]; // Get the first match (if any)
      displayRecipe(meal)
    })
    .catch((error) => {
      popularSection.innerHTML = "<p>Error loading meal data.</p>";
    });
  }
}

function fetchCocktailData(recipeName) {
if (!recipeName ) {
    popularSection.innerHTML = "<p>No Cocktail selected.</p>";
  } else if (recipeName ) {
    //fetch data from the MealDB API using the name
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${recipeName}`)
    .then((response) => response.json())
    .then((data) => {
      const drink = data.drinks?.[0]; // Get the first match (if any)
      displayDrink(drink)
    })
    .catch((error) => {
      popularSection.innerHTML = "<p>Error loading cocktail data.</p>";
    });
  }  
}

if (type === "cocktail") {
  fetchCocktailData(recipeName);
} else {
  fetchMealData(recipeName);
}

