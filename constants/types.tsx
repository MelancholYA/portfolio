import { SanityImageAssetDocument } from "next-sanity";

export type PostType = {
  categoryTitle: string;
  title: string;
  summary: string;
  slug: { current: string };
  authorName: string;
  publishedAt: string;
  image: SanityImageAssetDocument;
  body: string;
};

export type CommentType = {
  name: string;
  comment: string;
  _id: string;
  email: string;
};
