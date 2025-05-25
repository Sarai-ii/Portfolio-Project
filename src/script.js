const main = document.querySelector(".main-container")
const featuredSection = document.querySelector(".featured-section")
const navContainer = document.querySelector(".nav-container")
const featured2 = document.querySelector(".featured-section-2")



fetch("https://themealdb.com/api/json/v1/1/random.php")
// fetch data from api and convert to json format
.then((response) => response.json())
.then((data) => {
    featuredMeal(data)
    console.log(data.meals[0].strMeal)

    // non-static resizing event listener
    window.addEventListener('resize', () => featuredMeal(data));
})
.catch(error  => {
    //  If the API call fails, display an error message
    main.innerHTML =  "<p>Error fetching recipe</p>"
})

let featuredMeal = featured => {
    let thumbnail = featured.meals[0].strMealThumb
    let title = featured.meals[0].strMeal
    if(window.matchMedia('(max-width: 535px)').matches){
        featuredSection.innerHTML = `
        <h2 class="featured-text">✨ Discover Today’s Featured Recipe ✨</h2>
        <div class=featured-section-2> 
        <h2 class="featured-title">Craving Something New? Try <a id="meal-name" href="/webpages/featured-meal.html?name=${encodeURIComponent(title)}">${title}</a> ↓
        </h2>
        <a id="featured-img-link" href="/webpages/featured-meal.html?name=${encodeURIComponent(title)}">
        <img id="featured-img" src="${thumbnail}">
        </a>
        </div>
    `
    } else {

        featuredSection.innerHTML = `
        <h2 class="featured-text">✨ Discover Today’s Featured Recipe ✨</h2>
        <div class=featured-section-2> 
        <h2 class="featured-title">Craving Something New? Try <a id="meal-name" href="/webpages/featured-meal.html?name=${encodeURIComponent(title)}">${title}</a> ↳
        </h2>
        <a id="featured-img-link" href="/webpages/featured-meal.html?name=${encodeURIComponent(title)}">
        <img id="featured-img" src="${thumbnail}">
        </a>
        </div>
        `
    }
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

// The content to dynamically render on popular-meals.html 
function renderCategory(sectionId, items, type) {
    // Get the target id section (desserts, fun-app, top-cocktails)
    const section = document.getElementById(sectionId); 
    // Create a <ul> to hold the recipes or items
    const ul = document.createElement('ul'); 
    ul.classList.add("recipe-container")

    items.forEach(item => {
        // Create the outer list item
        const li = document.createElement('li');
        li.classList.add("recipe-card");
        // Wrap in an <a> tag         
        const a = document.createElement('a');  
        //links to site that uses URL parameters to show correct recipe
        //added type parameter to dynamically toggle drink vs meal api on next page        
        a.href = `/webpages/popular-recipe.html?name=${encodeURIComponent(item.name)}&type=${type}`;
        a.classList.add("recipe-link");

        // Create <img> for meal image
        const img = document.createElement('img');        
        img.src = item.img;
        img.alt = item.name;
        img.classList.add("recipe-image");

        // Create a text label under the image
        const label = document.createElement('p');       
        label.textContent = item.name;
        label.classList.add("recipe-name");

        a.appendChild(img);      // add image inside the <a>
        a.appendChild(label);    // add label inside the <a>
        li.appendChild(a);       // add link inside the <li>
        ul.appendChild(li);      // add <li> to the <ul>
    });
    // select title element to add content under the h2 not above
    const h2 = section.querySelector('h2');
    if (h2) {
    h2.insertAdjacentElement('afterend', ul);
    } else {
    section.appendChild(ul); // fallback just in case
    }
}

// checks sectionId, popular recipes array and type of api
// creates a list of promises to return data soon
async function loadAndRenderPopular(sectionId, namesArray, type) {
    //check if api fetch is for cocktail or meals / runs fetch call
    const fetchFunction = type === "cocktail" ? fetchCocktailData : fetchMealData;

    // looping through each recipe name
    const promises = namesArray.map(async name => {
        //fetch data from api with name
    const data = await fetchFunction(name);
    // if data is present
    if (data) {
        //create object with useful extracted contents from data json
        return {
        name: data.strMeal || data.strDrink,
        img: data.strMealThumb || data.strDrinkThumb
        };
    }
    //otherwise return null
    return null;
    });
    // when all fetching is done
    const results = await Promise.all(promises);
    //remove null values if fetch failed
    const validItems = results.filter(item => item !== null);
    //call render function to show on page
    renderCategory(sectionId, validItems, type);
}

//waits until webpage has loaded before running code
document.addEventListener("DOMContentLoaded", () => {
  loadAndRenderPopular("desserts", popularItems.desserts, "meal");
  loadAndRenderPopular("fun-app", popularItems.meals, "meal");
  loadAndRenderPopular("top-cocktails", popularItems.cocktails, "cocktail");
});
