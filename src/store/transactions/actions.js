import socketio from 'socket.io-client'

export function connect({ commit }) {
  const io = socketio('http://localhost:4040')
  commit('clearTxns')
  io.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('connected')
  })
  io.on('newtx', data => {
    commit('add', data)
  })
  io.on('welcome', data => {
    // eslint-disable-next-line no-console
    console.log(data)
  })
}
