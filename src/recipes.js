const form = document.querySelector("form")
const footer = document.getElementById("footer-container")


const foodSearch = (dish) => {
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${dish}`)
        .then((response) => response.json())
        .then((data) => {

// Declaring Variable For InnerText To Append To
            section = document.querySelector("section")
// How to Access API
            let recipes = data.meals
            let recipe = data.meals[0]
            let mealTitle = data.meals[0].strMeal
            let mealPic = data.meals[0].strMealThumb
            let prep = data.meals[0].strYoutube
            let instructions = data.meals[0].strInstructions
        // let category = data.meals[0].strCategory
    

// Looping Through Measurement Keys
            const measure1 = data.meals[0].strMeasure1
            const measure2 = data.meals[0].strMeasure2
            const measure3 = data.meals[0].strMeasure3
            const measure4 = data.meals[0].strMeasure4
            const measure5 = data.meals[0].strMeasure5
            const measure6 = data.meals[0].strMeasure6
            const measure7 = data.meals[0].strMeasure7
            const measure8 = data.meals[0].strMeasure8
            const measure9 = data.meals[0].strMeasure9
            const measure10 = data.meals[0].strMeasure10
            const measure11 = data.meals[0].strMeasure11
            const measure12 = data.meals[0].strMeasure12
            const measure13 = data.meals[0].strMeasure13
            const measure14 = data.meals[0].strMeasure14
            const measure15 = data.meals[0].strMeasure15
            const measure16 = data.meals[0].strMeasure16
            const measure17 = data.meals[0].strMeasure17
            const measure18 = data.meals[0].strMeasure18
            const measure19 = data.meals[0].strMeasure19
            const measure20 = data.meals[0].strMeasure20

// Looping Through Ingredient Keys

            const ing1 = data.meals[0].strIngredient1
            const ing2 = data.meals[0].strIngredient2
            const ing3 = data.meals[0].strIngredient3
            const ing4 = data.meals[0].strIngredient4
            const ing5 = data.meals[0].strIngredient5
            const ing6 = data.meals[0].strIngredient6
            const ing7 = data.meals[0].strIngredient7
            const ing8 = data.meals[0].strIngredient8
            const ing9 = data.meals[0].strIngredient9
            const ing10 = data.meals[0].strIngredient10
            const ing11 = data.meals[0].strIngredient11
            const ing12 = data.meals[0].strIngredient12
            const ing13 = data.meals[0].strIngredient13
            const ing14 = data.meals[0].strIngredient14
            const ing15 = data.meals[0].strIngredient15
            const ing16 = data.meals[0].strIngredient16
            const ing17 = data.meals[0].strIngredient17
            const ing18 = data.meals[0].strIngredient18
            const ing19 = data.meals[0].strIngredient19
            const ing20 = data.meals[0].strIngredient20
            
            
            section.innerHTML = `
            <h1 id="title">${mealTitle}</h1>
            <hr>

            <img id="meals" src="${mealPic}">
            <hr>
            <h2>Ingredients</h2>
            <ul><li>${measure1}  ${ing1} </li></ul>
            <ul><li>${measure2}  ${ing2}</li></ul>
            <ul><li>${measure3}  ${ing3}</li></ul>
            <ul><li>${measure4}  ${ing4}</li></ul>
            <ul><li>${measure5}  ${ing5}</li></ul>
            <ul><li>${measure6}  ${ing6}</li></ul>
            <ul><li>${measure7}  ${ing7}</li></ul>
            <ul><li>${measure8}  ${ing8}</li></ul>
            <ul><li>${measure9}  ${ing9}</li></ul>
            <ul><li>${measure10}  ${ing10}</li></ul>
            <ul><li>${measure11}  ${ing11}</li></ul>
            <ul><li>${measure12}  ${ing12}</li></ul>
            <ul><li>${measure13}  ${ing13}</li></ul>
            <ul><li>${measure14}  ${ing14}</li></ul>
            <ul><li>${measure15}  ${ing15}</li></ul>
            <ul><li>${measure16}  ${ing16}</li></ul>
            <ul><li>${measure17}  ${ing17}</li></ul>
            <ul><li>${measure18}  ${ing18}</li></ul>
            <ul><li>${measure19}  ${ing19}</li></ul>
            <ul><li>${measure20}  ${ing20}</li></ul>

            <hr>
            <h2>Directions</h2>
            <p>${instructions}</p>
            `
    })
    .catch(error  => {
        const errorP = document.createElement("p")
        errorP.innerHTML = `No Results Found.`
        section.innerHTML = " "
        section.append(errorP)
    })

form.reset();
}

const footerDisplay = footer => {
    footer.innerHTML = `
        <ul>
            <h4>About</h4>
            <li id="footer-icons">
                <a href="https://www.linkedin.com/in/saraibusiness/" title="LinkedIn"><img src="https://www.freepnglogos.com/uploads/linkedin-in-logo-png-1.png" width="50" alt="linkedin logo png"/></a>
                <a href="https://github.com/Sarai-ii" title="Github"><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="50" alt="Github logo png"/></a>
            </li>
            <li id="footer-text"> 
                © <a href="https://sarai-ii.github.io/My-Bio/">S.A.T Designs</a>--All Right Reserved 2023 
            </li>
        </ul>
        `
}

form.addEventListener("submit", (event)=> {
    event.preventDefault()
    const dish = event.target[0].value
    foodSearch(dish)
    footerDisplay(footer)
    
}); 






