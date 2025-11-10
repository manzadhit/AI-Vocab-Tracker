const ai = require("../configs/ai.config");
const prisma = require("../../prisma/client");

const generateWordDetails = async (word) => {
  const promnt = `
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
    `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: promnt,
    config: {
      systemInstruction: `
      You are an experienced English teacher helping Indonesian students learn English. 
      - Explain grammar, vocabulary, and pronunciation clearly using simple English. 
      - When needed, give short examples and Indonesian explanations to make it easier to understand. 
      - Avoid overly formal or robotic responses. Keep it natural and engaging.
    `,
    },
  });

  return JSON.parse(response.text);
};

const saveDetailToDatabase = async (wordDetails, userId) => {
  const details = await prisma.vocabulary.create({
    data: { ...wordDetails, userId },
  });

  return details;
};

module.exports = { generateWordDetails, saveDetailToDatabase };
