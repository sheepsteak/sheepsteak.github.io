export interface PostFrontMatter {
  layout: string;
  published: string;
  title: string;
}

export interface Post {
  content: string;
  layout: string;
  published: Date;
  slug: string;
  title: string;
}
