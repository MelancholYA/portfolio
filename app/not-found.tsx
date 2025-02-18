import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center backdrop-blur-sm justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-500">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-4 text-blue-500">
        Go back home
      </Link>
    </div>
  );
}
