import { ArticleAuthor } from '../components/Article';

interface Citation {
    title: string;
    publisher: string;
    authors?: Array<ArticleAuthor>;
    site?: string;
    date_month?: string;
    date_year?: number;
    date_day?: number;
    id?: string;
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
