import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
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

type SortKey = 'default' | 'newest' | 'oldest' | 'price-low' | 'price-high';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Allium Shop | All Products`}];
};

export async function loader({context, request}: LoaderFunctionArgs) {
  const {storefront} = context;
  const url = new URL(request.url);
  const sortKey = (url.searchParams.get('sort') || 'default') as SortKey;

  const [{products}, {collections}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {
        first: 250, // Fetch up to 250 products at once
      },
    }),
    storefront.query(COLLECTIONS_QUERY),
  ]);

  return {
    products,
    collections: collections.nodes,
    sortKey,
  };
}

export default function Collection() {
  const {
    products,
    collections,
    sortKey: initialSortKey,
  } = useLoaderData<typeof loader>();
  const [currentSort, setCurrentSort] = useState<SortKey>(initialSortKey);
  const navigate = useNavigate();

  const sortedProducts = useMemo(() => {
    const productNodes = [...products.nodes];

    switch (currentSort) {
      case 'newest':
        return productNodes.sort((a, b) => {
          const dateA = new Date(a.publishedAt || 0);
          const dateB = new Date(b.publishedAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
      case 'oldest':
        return productNodes.sort((a, b) => {
          const dateA = new Date(a.publishedAt || 0);
          const dateB = new Date(b.publishedAt || 0);
          return dateA.getTime() - dateB.getTime();
        });
      case 'price-low':
        return productNodes.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
          return priceA - priceB;
        });
      case 'price-high':
        return productNodes.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
          return priceB - priceA;
        });
      default:
        return productNodes;
    }
  }, [products.nodes, currentSort]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortKey;
    setCurrentSort(newSort);
    const url = new URL(window.location.href);
    url.searchParams.set('sort', newSort);
    navigate(url.search, {replace: true});
  };

  return (
    <div className="w-full min-h-[100svh] md:min-h-screen pt-12 pb-24 md:pt-20 md:pb-32">
      <CollectionsNav collections={collections} />
      <section className="flex justify-between items-end mb-8">
        <div className="flex items-center gap-3">
          <span className="text-lg text-allium-dark-green">Sort By:</span>
          <div className="relative flex justify-between">
            <select
              value={currentSort}
              onChange={handleSortChange}
              className="appearance-none bg-transparent py-1 text-lg text-allium-dark-green focus:outline-none cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <div className="pointer-events-none flex items-center">
              <svg
                className="h-4 w-4 text-allium-dark-green"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-2xl text-allium-dark-green flex items-center gap-2">
          <h2>All Products</h2>
          <p>[{products.nodes.length}]</p>
        </div>
      </section>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {sortedProducts.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 12 ? 'eager' : undefined}
          />
        ))}
      </div>
      <Analytics.CollectionView
        data={{
          collection: {
            id: 'all-products',
            handle: 'all',
          },
        }}
      />
    </div>
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
      <h5 className="text-lg md:text-xl text-allium-dark-green mt-2 group-hover:text-allium-light-green transition-colors duration-300">
        {product.title}
      </h5>
      <p className="text-base text-allium-dark-brown">
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

const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
` as const;
