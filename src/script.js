const navBox = document.getElementById("nav-box")
const navHeading = document.querySelector(".nav-bar")
const homeLink = document.createElement("a")
navHeading.append(homeLink)

fetch("https://themealdb.com/api/json/v1/1/random.php")
.then((response) => response.json())
.then((response) => {

    navImage(response)
    navLogo(response)
})
.catch (error => {console.log(error)})

let navImage = image => {
    let images = image.meals[0].strMealThumb
    navBox.innerHTML = `<img id="nav-img" src="${images}">`
}
let navLogo = logo => {
    homeLink.innerHTML = `
    <h1 id="heading">WHAT'S'DISH</h1>`
    homeLink.setAttribute("href", "index.html")
}
