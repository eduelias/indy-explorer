export function add(state, { ledger, data }) {
  if (ledger === 'POOL') {
    console.log(data);
  }
  data
    .filter(tx => tx)
    .map(tx => {
      state.loadedTxns[ledger].push(tx.txnMetadata.seqNo);
      state.txns[ledger][tx.txnMetadata.seqNo] = tx;
    });
}

export function addpage(state, { ledger, data, done, resolve }) {
  if (ledger === 'POOL') {
    console.log(data);
  }
  data
    .filter(tx => tx)
    .map(tx => {
      state.loadedTxns[ledger].push(tx.txnMetadata.seqNo);
      state.txns[ledger][tx.txnMetadata.seqNo] = tx;
    });
  //state.txns[ledger].push(...data);
  data
    .filter(tx => tx)
    .filter(tx => tx.txn.type == '1')
    .map(tx => (state.nymCache[tx.txn.data.dest] = tx));
  done();
  if (resolve) resolve();
}

export function init(state, data) {
  Object.keys(state.txns)
    .filter(l => l == 'POOL')
    .map(ledger => {
      state.txns[ledger] = data[ledger].reverse();
    });
}

export function clearTxns(state) {
  state.txns = {
    DOMAIN: [],
    POOL: [],
    CONFIG: [],
  };
}
