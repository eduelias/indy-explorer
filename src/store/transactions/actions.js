import socketio from 'socket.io-client';
import Axios from 'axios';

const APIURL = 'http://localhost:3000';
const WSURL = 'http://localhost:4040';
const io = socketio(WSURL, {});
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

export async function getSizes({ state, commit }) {
  const network = 'sovbuilder';

  const resp = await Axios.get(`${APIURL}/${network}/sizes`);

  if (resp.status !== 200) throw Error(resp.data);
  const r = {};
  resp.data.map(item => (r[item.ledger] = item.size));
  await commit('setSizes', {
    network,
    sizes: r,
  });
}

export async function getPage({ state, commit }, { ledger, page: pageRaw, done, filter }) {
  const network = 'sovbuilder';
  const page = pageRaw || state.page[ledger];

  if (!state.sizes[network]) {
    await getSizes({ state, commit });
  }

  const resp = await Axios.get(
    `${APIURL}/${network}/tx/${ledger}/${state.sizes[network][ledger] -
      (page - 1) * PAGESIZE}/${PAGESIZE}/false`
  );

  if (resp.status !== 200) throw Error(resp.data);

  if (!resp.data.length && done) done(true);
  await commit('addpage', {
    ledger,
    data: resp.data.map(tx => tx),
    done,
  });
  await commit('setPage', { ledger, page: page + 1 });
}

export async function getNymByVerkey({ state }, { from, setter }) {
  const network = 'sovbuilder';
  const tx = {
    operation: {
      type: '105',
      dest: from,
    },
    identifier: 'L5AD5g65TDQr1PPHHRoiGf',
    reqId: Date.now(),
    protocolVersion: 2,
  };
  const nym = await Axios.post(`${APIURL}/${network}/tx`, tx);
  if (nym.status !== 200) throw Error(nym.data);

  const resp = await Axios.get(`${APIURL}/${network}/tx/domain/${nym.data.seqNo}/1`);
  if (resp.status !== 200) throw Error(resp.data);

  state.nymCache[from] = resp.data[0];
  setter(resp.data[0]);
}
