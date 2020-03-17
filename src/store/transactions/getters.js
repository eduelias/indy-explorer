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
