import { SanityDocument } from "next-sanity";
import { PostType } from "../../constants/types";
import Link from "next/link";
import { Share2 } from "lucide-react";

const PostHeader = ({
  post,
  url,
}: {
  post: SanityDocument<PostType>;
  url: string;
}) => {
  return (
    <header className="mb-8">
      <h1 className="mb-4 text-4xl text-center">{post.title}</h1>
      <div className="flex items-center justify-between border-y-[1px] py-2 border-primary/20 px-4 my-8 w-full">
        <div>
          <time
            dateTime={post.publishedAt}
            className="block text-primary text-sm"
          >
            Published:{" "}
            {new Date(post?.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <p className="text-primary text-sm my-0">{post.authorName}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href={`${url}?share=true`}
            className="inline-flex items-center no-underline px-3 py-1.5 text-sm border border-gray-700 rounded-md text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
