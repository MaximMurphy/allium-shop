import {Link, useLocation} from '@remix-run/react';
import type {CollectionFragment} from 'storefrontapi.generated';

export default function CollectionsNav({
  collections,
}: {
  collections: CollectionFragment[];
}) {
  const location = useLocation();

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 items-center text-center mb-8 md:mb-12 text-allium-cream md:text-lg">
      <Link
        to={`/collections/all`}
        className={`bg-allium-brown py-1 hover:underline transition-all duration-300 ${
          location.pathname === '/collections/all'
            ? 'font-medium underline'
            : ''
        }`}
      >
        <p>All</p>
      </Link>
      {collections.map((collection, index) => (
        <Link
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          to={`/collections/${collection.handle}`}
          className={`py-1 hover:underline transition-all duration-300 ${
            location.pathname === `/collections/${collection.handle}`
              ? 'font-medium underline'
              : ''
          } ${
            index === 0
              ? 'bg-allium-dark-green'
              : index === 1
              ? 'bg-allium-dark-brown'
              : 'bg-allium-green'
          }`}
        >
          <p>{collection.title}</p>
        </Link>
      ))}
    </div>
  );
}
