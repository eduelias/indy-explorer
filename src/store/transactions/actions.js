import socketio from 'socket.io-client'

export function connect({ state, commit }) {
  const io = socketio('http://localhost:4040')
  commit('clearTxns')
  io.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('connected')
  })
  Object.keys(state.txns).map(ledger => {
    io.on(`newtx_${ledger}`, data => {
      commit('add', { ledger, data })
    })
  })
}
