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
  const network = state.network;
  if (!network) return [];
  return Array.from(new Set(state.nets[network].DOMAIN.loadedTxns)).sort((a, b) => b - a);
}

export function getPoolIds(state) {
  const network = state.network;
  if (!network) return [];
  return Array.from(new Set(state.nets[network].POOL.loadedTxns)).sort((a, b) => b - a);
}

export function getConfigIds(state) {
  const network = state.network;
  if (!network) return [];
  return Array.from(new Set(state.nets[network].CONFIG.loadedTxns)).sort((a, b) => b - a);
}
