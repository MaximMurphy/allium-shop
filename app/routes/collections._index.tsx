import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  return [{title: 'Allium Shop | Collections'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);
  return {collections};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  if (!collections?.nodes?.length) {
    return (
      <div className="collections">
        <h1>Collections</h1>
        <p>
          No collections found. Please check if the collections exist in your
          Shopify store.
        </p>
      </div>
    );
  }

  return (
    <div className="collections">
      <h1>Collections</h1>
      <div className="collections-grid">
        {collections.nodes.map((collection: CollectionFragment) => (
          <Link
            key={collection.id}
            className="collection-item"
            to={`/collections/${collection.handle}`}
            prefetch="intent"
          >
            {collection?.image && (
              <Image
                alt={collection.image.altText || collection.title}
                aspectRatio="3/5"
                data={collection.image}
                loading="eager"
                sizes="(min-width: 45em) 400px, 100vw"
              />
            )}
            <h5>{collection.title}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections {
    collections(first: 4) {
      nodes {
        ...Collection
      }
    }
  }
` as const;
