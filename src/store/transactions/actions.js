import socketio from 'socket.io-client';
import Axios from 'axios';

const io = socketio('http://localhost:4040', {});
const PAGESIZE = 10;

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

export async function getPage(
  { state, commit },
  { ledger, page, done }
) {
  const resp = await Axios.get(
    `http://localhost:3333/tx/${ledger}/${page}/${PAGESIZE}`
  );

  if (resp.status !== 200) throw Error(resp.data);

  if (!resp.data.length) done(true);

  commit('addpage', {
    ledger,
    data: resp.data.map(tx => tx),
    done,
  });
}

export async function getNymByVerkey({ state }, { from, setter }) {
  const resp = await Axios.get(`http://localhost:3333/nym/${from}`);
  if (resp.status !== 200) throw Error(resp.data);
  state.nymCache[from] = resp.data;
  setter(resp.data);
}
