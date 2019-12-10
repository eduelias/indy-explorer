export function add(state, { ledger, data }) {
  state.txns[ledger].unshift(data)
}

export function clearTxns(state) {
  state.txns = {
    DOMAIN: [],
    POOL: [],
    CONFIG: [],
  }
}
