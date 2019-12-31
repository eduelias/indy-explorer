export function add(state, { ledger, data }) {
  //state.txns[ledger].push(...data);
}

export function addpage(state, { ledger, data, done, resolve }) {
  state.txns[ledger].push(...data);

  if (!data.length) return done(true);
  done();
  resolve();
}

export function init(state, data) {
  Object.keys(state.txns).map(
    ledger => (state.txns[ledger] = data[ledger].reverse())
  );
}

export function clearTxns(state) {
  state.txns = {
    DOMAIN: [],
    POOL: [],
    CONFIG: [],
  };
}
