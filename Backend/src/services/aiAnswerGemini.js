const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

exports.aiAnswerGemini = async (userQuestion, userAnswer) => {
    let userInput = `
            User Question: ${userQuestion}  
            User Answer: ${userAnswer}  
            `
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userInput,
        config: {
            systemInstruction: `You are a professional interview assistant.
            Give clear, concise, and constructive feedback on the candidate's answer to the question.
            Avoid greetings. Only output the feedback.`
        }
    });
    return response.text;
}




