const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  const { ingredients } = JSON.parse(event.body);

  const prompt = `
You are an expert bartender and chef. A user has the following ingredients: ${ingredients}.
Suggest a fun cocktail or meal they can make, with a short, friendly description and steps.
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." }),
    };
  }
};
