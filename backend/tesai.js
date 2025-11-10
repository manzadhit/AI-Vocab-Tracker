const ai = require("./src/configs/ai.config");

async function main(word) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Analyze this English vocabulary word for Indonesian learners: "${word}"

Provide the following in JSON format:
{
  "word": "${word}",
  "partOfSpeech": "noun/verb/adjective/adverb/etc",
  "meaning": "clear definition in English",
  "exampleSentence": "one complete sentence using the word naturally",
  "synonyms": ["synonym1", "synonym2", "synonym3"],
  "antonyms": ["antonym1", "antonym2"],
  "contextCategory": ["category1", "category2"],
  "pronunciation": "IPA pronunciation",
  "masteryLevel": 1-5,
  "notes": "tips penggunaan, common mistakes, atau cara mengingat kata ini"
}

CRITICAL RULES:
- Return ONLY valid JSON, NO markdown, NO code blocks, NO backticks
- notes bisa dalam Bahasa Indonesia untuk tips yang lebih mudah dipahami
- synonyms dan antonyms tetap dalam English

DIFFICULTY LEVEL (1-5):
1 = Sangat basic (cat, run, happy)
2 = Everyday words (work, beautiful, important)
3 = Intermediate (analyze, efficient, professional)
4 = Advanced (paradigm, facilitate, intrinsic)
5 = Very advanced/rare (ubiquitous, ephemeral, serendipitous)

contextCategory examples: ["business", "academic"], ["everyday", "casual"], ["formal", "technical"]
`,
    config: {
      systemInstruction: "You are a English Teacher, Teaching Indonesian Student",
    },
  });
  console.log(JSON.parse(response.text));
}

main("sacriface");
