export default {
  network: 'sovbuilder',
  pagesize: 10,
  apiurl: 'http://rest.api.tykn.tech',
  wsurl: 'rest.api.tykn.tech',
  isUpdateLive: false,
  intervals: {
    domain: false,
  },
  txns: {
    DOMAIN: [],
    POOL: [],
    CONFIG: [],
  },
  loadedTxns: {
    DOMAIN: [],
    POOL: [],
    CONFIG: [],
  },
  nymCache: {},
  highlighted: null,
  sizes: {
    sovbuilder: {
      DOMAIN: 0,
      POOL: 0,
      CONFIG: 0,
    },
    sovstaging: {
      DOMAIN: 0,
      POOL: 0,
      CONFIG: 0,
    },
    sovmain: {
      DOMAIN: 0,
      POOL: 0,
      CONFIG: 0,
    },
  },
  page: {
    DOMAIN: 1,
    POOL: 1,
    CONFIG: 1,
  },
};
