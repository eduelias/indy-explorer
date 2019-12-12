export function add(state, { ledger, data }) {
  state.txns[ledger].unshift(data)
}

export function init(state, data) {
  Object.keys(state.txns).map(
    ledger => (state.txns[ledger] = data[ledger].reverse())
  )
}

export function clearTxns(state) {
  state.txns = {
    DOMAIN: [],
    POOL: [],
    CONFIG: [],
  }
}
