import { SanityDocument } from "next-sanity";
import { client } from "../../tools/sanity/client";
import { User } from "lucide-react";
import { CommentType } from "../../constants/types";

const COMMENT_QUERY = `
      *[_type == "comment" && post._ref == $postId && approved == true]{
        _id,
        name,
        email,
        comment,
        _createdAt
      } | order(_createdAt asc)
    `;

const options = { next: { revalidate: 30 } };

type Props = {
  postId: string;
};

const CommentsList = async ({ postId }: Props) => {
  const comments = await client.fetch<SanityDocument<CommentType[]>>(
    COMMENT_QUERY,
    { postId },
    options
  );

  return (
    <div className=" ">
      <h2 className="text-2xl font-bold mb-8 ">Comments ({comments.length})</h2>

      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="space-y-4 mb-12  ">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-4 p-3 py-4 bg-primary/5 rounded"
            >
              <div className="flex-shrink-0 hidden md:block">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                  <User size={20} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white/80 ">
                    {comment.name}
                  </h4>
                </div>
                <p className="text-white/70 leading-5">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
