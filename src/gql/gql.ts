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
    "fragment CategoryName on Category {\n  name\n  slug\n}": types.CategoryNameFragmentDoc,
    "query CollectionGetByCollectionSlug($slug: String) {\n  collections(where: {slug: $slug}) {\n    name\n    description\n    products {\n      ...ProductListItem\n    }\n  }\n}": types.CollectionGetByCollectionSlugDocument,
    "query CollectionsList {\n  collections {\n    name\n    slug\n  }\n}": types.CollectionsListDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  variants {\n    ... on ProductColorVariant {\n      id\n      color\n      __typename\n    }\n    ... on ProductSizeColorVariant {\n      id\n      color\n      size\n      __typename\n    }\n    ... on ProductSizeVariant {\n      id\n      size\n      __typename\n    }\n  }\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String) {\n  categories(where: {slug: $slug}) {\n    products(first: 10) {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetCategories {\n  categories {\n    ...CategoryName\n  }\n}": types.ProductsGetCategoriesDocument,
    "query ProductsGetList {\n  products(first: 10) {\n    ...ProductListItem\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetRelated($id: ID!) {\n  products(\n    first: 4\n    where: {id_not: $id, categories_some: {products_some: {id: $id}}}\n  ) {\n    ...ProductListItem\n  }\n}": types.ProductsGetRelatedDocument,
};

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
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  variants {\n    ... on ProductColorVariant {\n      id\n      color\n      __typename\n    }\n    ... on ProductSizeColorVariant {\n      id\n      color\n      size\n      __typename\n    }\n    ... on ProductSizeVariant {\n      id\n      size\n      __typename\n    }\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String) {\n  categories(where: {slug: $slug}) {\n    products(first: 10) {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetCategories {\n  categories {\n    ...CategoryName\n  }\n}"): typeof import('./graphql').ProductsGetCategoriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products(first: 10) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetRelated($id: ID!) {\n  products(\n    first: 4\n    where: {id_not: $id, categories_some: {products_some: {id: $id}}}\n  ) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetRelatedDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
