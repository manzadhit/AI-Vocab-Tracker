const { GoogleGenAI } = require("@google/genai");
const config = require("./config");

const ai = new GoogleGenAI({ apiKey: config.geminiApi });

module.exports = ai;