import {Link} from '@remix-run/react';

export default function CatchAll() {
  return (
    <div className="w-full min-h-[100svh] md:h-full flex flex-col items-center justify-start gap-12 pt-12 md:pt-32 text-allium-dark-brown">
      <h1 className="text-5xl font-medium">404 - Page Not Found</h1>
      <p className="text-3xl">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="w-fit bg-allium-dark-green text-allium-cream px-2 md:px-8 py-2 md:py-4 rounded-lg border-2 border-allium-dark-green hover:bg-allium-light-green transition duration-300 text-center"
      >
        Return Home
      </Link>
    </div>
  );
}
