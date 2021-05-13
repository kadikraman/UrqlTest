import { createClient, dedupExchange, fetchExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { offlineExchange } from '@urql/exchange-graphcache';
import schema from './__generated__/graphql.urql.schema.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const dataKey = 'data';
const metadataKey = 'metaData';

const createStorage = () => {
  const cache = {};

  return {
    writeData: async (delta) => {
      Object.assign(cache, delta);
      await AsyncStorage.setItem(dataKey, JSON.stringify(cache));
    },
    readData: async () => {
      const local = await AsyncStorage.getItem(dataKey);
      if (local) {
        Object.assign(cache, JSON.parse(local));
      }
      return cache;
    },
    writeMetadata: async (data) => {
      await AsyncStorage.setItem(metadataKey, JSON.stringify(data));
    },
    readMetadata: async () => {
      const metadataJson = await AsyncStorage.getItem(metadataKey);
      if (metadataJson) {
        return JSON.parse(metadataJson);
      }
      return null;
    },
    onOnline(cb) {
      NetInfo.addEventListener((state) => {
        if (state.isConnected) {
          cb();
        }
      });
    },
  };
};

const cache = offlineExchange({
  schema,
  storage: createStorage(),
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
