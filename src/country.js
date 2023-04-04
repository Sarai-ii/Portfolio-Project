fetch("https://themealdb.com/api/json/v1/1/random.php")
.then(response => response.json())
.then(data => {
// Declaring an easier pathway w/ variables
    const area = data.meals[0].strArea
    let recipe = data.meals[0]
    let mealTitle = data.meals[0].strMeal
    let mealPic = data.meals[0].strMealThumb
    let prep = data.meals[0].strYoutube
    let instructions = data.meals[0].strInstructions
//Creating/selecting necessary elements
    const ordered = document.createElement("ol")
    const unOrdered = document.createElement("ul")
    const main = document.querySelector("main")
    main.append(ordered, unOrdered)

// Individually pulling measurements

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
//Individually listing ingredients
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
    
    main.innerHTML = `
    <h1 id="title">${mealTitle}</h1>
    <h2> Culture: ${area}</h2>


    <img id="meals" src="${mealPic}">
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
    <h2>Directions</h2>
    <p>${instructions}</p> `
    

//Looping Through Ingredients Keys
    // for (const key in recipe){
    //     if (key.includes("strIngredient") && recipe[key]!== ""){
    //         const ingList = document.createElement("li")
    //         ingList.classList.add("on-load-ingredients")
    //         ingList.innerText = recipe[key]
    //         ordered.append(ingList)
    //     }
    //     if (key.includes("strMeasure") && recipe[key] !== ""){
    //         const metric = document.createElement("li")
    //         unOrdered.classList.add("measurements")
    //         metric.innerText = recipe[key]
    //         unOrdered.append(metric)
    //     }
    // }
})
.catch(error => {console.log(error)})
