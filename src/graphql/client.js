import { createClient, dedupExchange, fetchExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import schema from './__generated__/graphql.urql.schema.json';

const cache = cacheExchange({
  schema,
  updates: {
    /* ... */
  },
  optimistic: {
    /* ... */
  },
});

export const client = createClient({
  url: 'https://metaphysics-production.artsy.net/',
  exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange],
});
