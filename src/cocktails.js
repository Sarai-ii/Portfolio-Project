window.onload = () => {
    fetch("https://thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {

// Declaring an easier pathway w/ variables
            let drinkArr = data.drinks
            let drink = data.drinks[0].strDrink
            let drinkPic = data.drinks[0].strDrinkThumb
            let instructions = data.drinks[0].strInstructions
//Creating/selecting necessary elements
            const ordered = document.createElement("ol")
            const unOrdered = document.createElement("ul")
            const main = document.querySelector("main")
            main.append(ordered, unOrdered)


// Individually pulling measurements

            const measure1 = drinkArr[0].strMeasure1
            const measure2 = drinkArr[0].strMeasure2
            const measure3 = drinkArr[0].strMeasure3
            const measure4 = drinkArr[0].strMeasure4
            const measure5 = drinkArr[0].strMeasure5
            const measure6 = drinkArr[0].strMeasure6
            const measure7 = drinkArr[0].strMeasure7
            const measure8 = drinkArr[0].strMeasure8
            const measure9 = drinkArr[0].strMeasure9
            const measure10 = drinkArr[0].strMeasure10
            const measure11 = drinkArr[0].strMeasure11
            const measure12 = drinkArr[0].strMeasure12
            const measure13 = drinkArr[0].strMeasure13
            const measure14 = drinkArr[0].strMeasure14
            const measure15 = drinkArr[0].strMeasure15
            const measure16 = drinkArr[0].strMeasure16
            const measure17 = drinkArr[0].strMeasure17
            const measure18 = drinkArr[0].strMeasure18
            const measure19 = drinkArr[0].strMeasure19
            const measure20 = drinkArr[0].strMeasure20

//Individually listing ingredients

            const ing1 = drinkArr[0].strIngredient1
            const ing2 = drinkArr[0].strIngredient2
            const ing3 = drinkArr[0].strIngredient3
            const ing4 = drinkArr[0].strIngredient4
            const ing5 = drinkArr[0].strIngredient5
            const ing6 = drinkArr[0].strIngredient6
            const ing7 = drinkArr[0].strIngredient7
            const ing8 = drinkArr[0].strIngredient8
            const ing9 = drinkArr[0].strIngredient9
            const ing10 = drinkArr[0].strIngredient10
            const ing11 = drinkArr[0].strIngredient11
            const ing12 = drinkArr[0].strIngredient12
            const ing13 = drinkArr[0].strIngredient13
            const ing14 = drinkArr[0].strIngredient14
            const ing15 = drinkArr[0].strIngredient15
            const ing16 = drinkArr[0].strIngredient16
            const ing17 = drinkArr[0].strIngredient17
            const ing18 = drinkArr[0].strIngredient18
            const ing19 = drinkArr[0].strIngredient19
            const ing20 = drinkArr[0].strIngredient20
            

//Looping Through Ingredients Keys 
            // for (const key in recipe){
            //     if (key.includes("strIngredient") && recipe[key]!== null){
            //         const ingList = document.createElement("li")
            //         ingList.classList.add("on-load-ing")
            //         ingList.innerText = recipe[key]
            //         ordered.append(ingList)
            //     }
            //     if (key.includes("strMeasure") && recipe[key]!== undefined){
            //         const metric = document.createElement("li")
            //         metric.classList.add("measurements")
            //         metric.innerText = recipe[key]
            //         unOrdered.append(metric)
            //     }
            // }

            main.innerHTML = `
            <h1 id="title">${drink}</h1>

            <img id="drinks" src="${drinkPic}">

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
            <h2>Directions</h2>
            <p>${instructions}</p> `
        })
        .catch(error => {
            console.log(error)})
}