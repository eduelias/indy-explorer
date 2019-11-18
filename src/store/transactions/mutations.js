export function add(state, tx) {
  state.txns.unshift(tx)
}

export function addMany(state, txs) {
  if (!Array.isArray(txs)) throw 'No way dude'
  txs.map(t => {
    // eslint-disable-next-line no-console
    state.txns[t.result.seqNo] = t
  })
}

export function clearTxns(state) {
  state.txns = []
}
