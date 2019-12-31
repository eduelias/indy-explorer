import socketio from 'socket.io-client';

const io = socketio('http://localhost:4040');

export function connect({ state, commit }) {
  commit('clearTxns');
  io.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('connected');
  });
  Object.keys(state.txns).map(ledger => {
    io.on(`newtx_${ledger}`, data => {
      commit('add', { ledger, data });
    });
  });
  io.on('init_txs', data => commit('init', data));
}

export async function getPage({ state, commit }, { page, done }) {
  return new Promise((resolve, reject) => {
    io.once(`page_loaded_${page}`, data => {
      commit('addpage', { ledger: 'DOMAIN', data, done, resolve });
    });
    io.emit('get_DOMAIN', page);
  });
}
