import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {COLLECTIONS_QUERY} from '~/lib/queries/collections';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | Collections'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);
  return {collections};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  const allProductsCollection = {
    id: 'all',
    title: 'All Products',
    handle: 'all',
    image: null, // or provide a default image if needed
  };

  const orderedCollections = [allProductsCollection, ...collections.nodes];

  return (
    <div className="w-full min-h-[100svh] md:h-screen pt-12 pb-24 md:pt-20 md:pb-0 text-allium-dark-green">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 md:mb-12">
        Collections
      </h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {orderedCollections.map((collection: CollectionFragment) => (
          <Link
            key={collection.id}
            className="group"
            to={`/collections/${collection.handle}`}
            prefetch="intent"
          >
            <div className="w-full aspect-5/6 border border-allium-dark-brown overflow-hidden">
              {collection?.image && (
                <Image
                  alt={collection.image.altText || collection.title}
                  data={collection.image}
                  loading="eager"
                  sizes="(min-width: 45em) 400px, 100vw"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <h5 className="text-lg md:text-xl mt-2 group-hover:text-allium-light-green transition-colors duration-300">
              {collection.title}
            </h5>
          </Link>
        ))}
      </div>
    </div>
  );
}
