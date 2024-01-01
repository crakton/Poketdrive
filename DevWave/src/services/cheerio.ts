import * as cheerio from 'cheerio';
import axios from 'axios';

const getTrendingOnMedium = async (keyword: string) => {
    const { data } = await axios.get(`https://medium.com/?tag=${keyword}`);

    const $ = cheerio.load(data, null, false);
    const titlesTag = $('a h2');

    const titles: any[] = [];
    $(titlesTag).each((index, el) => {
        titles[index] = ($(el).text());
        // console.log("Element", titles)
    });

    return titles.slice(2, titles.length - 3);
}


export const CRAWLER = {
    getTrendingOnMedium
}