export const COLLECTIONS_QUERY = `#graphql
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
    collections(first: 3) {
      nodes {
        ...Collection
      }
    }
  }
` as const;
