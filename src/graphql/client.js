import { createClient, dedupExchange, fetchExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import schema from './__generated__/graphql.urql.schema.json';
import { cacheExchange } from '@urql/exchange-graphcache';

const cacheConfig = {
  schema,
  keys: {
    Image: (image) => image.href,
  },
  resolvers: {
    Query: {
      artwork: (_, args, cache) => {
        return { __typename: 'Artwork', id: args.id };
      },
    },
  },
  updates: {
    /* ... */
  },
  optimistic: {
    /* ... */
  },
};

export const client = createClient({
  url: 'https://metaphysics-production.artsy.net/v2',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange(cacheConfig),
    fetchExchange,
  ],
});
