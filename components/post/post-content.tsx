import { PortableText, SanityDocument } from "next-sanity";
import { PostType } from "../../constants/types";
import Image from "next/image";
import CodeBlock from "./code-block";

const PostContent = ({
  post,
  imageUrl,
}: {
  post: SanityDocument<PostType>;
  imageUrl: string;
}) => {
  return (
    <div>
      {post?.image && (
        <figure>
          <Image
            src={imageUrl}
            alt={`Cover image for ${post.title}`}
            className="rounded-xl w-full"
            width={550}
            height={310}
          />
        </figure>
      )}
      <section className="mt-16">
        {Array.isArray(post.body) && (
          <PortableText
            value={post.body}
            components={{
              types: {
                code: ({ value }) => (
                  <CodeBlock language={value.language} code={value.code} />
                ),
              },
            }}
          />
        )}
      </section>
    </div>
  );
};

export default PostContent;
