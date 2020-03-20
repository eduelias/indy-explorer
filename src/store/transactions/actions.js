import socketio from 'socket.io-client';
import Axios from 'axios';

export function connect({ state, commit }) {
  const io = socketio(state.wsurl, {
    transports: ['websocket'],
    query: `network=${state.network}`,
  });
  commit('clearTxns');
  io.on('connect', socket => {
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
  const network = state.network;

  const resp = await Axios.get(`${state.apiurl}/${network}/sizes`);

  if (resp.status !== 200) throw Error(resp.data);

  await commit('setSizes', {
    network,
    sizes: resp.data,
  });
}

export async function getPage({ state, commit }, { ledger, page: pageRaw, done, filter }) {
  const network = state.network;

  const page = pageRaw || state.page[ledger];

  if (!state.sizes[network]) {
    await getSizes({ state, commit });
  }

  const target = state.sizes[network][ledger] - (page - 1) * state.pagesize;
  if (target < 0) {
    return done(true);
  }

  const resp = await Axios.get(
    `${state.apiurl}/${network}/tx/${ledger}/${target}/${state.pagesize}/false`
  );

  if (resp.status !== 200) throw Error(resp.data);

  if (!resp.data.length && done) done(true);
  await commit('addpage', {
    ledger,
    data: resp.data,
    done,
  });
  await commit('setPage', { ledger, page: page + 1 });
}

export async function getNymByVerkey({ state }, { from, setter }) {
  const network = state.network;

  const tx = {
    operation: {
      type: '105',
      dest: from,
    },
    identifier: 'L5AD5g65TDQr1PPHHRoiGf',
    reqId: Date.now(),
    protocolVersion: 2,
  };
  const nym = await Axios.post(`${state.apiurl}/${network}/tx`, tx);
  if (nym.status !== 200) throw Error(nym.data);

  const resp = await Axios.get(`${state.apiurl}/${network}/tx/domain/${nym.data.seqNo}/1`);
  if (resp.status !== 200) throw Error(resp.data);

  state.nymCache[from] = resp.data[0];
  setter(resp.data[0]);
}
