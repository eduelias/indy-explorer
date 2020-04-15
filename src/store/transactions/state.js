export default {
  network: 'sovbuilder',
  pagesize: 10,
  apiurl: 'http://rest.api.tykn.tech',
  wsurl: 'rest.api.tykn.tech',
  isUpdateLive: false,
  intervals: {
    DOMAIN: undefined,
  },
  nets: {
    sovbuilder: {
      nymCache: {},
      DOMAIN: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
      POOL: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
      CONFIG: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
    },
    sovmain: {
      nymCache: {},
      DOMAIN: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
      POOL: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
      CONFIG: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
    },
    sovstaging: {
      nymCache: {},
      DOMAIN: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
      POOL: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
      CONFIG: {
        page: 1,
        size: 0,
        txns: [],
        loadedTxns: [],
      },
    },
  },
  highlighted: null,
};
