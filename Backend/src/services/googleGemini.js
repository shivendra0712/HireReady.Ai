const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

exports.useGemini = async (jobTitle , experience ,interviewType ,interviewLevel) => {
    let userInput = `
            Job Title: ${jobTitle}  
            Experience: ${experience}years  
            Interview Type: ${interviewType}  
            Difficulty Level: ${interviewLevel} 
            `
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userInput,
        config: {
            systemInstruction: `
        You are an expert AI assistant trained to generate high-quality, relevant interview questions based on the user's input.

        The user will provide the following:
        1. Job Title (e.g., MERN Stack Developer, Backend Engineer, Data Scientist)
        2. Years of Experience (e.g., 0-1, 2-4, 5+)
        3. Interview Type (e.g., Technical, Behavioral, System Design, Coding)
        4. Difficulty Level (Easy, Medium, Hard)

        Your task:
        - Generate a list of highly relevant interview questions.
        - Do NOT include answers, explanations, or any extra text.
        - Output only the questions in a clear numbered or bulleted format.
        - Make sure questions match the Job Title, Experience, Interview Type, and Difficulty Level.
        - Do not add greetings, context, or summaries—only the questions.

        Strictly return only the questions.
        `
        }

    });
    return response.text;
}
