<template>
  <q-page class="q-ma-none q-mt-md flex flex-center column">
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="deep-purple-10" />
    </q-page-scroller>
    <q-dialog v-model="dialog" full-width class="z-max">
      <q-card class="q-pa-md z-max">
        <vue-json-pretty :data="txnData"></vue-json-pretty>
      </q-card>
    </q-dialog>
    <div class="row full-width rubik summary_bar">
      <q-space />
      <q-card flat class="transparent">
        <q-card-section>
          <div class="text-h6 summary_number">
            {{
              parseInt(nets[network].DOMAIN.size) +
                parseInt(nets[network].CONFIG.size) +
                parseInt(nets[network].POOL.size)
            }}
          </div>
          <div class="text-subtitle2 summary_label">Total txs</div>
        </q-card-section>
      </q-card>
      <q-separator spaced vertical />
      <q-card flat class="transparent">
        <q-card-section>
          <div class="text-h6 summary_number">{{ nets[network].DOMAIN.size }}</div>
          <div class="text-subtitle2 summary_label">Domain txs</div>
        </q-card-section>
      </q-card>
      <q-separator spaced vertical />
      <q-card flat class="transparent">
        <q-card-section>
          <div class="text-h6 summary_number">{{ nets[network].CONFIG.size }}</div>
          <div class="text-subtitle2 summary_label">Config txs</div>
        </q-card-section>
      </q-card>
      <q-separator spaced vertical />
      <q-card flat class="transparent">
        <q-card-section>
          <div class="text-h6 summary_number">{{ nets[network].POOL.size }}</div>
          <div class="text-subtitle2 summary_label">Pool txs</div>
        </q-card-section>
      </q-card>
      <q-separator spaced vertical />
      <q-card flat class="transparent">
        <q-card-section>
          <div class="text-h6 summary_number">{{ getDomainIds().length }}</div>
          <div class="text-subtitle2 summary_label">Loaded domain txs</div>
        </q-card-section>
      </q-card>
      <q-separator spaced vertical />
      <q-card flat class="transparent">
        <q-card-section>
          <div class="text-h6 summary_number">
            {{
              parseInt(getDomainIds().length) +
                parseInt(getConfigIds().length) +
                parseInt(getPoolIds().length)
            }}
          </div>
          <div class="text-subtitle2 summary_label">Loaded txs</div>
        </q-card-section>
      </q-card>
      <q-space />
    </div>
    <br />
    <div class="row">
      <q-list borderd separator class="column">
        <q-page-scroller class="z-top" expand position="top" :scroll-offset="150" :offset="[0, 0]">
          <div class="row q-pa-md bg-white">
            <div class="column">
              <tip-filter
                :filter="filter"
                :network="network"
                ledger="DOMAIN"
                :getFilterChipColor="getFilterChipColor"
              ></tip-filter>
            </div>
            <div class="column">
              <tip-filter
                :filter="filter"
                :network="network"
                ledger="CONFIG"
                :getFilterChipColor="getFilterChipColor"
              ></tip-filter>
            </div>
            <div class="column" style="width:400px;">
              POOL
            </div>
          </div>
        </q-page-scroller>
        <tip-filter
          :filter="filter"
          :network="network"
          ledger="DOMAIN"
          :getFilterChipColor="getFilterChipColor"
        ></tip-filter>
        <q-infinite-scroll @load="onLoadDomain" :offset="2000">
          <div
            v-for="(item, index) in getItems(network, 'DOMAIN', getDomainIds())"
            :key="index"
            class="q-ma-none"
          >
            <q-card
              v-if="item && item.txn && shouldFilter(filter.DOMAIN, findType(item.txn.type))"
              clickable
              class="DomainContainer q-ma-xs"
              style="width: 400px;"
            >
              <type-router
                :item="item"
                :type="findType(item.txn.type)"
                v-on:openDialog="openDialog"
              ></type-router>
            </q-card>
          </div>
          <div v-if="listHasItems('DomainContainer')">
            No items.
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-list>
      <q-list borderd separator class="column">
        <tip-filter
          :filter="filter"
          ledger="CONFIG"
          :network="network"
          :getFilterChipColor="getFilterChipColor"
        ></tip-filter>
        <q-infinite-scroll @load="onLoadConfig" :offset="2000">
          <div
            v-for="(item, index) in getItems(network, 'CONFIG', getConfigIds())"
            :key="index"
            class="q-ma-none"
          >
            <q-card
              v-if="item && item.txn && shouldFilter(filter.CONFIG, findType(item.txn.type))"
              clickable
              class="ConfigContainer q-ma-xs"
              style="width: 400px"
            >
              <type-router
                :item="item"
                :type="findType(item.txn.type)"
                v-on:openDialog="openDialog"
                :filter="filter"
              ></type-router>
            </q-card>
          </div>
          <div v-if="listHasItems('ConfigContainer')">
            No items.
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-list>
      <q-list borderd separator class="column">
        POOL
        <q-infinite-scroll @load="onLoadPool" :offset="2000">
          <div
            v-for="(item, index) in getItems(network, 'POOL', getPoolIds())"
            :key="index"
            class="q-ma-none"
          >
            <q-card
              v-if="item && item.txn && shouldFilter(filter.POOL, findType(item.txn.type))"
              clickable
              class="PoolContainer q-ma-xs"
              style="width: 400px"
            >
              <type-router
                :item="item"
                :type="findType(item.txn.type)"
                v-on:openDialog="openDialog"
                :filter="filter"
              ></type-router>
            </q-card>
          </div>
          <div v-if="listHasItems('PoolContainer')">
            No items.
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import { mapState, mapGetters } from 'vuex';
import TypeRouter from '../components/TypeRouter.vue';
import TipFilter from '../components/Filters.vue';

const types = {
  DOMAIN: {
    '1': 'NYM',
    '100': 'ATTRIB',
    '101': 'SCHEMA',
    '102': 'CRED_DEF',
    '113': 'REVOC_REG_DEF',
    '114': 'REVOC_REG_ENTRY',
  },
  POOL: {
    '0': 'NODE',
  },
  CONFIG: {
    '4': 'TXN_AUTHOR_AGREEMENT',
    '5': 'TXN_AUTHOR_AGREEMENT_AML',
    '8': 'TRANSACTION_AUTHOR_AGREEMENT_DISABLE',
    '109': 'POOL_UPGRADE',
    '110': 'NODE_UPGRADE',
    '111': 'POOL_CONFIG',
    '120': 'AUTH_RULES',
  },
};

const generateFilters = function() {
  const r = {};
  for (const prop of Object.values(types)) {
    r[prop] = true;
  }
  return r;
};

export default {
  data() {
    return {
      dialog: false,
      types: types,
      filter: {
        DOMAIN: {
          NYM: false,
          CRED_DEF: false,
          SCHEMA: false,
          ATTRIB: false,
          REVOC_REG_DEF: false,
          REVOC_REG_ENTRY: false,
        },
        CONFIG: {
          POOL_UPGRADE: false,
          NODE_UPGRADE: false,
          POOL_CONFIG: false,
          TXN_AUTHOR_AGREEMENT: false,
          TXN_AUTHOR_AGREEMENT_AML: false,
          AUTH_RULES: false,
        },
        POOL: {
          NODE: false,
        },
      },
      txnData: {},
    };
  },
  components: {
    TipFilter,
    VueJsonPretty,
    TypeRouter,
  },
  computed: {
    ...mapState('transactions', ['nets', 'network', 'colors']),
  },
  methods: {
    ...mapGetters('transactions', [
      'getTransactions',
      'getDomainIds',
      'getConfigIds',
      'getPoolIds',
    ]),
    shouldFilter: function(filter, type) {
      if (Object.values(filter).filter(x => x === true).length > 0) {
        return filter[type];
      }
      return true;
    },
    onLoadConfig: async function(index, done) {
      const network = this.$store.state.transactions.network;
      await this.$store.dispatch('transactions/getPage', {
        network,
        ledger: 'CONFIG',
        page: index,
        filter: this.filter,
        done,
      });
    },
    onLoadDomain: async function(index, done) {
      const network = this.$store.state.transactions.network;
      await this.$store.dispatch('transactions/getPage', {
        network,
        ledger: 'DOMAIN',
        page: index,
        filter: this.filter,
        done,
      });
    },
    onLoadPool: async function(index, done) {
      const network = this.$store.state.transactions.network;
      await this.$store.dispatch('transactions/getPage', {
        network,
        ledger: 'POOL',
        page: index,
        filter: this.filter,
        done,
      });
    },
    getItems: function(network, ledger, seqNos) {
      const toRt = [];
      seqNos?.forEach(no =>
        toRt.push(this.$store.state.transactions.nets[network][ledger].txns[no])
      );
      return toRt;
    },
    findType: type => {
      return { ...types.DOMAIN, ...types.POOL, ...types.CONFIG }[type];
    },
    openDialog: function(item) {
      this.txnData = item;
      this.dialog = true;
    },
    listHasItems: function(id) {
      return false;
    },
    getFilterChipColor: function(type) {
      return `color_${type.toLowerCase()}`;
    },
  },
  mounted: function() {
    this.$store.dispatch('transactions/connect');
  },
  name: 'PageIndex',
};
</script>

<style scoped>
.summary_number {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  /* or 100% */

  display: flex;
  align-items: center;
  letter-spacing: 0.01em;

  color: #000000;
}

.summary_label {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  letter-spacing: 0.01em;

  color: #a6acbe;
}

.summary_bar {
  background: #f8f8f8;
  border: 0.5px solid #dcdbe1;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
