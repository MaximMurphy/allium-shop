import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Link,
  type MetaFunction,
  useNavigate,
} from '@remix-run/react';
import {
  getPaginationVariables,
  Image,
  Money,
  Analytics,
} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useState, useMemo} from 'react';
import CollectionsNav from '~/components/CollectionsNav';
import {COLLECTIONS_QUERY} from '~/lib/queries/collections';
import {CollectionTransition} from '~/components/CollectionPageTransition';

type SortKey = 'default' | 'newest' | 'oldest' | 'price-low' | 'price-high';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Allium Shop | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader({context, params, request}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const url = new URL(request.url);
  const sortKey = (url.searchParams.get('sort') || 'default') as SortKey;

  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}, {collections}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {
        handle,
        ...paginationVariables,
      },
    }),
    storefront.query(COLLECTIONS_QUERY),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return {
    collection,
    collections: collections.nodes,
    sortKey,
  };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    throw redirect('/collections');
  }

  const [{collection}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {handle, ...paginationVariables},
      // Add other queries here, so that they are loaded in parallel
    }),
  ]);

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return {
    collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export default function Collection() {
  const {
    collection,
    collections,
    sortKey: initialSortKey,
  } = useLoaderData<typeof loader>();
  const [currentSort, setCurrentSort] = useState<SortKey>(initialSortKey);
  const navigate = useNavigate();

  const sortedProducts = useMemo(() => {
    const products = [...collection.products.nodes];

    switch (currentSort) {
      case 'newest':
        return products.sort((a, b) => {
          const dateA = new Date(a.publishedAt || 0);
          const dateB = new Date(b.publishedAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
      case 'oldest':
        return products.sort((a, b) => {
          const dateA = new Date(a.publishedAt || 0);
          const dateB = new Date(b.publishedAt || 0);
          return dateA.getTime() - dateB.getTime();
        });
      case 'price-low':
        return products.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
          return priceA - priceB;
        });
      case 'price-high':
        return products.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
          return priceB - priceA;
        });
      default:
        return products;
    }
  }, [collection.products.nodes, currentSort]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortKey;
    setCurrentSort(newSort);
    const url = new URL(window.location.href);
    url.searchParams.set('sort', newSort);
    navigate(url.search, {replace: true});
  };

  return (
    <CollectionTransition>
      <div className="w-full min-h-[100svh] md:min-h-screen pt-12 pb-24 md:pt-20 md:pb-32 text-allium-dark-brown">
        <CollectionsNav collections={collections} />
        <section className="flex flex-col md:flex-row justify-between md:items-end gap-2 md:gap-0 mb-6 md:mb-8">
          <div className="flex md:hidden text-lg items-center gap-1">
            <h2>{collection.title}</h2>
            <p>[{collection.products.nodes.length}]</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-lg">Sort By:</span>
            <div className="relative flex justify-between">
              <select
                value={currentSort}
                onChange={handleSortChange}
                className="w-fit py-1 text-lg border border-allium-brown p-2 focus:outline-none rounded-md cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className="hidden md:flex text-2xl items-center gap-2">
            <h2>{collection.title}</h2>
            <p>[{collection.products.nodes.length}]</p>
          </div>
        </section>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {sortedProducts.map((product, index) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          ))}
        </div>
        <Analytics.CollectionView
          data={{
            collection: {
              id: collection.id,
              handle: collection.handle,
            },
          }}
        />
      </div>
    </CollectionTransition>
  );
}

function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  return (
    <Link className="group" key={product.id} prefetch="intent" to={variantUrl}>
      <div className="w-full aspect-5/6 border border-allium-dark-brown overflow-hidden">
        {product.featuredImage && (
          <Image
            alt={product.featuredImage.altText || product.title}
            data={product.featuredImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <h5 className="text-lg md:text-xl mt-2 group-hover:text-allium-light-brown transition-colors duration-300">
        {product.title}
      </h5>
      <p className="text-base">
        <Money data={product.priceRange.minVariantPrice} />
      </p>
    </Link>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    publishedAt
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $sortKey: ProductCollectionSortKeys
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        sortKey: $sortKey
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
