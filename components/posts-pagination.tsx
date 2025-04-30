import { client } from "../tools/sanity/client";
import { PAGE_SIZE } from "../constants/fetch";
import Link from "next/link";

type Props = {
  category?: string;
  currentPage?: number;
};

const options = { next: { revalidate: 30 } };

const PostsPagination = async ({ category, currentPage }: Props) => {
  const COUNT_QUERY = `count(*[
        _type == "post" 
        ${category ? `&& category->name == "${category}"` : ""}
        && defined(slug.current)
      ])`;

  const totalCount = await client.fetch<number>(COUNT_QUERY, {}, options);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  console.log(totalCount, totalPages);
  if (totalPages < 2) return;

  return (
    <div className="flex items-center gap-3">
      {[...new Array(totalPages)].map((_, i) => (
        <Link
          className={`bg-primary/30 hue p-1 px-2 rounded text-white min-w-10 border-2 text-center ${currentPage === i + 1 ? "border-primary" : "border-transparent"} `}
          key={i}
          href={`/blog/posts?${category ? `category=${category}&&` : ""}page=${i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
};

export default PostsPagination;
