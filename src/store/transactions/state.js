export default {
  network: 'sovbuilder',
  pagesize: 10,
  apiurl: 'http://rest.api.tykn.tech',
  wsurl: 'rest.api.tykn.tech',
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
  },
  page: {
    DOMAIN: 1,
    POOL: 1,
    CONFIG: 1,
  },
};
