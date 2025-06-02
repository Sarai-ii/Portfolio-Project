const form = document.getElementById("ai-form");
const responseContainer = document.getElementById("ai-response");

/* edge cases: 
    1. pressing enter does not active generate recipe 
        -> 
    2. if I change the category to cocktail but type in food the recipe generator ignorees the category completely, doesn't seem necessary for this api and just confuses the user 
        -> removed completely
    3. Ai response format is markdown, I need to translate the markdown into html 
        -> maked.js library converts markdown into real HTML
        -> parse the data.results from ai response container
    4. CSS
*/

form.addEventListener("submit", async (e) => {
    //prevent form from reloading the entire webpage
    e.preventDefault();
    const ingredients = document.getElementById("userIngredients").value;

    // Show a loading message
    responseContainer.innerHTML = "<p>Generating your recipe...</p>";

    try {
        const res = await fetch("/.netlify/functions/ai-recipe", {
            method: "POST",
            headers: {
            "Content-Type": "application/json", //Tells server it's receiving JSON
            },
            body: JSON.stringify({ ingredients }), //Sends the ingredient input to the backend
        });
        
        const data = await res.json();
        if (data.result) {
            //convert markdown to html
            const rawHTML = marked.parse(data.result);
            // sanitize the raw html to remove XSS or bad code
            const purifiedHTML = DOMPurify.sanitize(rawHTML)
            // render safely to browser
            responseContainer.innerHTML = purifiedHTML
            //clear the input field for the next entry 
            form.reset()
        } else {
            responseContainer.innerHTML = "<p>Sorry, something went wrong. Try again.</p>";
        }
    } catch (err) {
        console.error("Fetch error:", err)
        responseContainer.innerHTML = "<p>Error connecting to AI.</p>";
    }
});

