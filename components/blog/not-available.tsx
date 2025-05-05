import { MonitorXIcon } from "lucide-react";
import Link from "next/link";

const NoPostsAvailable = () => {
  return (
    <div className="flex min-h-96 py-32 flex-col items-center justify-center text-center">
      <MonitorXIcon className="h-16 w-16 text-gray-400" />
      <h3 className="mt-6 text-xl font-light text-primary">
        No posts available at the moment.
      </h3>
      <p className="mt-2 max-w-md text-gray-500">
        We&apos;re working on creating new content. Please check back soon for
        updates.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/blog">Return to home</Link>
        <Link href="/#contact">Contact us</Link>
      </div>
    </div>
  );
};

export default NoPostsAvailable;
