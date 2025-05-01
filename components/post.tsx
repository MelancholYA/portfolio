import ImageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { client } from "../tools/sanity/client";
import { PostType } from "../constants/types";

type Props = {
  post: PostType;
  withImage?: boolean;
};

const Post = ({ post, withImage = false }: Props) => {
  const builder = ImageUrlBuilder(client);
  return (
    <li className="list-none hue p-6 rounded bg-primary/40 flex items-center justify-between">
      <div className="">
        <span className="p-1 px-4 capitalize bg-primary/40 text-pretty rounded-full">
          {post?.categoryTitle}
        </span>
        <div className="px-1">
          <h3 className="font-semibold capitalize my-4">{post?.title}</h3>
          <p>{post?.summary}</p>
          <Link
            className="mt-2 block"
            href={`/blog/posts/${post?.slug.current}`}
          >
            {" "}
            Read full article{" "}
          </Link>
          <p className="md:mt-16 mt-4">
            {post?.authorName} <br />
            {new Date(post?.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      {post?.image && withImage && (
        <Image
          alt="alternative"
          className="w-5/12 h-auto object-cover md:block hidden"
          width={200}
          height={200}
          src={builder.image(post?.image).url()}
        />
      )}
    </li>
  );
};

export default Post;
