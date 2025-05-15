"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useDebounce from "../../hooks/useDebounce";
import { client } from "../../tools/sanity/client";
import { SanityDocument } from "next-sanity";
import { PostType } from "../../constants/types";
import Link from "next/link";

const POSTS_QUERY = `*[
    _type == "post" && title match $searchQuery
    && defined(slug.current) 
  ]|order(publishedAt desc)[0...5]{_id, title, slug, image, publishedAt, "authorName": author->name, "categoryTitle": category->name, summary}`;
const options = { next: { revalidate: 30 } };

async function fetchPosts(searchQuery: string) {
  return client.fetch<SanityDocument<PostType>[]>(
    POSTS_QUERY,
    { searchQuery },
    options
  );
}

export function ExpandableSearch() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  const searchQuery = useDebounce(inputValue);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const result = await fetchPosts(searchQuery);
      setPosts(result);
      setIsLoading(false);
    };
    if (searchQuery) {
      getPosts();
    }
  }, [searchQuery]);

  return (
    <div
      className={`group relative flex items-center border hue min-w-72 px-3 rounded-md justify-start `}
    >
      <div
        className={`flex h-10 items-center w-full justify-start   bg-muted  transition-all duration-300 ease-in-out `}
      >
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search..."
          className={`h-full bg-transparent text-xs px-2 outline-none placeholder:text-muted-foreground  duration-300 ease-in-out w-full opacity-100`}
        />

        {searchQuery && (
          <div className="absolute bg-black/80 hue top-full left-0  translate-y-3 w-full rounded-md border bg-card p-2 py-4 shadow-md">
            {!isLoading ? (
              <>
                <div className="text-xs font-medium text-muted-foreground  px-2">
                  {posts.length} result{posts.length !== 1 ? "s" : ""}
                </div>
                <ul>
                  {posts.map((post) => (
                    <li
                      key={post.slug.current}
                      className=" flex items-center px-1"
                      onClick={() => setInputValue("")}
                    >
                      •
                      <Link
                        key={post.slug.current}
                        className=" line-clamp-1 p-1 text-white"
                        href={`/blog/posts/${post.slug.current}`}
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="px-2 text-xs">Loading...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
