import { ArticleAuthor } from '../components/blog/Article';

export interface InTextCitations {
    r: Record<string, Citation>
};

interface Citation {
    id: string;
    title: string;
    publisher: string;
    authors?: Array<ArticleAuthor>;
    site?: string;
    date_month?: string;
    date_year?: number;
    date_day?: number;
    url?: string;
    archive?: string;
    chapter?: string;
    volume?: number;
    page_start?: number;
    page_end?: number;
    journal?: string;
    book?: boolean;
    blog?: boolean;
}

export default Citation;
