const main = document.querySelector(".main-container")
const featuredSection = document.querySelector(".featured-section")
const navContainer = document.querySelector(".nav-container")


fetch("https://themealdb.com/api/json/v1/1/random.php")
// fetch data from api and convert to json format
.then((response) => response.json())
.then((data) => {
    featuredMeal(data)
    console.log(data)
})
.catch(error  => {
    //  If the API call fails, display an error message
    main.innerHTML =  "<p>Error fetching recipe</p>"
})

let featuredMeal = featured => {
    let thumbnail = featured.meals[0].strMealThumb
    let title = featured.meals[0].strMeal
    featuredSection.innerHTML = `
        <h2 class="featured-text">✨ Discover Today’s Featured Recipe ✨</h2>
        <div class=featured-section-2> 
            <h2 class="featured-title">Craving Something New? Try <a id="meal-name" href="/webpages/featured-meal.html">${title}</a> ↳
            </h2>
            <a id="featured-img-link" href="/webpages/featured-meal.html">
                <img id="featured-img" src="${thumbnail}">
            </a>
        </div>
    `
}
// For Popular Section on Index Page
const popularItems = {
  desserts: ["Dundee Cake", "Chinon Apple Tarts", "Eccles Cakes"],
  meals: ["Poutine", "Fish Fofos", "Wontons"],
  cocktails: ["Blueberry Mojito", "Allegheny", "Smashed Watermelon Margarita"]
};
//fetch first meal that matches name
async function fetchMealData(mealName) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  const data = await res.json();
  // Return first match / returns undefined if null
  return data.meals?.[0]; 
}
//fetch first cocktail that matches name 
async function fetchCocktailData(drinkName) {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
  const data = await res.json();
// Return first match / returns undefined if null
  return data.drinks?.[0];
}

