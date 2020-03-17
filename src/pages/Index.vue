<template>
  <q-page class="q-ma-none q-mt-md flex flex-center column">
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="teal" />
    </q-page-scroller>
    <q-dialog v-model="dialog" full-width class="z-max">
      <q-card class="q-pa-md z-max">
        <vue-json-pretty :data="txnData"></vue-json-pretty>
      </q-card>
    </q-dialog>
    <br />
    <div class="row">
      <q-list class="column">
        <q-page-scroller class="z-top" expand position="top" :scroll-offset="150" :offset="[0, 0]">
          <div class="row q-pa-md bg-grey-3">
            <div class="column">
              <tip-filter
                :filter="filter"
                ledger="DOMAIN"
                :getFilterChipColor="getFilterChipColor"
              ></tip-filter>
            </div>
            <div class="column">
              <tip-filter
                :filter="filter"
                ledger="CONFIG"
                :getFilterChipColor="getFilterChipColor"
              ></tip-filter>
            </div>
            <div class="column">
              <tip-filter
                :filter="filter"
                ledger="POOL"
                :getFilterChipColor="getFilterChipColor"
              ></tip-filter>
            </div>
          </div>
        </q-page-scroller>
        <tip-filter
          :filter="filter"
          ledger="DOMAIN"
          :getFilterChipColor="getFilterChipColor"
        ></tip-filter>
        <q-infinite-scroll @load="onLoadDomain" :offset="2000">
          <div
            v-for="(item, index) in getItems('DOMAIN', getDomainIds())"
            :key="index"
            class="q-ma-none"
          >
            <q-card
              v-if="filter.DOMAIN[findType(item.txn.type)]"
              clickable
              class="DomainContainer q-ma-xs"
              style="width: 400px"
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
          :getFilterChipColor="getFilterChipColor"
        ></tip-filter>
        <q-infinite-scroll @load="onLoadConfig" :offset="2000">
          <div
            v-for="(item, index) in getItems('CONFIG', getConfigIds())"
            :key="index"
            class="q-ma-none"
          >
            <q-card
              v-if="item && item.txn && filter.CONFIG[findType(item.txn.type)]"
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
        <tip-filter
          :filter="filter"
          ledger="POOL"
          :getFilterChipColor="getFilterChipColor"
        ></tip-filter>
        <div v-for="(item, index) in txns.POOL" :key="index" class="q-ma-none">
          <q-card
            v-if="item && item.txn && filter.POOL[findType(item.txn.type)]"
            :key="index"
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
        <div v-if="listHasItems('PoolContainer')">No items.</div>
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
          NYM: true,
          CRED_DEF: true,
          SCHEMA: true,
          ATTRIB: true,
          REVOC_REG_DEF: true,
          REVOC_REG_ENTRY: true,
        },
        CONFIG: {
          POOL_UPGRADE: true,
          NODE_UPGRADE: true,
          POOL_CONFIG: true,
          TXN_AUTHOR_AGREEMENT: true,
          TXN_AUTHOR_AGREEMENT_AML: true,
          AUTH_RULES: true,
        },
        POOL: {
          NODE: true,
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
    ...mapState('transactions', ['txns', 'loadedTxns']),
  },
  methods: {
    ...mapGetters('transactions', ['getTransactions', 'getDomainIds', 'getConfigIds']),
    onLoadConfig: async function(index, done) {
      await this.$store.dispatch('transactions/getPage', {
        ledger: 'CONFIG',
        page: index,
        filter: this.filter,
        done,
      });
    },
    onLoadDomain: async function(index, done) {
      await this.$store.dispatch('transactions/getPage', {
        ledger: 'DOMAIN',
        page: index,
        filter: this.filter,
        done,
      });
    },
    getItems: function(ledger, seqNos) {
      const toRt = [];
      seqNos?.forEach(no => toRt.push(this.$store.state.transactions.txns[ledger][no]));
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
      switch (type) {
        case 'CRED_DEF':
          return 'green-2';
        case 'ATTRIB':
          return 'orange-2';
        case 'TXN_AUTHOR_AGREEMENT':
          return 'brown-2';
        case 'TXN_AUTHOR_AGREEMENT_AML':
          return 'indigo-2';
        case 'NYM':
          return 'teal-2';
        case 'SCHEMA':
          return 'yellow-2';
        case 'NODE':
          return 'light-grey';
        case 'REVOC_REG_DEF':
          return 'purple-1';
        case 'REVOC_REG_ENTRY':
          return 'deep-purple-1';
        case 'POOL_UPGRADE':
          return 'purple-1';
        case 'NODE_UPGRADE':
          return 'teal-2';
        case 'POOL_CONFIG':
          return 'deep-purple-1';
        case 'AUTH_RULES':
          return 'orange-2';
        default:
          return 'grey';
      }
    },
  },
  mounted: function() {
    this.$store.dispatch('transactions/connect');
  },
  name: 'PageIndex',
};
</script>
