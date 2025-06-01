// If package.json does NOT have "type": "module" -> require & exports - not import or export
const { OpenAI } = require("openai"); //brings in the OpenAI library
require("dotenv").config();

// Creates a new instance of the OpenAI client using Netlify env var
let openai;
try {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY environment variable");
    }
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
} catch (err) {
    console.error("Failed to initialize OpenAI client:", err);
    throw err;
}

// Export the handler function that Netlify uses for the serverless endpoint
exports.handler = async (event, context) => {
    // Only respond to POST requests to prevent misuse via GET
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed: Only POST requests accepted" }),
        };
    }

    let body, prompt;

    try {
        if (!event.body) {
            throw new Error("Missing request body");
        }

        // Parse the JSON body from the client request
        body = JSON.parse(event.body);
        const { ingredients = "", category } = body;

        // Convert ingredients into a string and this works as well
        const ingredientList = ingredients.split(",").map(i => i.trim())
        //this seems to work with ai
        // const ingredientList = ingredients;

        // Build a prompt for the AI based on ingredients and category
        prompt = ` You are a friendly expert bartender, chef, or nutritionist. A user has the following ingredients at home: ${ingredientList}. Suggest one fun ${category === 'cocktail' ? "cocktail" : "meal"} they can make, with: a title, a short description, a simple recipe with steps, calories (approximate), and serving size.
        `;
    } catch (err) {
        console.error("Request parsing failed:", err);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body or missing fields." }),
        };
    }

    let completion;
    try {
        // Send the prompt to OpenAI and wait for a response
        completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "you are a friendly expert bartender, chef or nutritionist." },
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
        });
    } catch (err) {
        console.error("OpenAI API request failed:", err);
        return {
            statusCode: 502,
            body: JSON.stringify({ error: "Failed to get response from OpenAI API." }),
        };
    }

    try {
        // Extract and return message as a string
        const result = completion.choices[0].message.content;
        return {
            statusCode: 200,
            body: JSON.stringify({ result }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || "Something went wrong." }),
        };
    }
};
