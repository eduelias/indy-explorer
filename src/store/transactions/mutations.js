export function add(state, { network, ledger, data }) {
  if (!Array.isArray(data)) {
    data = [data];
  }
  data
    .filter(tx => tx)
    .map(tx => {
      state.nets[network][ledger].loadedTxns.push(tx.txnMetadata.seqNo);
      state.nets[network][ledger].txns[tx.txnMetadata.seqNo] = tx;
    });

  data
    .filter(tx => tx)
    .filter(tx => tx.txn.type == '1')
    .map(tx => (state.nets[network].nymCache[tx.txn.data.dest] = tx));
}

export function setSizes(state, { network, ledger, size }) {
  state.nets[network][ledger].size = size;
}

export function setNetwork(state, network) {
  state.network = network;
}

export function setUpdaterAsStarted(state) {
  state.isUpdaterLive = true;
}

export function setDomainInterval(state, { interval }) {
  state.intervals.domain = interval;
}

export function addpage(state, { network, ledger, data, done, resolve }) {
  data
    .filter(tx => tx)
    .map(tx => {
      state.nets[network][ledger].loadedTxns.push(tx.txnMetadata.seqNo);
      state.nets[network][ledger].txns[tx.txnMetadata.seqNo] = tx;
    });
  //state.txns[ledger].push(...data);
  data
    .filter(tx => tx)
    .filter(tx => tx.txn.type == '1')
    .map(tx => (state.nets[network].nymCache[tx.txn.data.dest] = tx));
  if (done) done();
  if (resolve) resolve();
}

export function setPage(state, { network, ledger, page }) {
  state.nets[network][ledger].page = page;
}

// export function init(state, data) {
//   Object.keys(state.txns)
//     .filter(l => l == 'POOL')
//     .map(ledger => {
//       state.txns[ledger] = data[ledger].reverse();
//     });
// }

// export function clearTxns(state) {
//   state.txns = {
//     DOMAIN: [],
//     POOL: [],
//     CONFIG: [],
//   };
// }
