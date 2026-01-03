export interface WordpressPost {
  id: string;
  date: string;
  link: string;
  title: string;
  content: string;
  featuredmedia: string;
  class_list: string[];
}

export interface WordpressEntity {
  id: string;
  category: number;
  title: string;
  description?: string;
  image?: string;
}
