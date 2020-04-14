import Axios from 'axios';

export function connect() {}

export async function networkChange(vueObject, { network }) {
  window.location = `/${network}`;
}

export async function setNetwork({ commit }, network) {
  await commit('setNetwork', network);
}

export async function getNextTx({ state, commit }, { ledger }) {
  const network = state.network;
  const blockNumber = state.sizes[network][ledger.toUpperCase()];
  const newTx = parseInt(blockNumber) + 1;

  let resp;
  try {
    resp = await Axios.get(`${state.apiurl}/${network}/tx/${ledger}/${newTx}/1/false`);
  } catch (e) {
    clearInterval(state.intervals[ledger]);
  }

  if (resp.status === 200 && resp.data && resp.data.length) {
    const newSizes = { ...state.sizes[network] };
    newSizes[ledger] += 1;
    await commit('setSizes', { network, sizes: newSizes });
    await commit('add', { ledger, data: resp.data });
  }
}

export async function startUpdater({ commit, dispatch }) {
  await commit('setUpdaterAsStarted');
  const domainInterval = setInterval(async () => {
    await dispatch('getNextTx', { ledger: 'DOMAIN' });
  }, 30000);
  await commit('setDomainInterval', { interval: domainInterval });
}

export async function getSizes({ state, dispatch, commit }) {
  const network = state.network;

  const resp = await Axios.get(`${state.apiurl}/${network}/sizes`);

  if (resp.status !== 200) throw Error(resp.data);

  await commit('setSizes', {
    network,
    sizes: resp.data,
  });
  if (!state.isUpdaterLive) {
    await dispatch('startUpdater');
  }
}

export async function getPage(
  { state, commit, dispatch },
  { ledger, page: pageRaw, done, filter }
) {
  const network = state.network;

  const page = pageRaw || state.page[ledger];

  if (!state.sizes[network][ledger]) {
    await dispatch('getSizes');
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
