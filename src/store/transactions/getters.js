export function getTransactions(state) {
  return state.txns;
  // return Array.from(state.txns).sort((a, b) => {
  //   if (!a.result) return 1;
  //   if (!b.result) return -1;
  //   if (!a.result.data.txnMetadata.txnTime) return 1;
  //   if (!b.result.data.txnMetadata.txnTime) return -1;
  //   if (a.result.data.txnMetadata.txnTime > b.result.data.txnMetadata.txnTime)
  //     return -1;
  //   if (a.result.data.txnMetadata.txnTime < b.result.data.txnMetadata.txnTime)
  //     return 1;
  // });
}

export function getDomainIds(state) {
  return Array.from(new Set(state.loadedTxns.DOMAIN)).sort(
    (a, b) => b - a
  );
}

export function getPoolIds(state) {
  return Array.from(new Set(state.loadedTxns.POOL)).sort(
    (a, b) => b - a
  );
}

export function getConfigIds(state) {
  return Array.from(new Set(state.loadedTxns.CONFIG)).sort(
    (a, b) => b - a
  );
}
