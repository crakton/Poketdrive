export interface GENERATE_ARTICLE_BODY {
    title: string;
    keywords: string[];
    word_count?: number;
};

export interface SUGGEST_ARTILCES_BODY {
    trends: string[]; // an array of trending article titles
    limit: number; // number of titles to suggest
}

export type SERVER_RESPONSE = {
    data: object;
    status: any;
    error?: {
        message: string;
    } 
}