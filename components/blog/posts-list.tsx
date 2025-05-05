import { SanityDocument } from "next-sanity";
import { PostType } from "../../constants/types";
import Post from "../post/post";

const PostsList = ({ posts }: { posts: SanityDocument<PostType>[] }) => {
  return (
    <ul className="flex flex-col gap-y-4 list-none my-8">
      {posts[0] && <Post post={posts[0]} withImage />}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 md:gap-y-12">
        {posts.slice(1).map((post) => (
          <Post key={`posts-${post.slug.current}`} post={post} />
        ))}
      </div>
    </ul>
  );
};

export default PostsList;
