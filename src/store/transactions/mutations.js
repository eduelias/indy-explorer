export function add(state, { ledger, data }) {
  data.reverse().map(tx => {
    state.loadedTxns[ledger].push(tx.txnMetadata.seqNo);
    state.txns[ledger][tx.txnMetadata.seqNo] = tx;
  });
}

export function addpage(state, { ledger, data, done, resolve }) {
  data.reverse().map(tx => {
    state.loadedTxns[ledger].push(tx.txnMetadata.seqNo);
    state.txns[ledger][tx.txnMetadata.seqNo] = tx;
  });
  //state.txns[ledger].push(...data);
  data
    .filter(tx => tx.txn.type == '1')
    .map(tx => (state.nymCache[tx.txn.data.verkey] = tx));
  if (!data.length) return done(true);
  done();
  resolve();
}

export function init(state, data) {
  Object.keys(state.txns)
    .filter(l => l == 'CONFIG')
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
