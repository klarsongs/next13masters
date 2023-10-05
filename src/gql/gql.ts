/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "fragment Cart on Order {\n  id\n  total\n  orderItems {\n    id\n    total\n    quantity\n    product {\n      id\n      name\n      description\n      price\n    }\n  }\n}": types.CartFragmentDoc,
    "mutation CartRemoveProduct($itemId: ID!, $orderId: ID!, $orderTotal: Int!) {\n  updateOrder(\n    where: {id: $orderId}\n    data: {total: $orderTotal, orderItems: {delete: {id: $itemId}}}\n  ) {\n    ...Cart\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartSetItemQuantity($itemId: ID!, $quantity: Int!, $total: Int!, $orderId: ID!, $orderTotal: Int!) {\n  updateOrder(\n    where: {id: $orderId}\n    data: {total: $orderTotal, orderItems: {update: {where: {id: $itemId}, data: {quantity: $quantity, total: $total}}}}\n  ) {\n    id\n  }\n}": types.CartSetItemQuantityDocument,
    "mutation CartUpdateOrder($total: Int!, $quantity: Int!, $orderItemId: ID!, $orderId: ID!, $productId: ID!, $orderTotal: Int!) {\n  upsertOrder(\n    upsert: {create: {total: $orderTotal, orderItems: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}}}}, update: {total: $orderTotal, orderItems: {upsert: {where: {id: $orderItemId}, data: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}}, update: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}}}}}}}\n    where: {id: $orderId}\n  ) {\n    ...Cart\n  }\n}": types.CartUpdateOrderDocument,
    "fragment CategoryName on Category {\n  name\n  slug\n}": types.CategoryNameFragmentDoc,
    "query CollectionGetByCollectionSlug($slug: String) {\n  collections(where: {slug: $slug}) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}": types.CollectionGetByCollectionSlugDocument,
    "query CollectionsList {\n  collections {\n    name\n    slug\n  }\n}": types.CollectionsListDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  rating\n  variants {\n    ... on ProductColorVariant {\n      id\n      color\n      __typename\n    }\n    ... on ProductSizeColorVariant {\n      id\n      color\n      size\n      __typename\n    }\n    ... on ProductSizeVariant {\n      id\n      size\n      __typename\n    }\n  }\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String, $skip: Int) {\n  categories(where: {slug: $slug}) {\n    products(first: 10, skip: $skip) {\n      ...ProductListItem\n    }\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetBySearch($search: String!) {\n  products(where: {_search: $search}) {\n    ...ProductListItem\n  }\n}": types.ProductsGetBySearchDocument,
    "query ProductsGetCategories {\n  categories {\n    ...CategoryName\n  }\n}": types.ProductsGetCategoriesDocument,
    "query ProductsGetList($skip: Int, $orderBy: ProductOrderByInput) {\n  products(first: 12, skip: $skip, orderBy: $orderBy) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetRelated($id: ID!) {\n  products(\n    first: 4\n    where: {id_not: $id, categories_some: {products_some: {id: $id}}}\n  ) {\n    ...ProductListItem\n  }\n}": types.ProductsGetRelatedDocument,
    "fragment Review on Review {\n  id\n  rating\n  headline\n  content\n  name\n}": types.ReviewFragmentDoc,
    "mutation ReviewPublish($reviewId: ID!, $productId: ID!, $averageRating: Float!) {\n  publishReview(where: {id: $reviewId}, to: PUBLISHED) {\n    id\n  }\n  updateProduct(where: {id: $productId}, data: {rating: $averageRating}) {\n    id\n    rating\n  }\n  publishProduct(where: {id: $productId}, to: PUBLISHED) {\n    ...ProductListItem\n  }\n}": types.ReviewPublishDocument,
    "mutation ReviewsAddReview($headline: String!, $name: String!, $email: String!, $content: String!, $rating: Int!, $productId: ID!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, rating: $rating, product: {connect: {id: $productId}}}\n  ) {\n    id\n    product {\n      rating\n      reviews {\n        id\n        rating\n      }\n    }\n  }\n}": types.ReviewsAddReviewDocument,
    "query ReviewsGetList($skip: Int!, $productId: ID!) {\n  reviews(\n    first: 5\n    skip: $skip\n    orderBy: createdAt_DESC\n    where: {product: {id: $productId}}\n  ) {\n    ...Review\n  }\n}": types.ReviewsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n  total\n  orderItems {\n    id\n    total\n    quantity\n    product {\n      id\n      name\n      description\n      price\n    }\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($itemId: ID!, $orderId: ID!, $orderTotal: Int!) {\n  updateOrder(\n    where: {id: $orderId}\n    data: {total: $orderTotal, orderItems: {delete: {id: $itemId}}}\n  ) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetItemQuantity($itemId: ID!, $quantity: Int!, $total: Int!, $orderId: ID!, $orderTotal: Int!) {\n  updateOrder(\n    where: {id: $orderId}\n    data: {total: $orderTotal, orderItems: {update: {where: {id: $itemId}, data: {quantity: $quantity, total: $total}}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CartSetItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartUpdateOrder($total: Int!, $quantity: Int!, $orderItemId: ID!, $orderId: ID!, $productId: ID!, $orderTotal: Int!) {\n  upsertOrder(\n    upsert: {create: {total: $orderTotal, orderItems: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}}}}, update: {total: $orderTotal, orderItems: {upsert: {where: {id: $orderItemId}, data: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}}, update: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}}}}}}}\n    where: {id: $orderId}\n  ) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartUpdateOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CategoryName on Category {\n  name\n  slug\n}"): typeof import('./graphql').CategoryNameFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetByCollectionSlug($slug: String) {\n  collections(where: {slug: $slug}) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').CollectionGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsList {\n  collections {\n    name\n    slug\n  }\n}"): typeof import('./graphql').CollectionsListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  rating\n  variants {\n    ... on ProductColorVariant {\n      id\n      color\n      __typename\n    }\n    ... on ProductSizeColorVariant {\n      id\n      color\n      size\n      __typename\n    }\n    ... on ProductSizeVariant {\n      id\n      size\n      __typename\n    }\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String, $skip: Int) {\n  categories(where: {slug: $slug}) {\n    products(first: 10, skip: $skip) {\n      ...ProductListItem\n    }\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetBySearch($search: String!) {\n  products(where: {_search: $search}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetBySearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetCategories {\n  categories {\n    ...CategoryName\n  }\n}"): typeof import('./graphql').ProductsGetCategoriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($skip: Int, $orderBy: ProductOrderByInput) {\n  products(first: 12, skip: $skip, orderBy: $orderBy) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetRelated($id: ID!) {\n  products(\n    first: 4\n    where: {id_not: $id, categories_some: {products_some: {id: $id}}}\n  ) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetRelatedDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Review on Review {\n  id\n  rating\n  headline\n  content\n  name\n}"): typeof import('./graphql').ReviewFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewPublish($reviewId: ID!, $productId: ID!, $averageRating: Float!) {\n  publishReview(where: {id: $reviewId}, to: PUBLISHED) {\n    id\n  }\n  updateProduct(where: {id: $productId}, data: {rating: $averageRating}) {\n    id\n    rating\n  }\n  publishProduct(where: {id: $productId}, to: PUBLISHED) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ReviewPublishDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewsAddReview($headline: String!, $name: String!, $email: String!, $content: String!, $rating: Int!, $productId: ID!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, rating: $rating, product: {connect: {id: $productId}}}\n  ) {\n    id\n    product {\n      rating\n      reviews {\n        id\n        rating\n      }\n    }\n  }\n}"): typeof import('./graphql').ReviewsAddReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewsGetList($skip: Int!, $productId: ID!) {\n  reviews(\n    first: 5\n    skip: $skip\n    orderBy: createdAt_DESC\n    where: {product: {id: $productId}}\n  ) {\n    ...Review\n  }\n}"): typeof import('./graphql').ReviewsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
