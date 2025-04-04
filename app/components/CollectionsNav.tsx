import {Link} from '@remix-run/react';
import type {CollectionFragment} from 'storefrontapi.generated';

export default function CollectionsNav({
  collections,
}: {
  collections: CollectionFragment[];
}) {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 items-center text-center mb-8 md:mb-12 text-allium-cream md:text-lg">
      <Link
        to={`/collections/${collections[0].handle}`}
        className="bg-allium-brown py-1 hover:font-medium transition-all duration-300"
      >
        <p>{collections[0].title}</p>
      </Link>
      <Link
        to={`/collections/${collections[1].handle}`}
        className="bg-allium-dark-green py-1 hover:font-medium transition-all duration-300"
      >
        <p>{collections[1].title}</p>
      </Link>
      <Link
        to={`/collections/${collections[2].handle}`}
        className="bg-allium-dark-brown py-1 hover:font-medium transition-all duration-300"
      >
        <p>{collections[2].title}</p>
      </Link>
      <Link
        to={`/collections/${collections[3].handle}`}
        className="bg-allium-green py-1 hover:font-medium transition-all duration-300"
      >
        <p>{collections[3].title}</p>
      </Link>
    </div>
  );
}
