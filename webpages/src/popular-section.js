// retrieve name from url params
const params = new URLSearchParams(window.location.search);
const mealName = params.get("name");

//if there's no name in the link, stop
if (!mealName) {
  document.getElementById("recipe-details").innerHTML = "<p>No meal selected.</p>";
} else {
    //fetch data from the MealDB API using the name
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals?.[0]; // Get the first match (if any)

      if (!meal) {
        document.getElementById("recipe-details").innerHTML = "<p>Meal not found.</p>";
        return;
      }
      document.getElementById("recipe-details").innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Instructions:</strong></p>
        <p>${meal.strInstructions}</p>
      `;
    })
    .catch((error) => {
      document.getElementById("recipe-details").innerHTML = "<p>Error loading meal data.</p>";
    });
}
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
    console.log(youtubeLink);
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

    recipeContainer.innerHTML = `
        <div class="recipe-card">
            <h1 id="title">${recipe.strMeal}</h1>
            <img id="meals" src="${recipe.strMealThumb}" alt="Photo of ${recipe.strMeal}">
            ${youtubeEmbed}
            <section class="recipe-section">
            <h2 class="section-heading">👩‍🍳 Directions</h2>
            <p class="instructions">${recipe.strInstructions}</p>
            </section>
        </div>
    `;
}