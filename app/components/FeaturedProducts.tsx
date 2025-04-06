import {Link} from '@remix-run/react';

export default function FeaturedProducts() {
  return (
    <div className="w-full h-full pt-12 md:pt-20 text-allium-dark-brown">
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full flex items-end justify-between">
          <h2 className="text-4xl md:text-6xl font-medium mb-12">Featured</h2>
          <Link
            to="/collections/all"
            className="text-lg md:text-2xl font-medium hover:text-allium-light-green transition-all duration-300 mb-12"
          >
            {`Shop All >>`}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Sample product cards */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-allium-cream aspect-5/6 border-2 border-allium-dark-brown"
            >
              <div className="w-full h-full bg-allium-light-brown/10"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="z-10 w-screen flex h-8 mt-20 md:mt-24">
        <div className="w-1/4 bg-allium-brown"></div>
        <div className="w-1/4 bg-allium-dark-green"></div>
        <div className="w-1/4 bg-allium-dark-brown"></div>
        <div className="w-1/4 bg-allium-green"></div>
      </div>
    </div>
  );
}
