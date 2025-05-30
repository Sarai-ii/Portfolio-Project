const form = document.getElementById("ai-form");
const responseContainer = document.getElementById("ai-response");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ingredients = document.getElementById("userIngredients").value;

    //show a loading message
    responseContainer.innerHTML = "<p> Generating your recipe..</p>"

    try {
    const res = await fetch("/.netlify/functions/ai-recipe", {
      method: "POST",
      body: JSON.stringify({ ingredients }),
    });
    
    const data = await res.json();
    if (data.result) {
      responseContainer.innerHTML = `<pre>${data.result}</pre>`;
    } else {
      responseContainer.innerHTML = "<p>Sorry, something went wrong. Try again.</p>";
    }
  } catch (err) {
    responseContainer.innerHTML = "<p>Error connecting to AI.</p>";
  }
});
