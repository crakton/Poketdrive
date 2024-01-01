import { OpenAI } from "openai";
import { CompletionCreateParamsNonStreaming } from "openai/resources";
import { GENERATE_ARTICLE_BODY } from "../constants/types";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY
})

const getEngines = () => {
    const _result = openai.models.list();
    return _result;
}

const generateArticle = async (data: GENERATE_ARTICLE_BODY) => {
    const _result: any = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct', // is this the right model?
        prompt: `write an article with the title: 
            "${data.title}" with a word count of 
            ${data.word_count ? data.word_count : 2000}
            language: human, tutorial
            Don't stop generating till it's finished.`
    });
    console.log('Result: ', _result);
    return _result.choices[0].text;
}

export const OPEN_AI = {
    getEngines,
    generateArticle
};