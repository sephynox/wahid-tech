export interface InTextCitations {
  readonly r: Record<string, Citation>;
}

export interface Author {
  readonly given: string;
  readonly family: string;
  readonly middle?: string;
  readonly dns?: string;
  readonly og?: string;
}

export const formatAuthorName = (author: Author): string => {
  return `${author.given} ${author.middle ? author.middle.substring(0, 1) + ". " : " "}${author.family}`;
};

interface Citation {
  id: string;
  title: string;
  publisher: string;
  authors?: Array<Author>;
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
