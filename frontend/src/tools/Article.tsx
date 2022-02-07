import Citation, { Author, InTextCitations } from "./Citation";
import { Image } from "../components/Lightbox";

export enum ArticleEditType {
  CORRECTION = "correction",
  RETRACTION = "retraction",
  ADDENDA = "addenda",
  CONCERN = "concern",
  COMMENT = "comment",
}

export interface ArticleEdit {
  date: Date;
  type: ArticleEditType;
  reason: string;
}

export interface ArticleData {
  id: number;
  path: string;
  description: string;
  image: Image;
  date: Date;
  authors: Author[];
  title: string;
  tags: string[];
  readTime: number;
  references: Citation[];
  component: React.FunctionComponent<InTextCitations>;
  comments?: boolean;
  edits?: ArticleEdit[];
}
