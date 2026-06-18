export interface ArticlePayload {
  userId: number;
  title: string;
  body: string;
}

export interface ArticlesData {
  articles: ArticlePayload[];
}