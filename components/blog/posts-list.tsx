import { SanityDocument } from "next-sanity";
import { PostType } from "../../constants/types";
import Post from "../post/post";

const PostsList = ({ posts }: { posts: SanityDocument<PostType>[] }) => {
  return (
    <ul className="flex flex-col gap-y-4 list-none my-8">
      {posts[0] && <Post post={posts[0]} withImage />}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 md:gap-y-12">
        {posts.slice(1).map((post, i) => (
          <div
            key={`posts-${post.slug.current}`}
            // style={{
            //   gridColumn: "1 / 2",
            // }}
            className={`h-full ${
              (i + 1) % 3 === 0
                ? "md:col-span-2 lg:col-span-3"
                : (i + 1) % 2 === 0
                ? "lg:col-span-2"
                : "lg:col-span-1"
            }`}
          >
            <Post withImage={(i + 1) % 3 === 0} post={post} />
          </div>
        ))}
      </div>
    </ul>
  );
};

export default PostsList;
