import { TRENDING_ARTICLE } from "./articles";

export interface POST extends TRENDING_ARTICLE {
    slug: string;
    canonical_url: string;
    created_at: string | Date;
}