const form = document.getElementById("ai-form");
const responseContainer = document.getElementById("ai-response");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ingredients = document.getElementById("userIngredients").value;
  const category = document.getElementById("category").value;

  // Show a loading message
  responseContainer.innerHTML = "<p>Generating your recipe...</p>";

  try {
    const res = await fetch("/.netlify/functions/ai-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //Tells server it's receiving JSON
      },
      body: JSON.stringify({ ingredients, category }), //Sends the ingredient input to the backend
    });

    const data = await res.json();
    if (data.result) {
      responseContainer.innerHTML = `<pre>${data.result}</pre>`;
    } else {
      responseContainer.innerHTML = "<p>Sorry, something went wrong. Try again.</p>";
    }
  } catch (err) {
    console.error("Fetch error:", err)
    responseContainer.innerHTML = "<p>Error connecting to AI.</p>";
  }
});
