import { GoogleGenerativeAI } from "@google/generative-ai";
import { GooglePaLM } from "langchain/llms/googlepalm";
import { SUGGEST_ARTILCES_BODY } from "../constants/types";

const ai = new GoogleGenerativeAI(`${process.env.GOOGLE_PALM_API_KEY}`);

const model = ai.getGenerativeModel({
  model: 'gemini-pro'
});

const writeWithGemini = async (title: string, tags: string[] | string, word_count: string) => {

  const prompt = `Write an article in markdown with the title "${title}" with a word count of ${word_count}. 
                  Ensure to use examples in text, code and image formats where necessary.
                  Optimise the content for exemplary SEO with the following tags: "${typeof tags === "string" ? tags : tags.join(', ')}".
                  Language: human, tutorial
                  `
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;       
}

const suggestArticles = async ({ trends, limit }: SUGGEST_ARTILCES_BODY) => {
  try {
    const prompt = `Suggest ${limit} article titles from the following trending topics on social media.
                    "${trends}".
                    Language: human, exciting, captivating
                  `
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error: any) {
    return error.message;
  }
}

const writeArticle = async (title: string, tags: string[] | string) => {
  const model = new GooglePaLM({
    apiKey: process.env.GOOGLE_PALM_API_KEY,
    temperature: 1,
    modelName: "models/gemini-pro",
    maxOutputTokens: 4000,
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
    stopSequences: ["stop"],
  });
  const res = await model.generate(
    [
      `You are a developer teaching your students about ${typeof tags === "string" ? tags : tags.join(', ')}`,
      `Write an article/blog post with the title ${title} for yoour readers/learners`,
      'Make sure to use examples and assume you are teaching a newbie',
      // 'Refer to the subject in the third person after the first two mentions',
      'language: human and tutorial'
    ]
  );

  return res;
};

export const AI = {
  writeArticle,
  writeWithGemini,
  suggestArticles
}