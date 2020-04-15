import Axios from 'axios';

export function connect() {}

export async function networkChange({ commit }, network) {
  await commit('setNetwork', network);
}

export async function getNextTx({ state, commit }, { ledger }) {
  const network = state.network;
  const lastBlockNumber = state.nets[network][ledger].size;
  const newTx = parseInt(lastBlockNumber) + 1;

  let resp;
  try {
    resp = await Axios.get(`${state.apiurl}/${network}/tx/${ledger}/${newTx}/1/false`);
  } catch (e) {
    clearInterval(state.intervals[ledger]);
  }

  if (resp.status === 200 && resp.data && resp.data.length) {
    await commit('setSizes', { network, ledger, size: newTx });
    await commit('add', { network, ledger, data: resp.data });
  }
}

export async function startUpdater({ commit, dispatch }) {
  await commit('setUpdaterAsStarted');
  const domainInterval = setInterval(async () => {
    await dispatch('getNextTx', { ledger: 'DOMAIN' });
  }, 30000);
  await commit('setDomainInterval', { interval: domainInterval });
}

export async function getSizes({ state, dispatch, commit }, { network }) {
  const resp = await Axios.get(`${state.apiurl}/${network}/sizes`);

  if (resp.status !== 200) throw Error(resp.data);

  Object.keys(resp.data).map(
    async ledger => await commit('setSizes', { network, ledger, size: resp.data[ledger] })
  );
  if (!state.isUpdaterLive) {
    await dispatch('startUpdater');
  }
}

export async function getPage({ state, commit, dispatch }, { network, ledger, done, filter }) {
  const page = state.nets[network][ledger].page;

  if (!state.nets[network][ledger].size) {
    await dispatch('getSizes', { network });
  }

  const target = state.nets[network][ledger].size - (page - 1) * state.pagesize;
  if (target < 0) {
    return done(true);
  }

  let resp;
  try {
    resp = await Axios.get(
      `${state.apiurl}/${network}/tx/${ledger}/${target}/${state.pagesize}/false`
    );
  } catch (e) {
    console.error(e);
  }

  if (resp.status !== 200) throw Error(resp.data);

  if (!resp.data.length && done) done(true);
  await commit('addpage', {
    network,
    ledger,
    data: resp.data,
    done,
  });
  await commit('setPage', { network, ledger, page: page + 1 });
}

export async function getNymByVerkey({ state }, { network, from, setter }) {
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
