const main = document.querySelector(".main-container")
const navHeading = document.querySelector(".nav-bar")
const homeLink = document.createElement("a")
navHeading.append(homeLink)

fetch("https://themealdb.com/api/json/v1/1/random.php")
.then((response) => response.json())
.then((response) => {

    mainImage(response)
    navLogo(response)
})
.catch (error => {console.log(error)})

let mainImage = image => {
    let images = image.meals[0].strMealThumb
    let title = image.meals[0].strMeal
    main.innerHTML = `
        <h2 class="main-text">It's Almost Impossible NOT to recreate these Meals!</h2>
        <h1 class="main-text">⬇️${title}⬇️</h1>
        <img id="main-img" src="${images}">`
}
let navLogo = logo => {
    homeLink.innerHTML = `
    <h1 id="nav-heading">WHAT'S'DISH</h1>`
    homeLink.setAttribute("href", "index.html")
}
