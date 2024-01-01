export interface TRENDING_ARTICLE {
    id: string;
    title: string;
    published_at: string | Date;
    metrics: {
        likes: number;
        comments: number;
        shares?: number;
    },
    url: string;
    image: string;
    tags: string[];
    author: {
        name: string;
        username: string;
        github?: string;
        x?: string;
        website?: string;
    };
    providers: Array<'Medium' | 
              'Forem' | 
              'X' |
              'Hashnode'> 
}