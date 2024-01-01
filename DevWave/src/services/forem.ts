import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'accept': process.env.FOREM_ACCEPT_HEADER,
        'api-key': process.env.FOREM_API_KEY
    }
})

const getTopPosts = async ({ limit }: any) => {
    const _response = axiosInstance.get('https://dev.to/api/articles');

    return (await _response).data.sort((a: any, b: any) => {
        if (a.positive_reactions_count < b.positive_reactions_count) return 1;
        if (a.positive_reactions_count > b.positive_reactions_count) return -1;
      }).slice(0, limit);
}

export const FOREM = {
    getTopPosts
}