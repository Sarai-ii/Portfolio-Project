import fetch from 'node-fetch';

exports.handler = async (event) => {
  const { prompt } = JSON.parse(event.body);

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ result: data.choices[0].text })
  };
};
