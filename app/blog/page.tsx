import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedPosts } from "../../components/featured-posts";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 min-h-[70vh] grid place-items-center">
          <div className="container mx-auto px-4 ">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                Thoughts on design, development, and the digital world
              </h1>
              <p className="text-primary mb-8 md:text-lg">
                A collection of articles, insights, and perspectives on creating
                meaningful digital experiences.
              </p>
              <button className="rounded-full px-6">
                <Link
                  href="/blog/posts"
                  className="flex items-center gap-2 hover:gap-4 transition-all"
                >
                  View all articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </button>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-12 bg-primary/10 hue">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-light mb-8 text-center">
              Featured Articles
            </h2>
            <FeaturedPosts />
          </div>
        </section>

        {/* Newsletter */}
        {/* <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-2xl font-light mb-4">Stay updated</h2>
              <p className="text-primary mb-6">
                Subscribe to our newsletter to receive the latest articles and
                updates.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 border border-primary text-black bg-primary/70 hue placeholder:text-gray-700 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-primary/200"
                  required
                />
                <button type="submit" className="whitespace-nowrap rounded-md">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
