<template>
  <q-page class="q-ma-none q-mt-md flex flex-center column">
    <q-dialog v-model="dialog" full-width class="z-max">
      <q-card class="q-pa-md z-max">
        <vue-json-pretty :data="txnData"></vue-json-pretty>
      </q-card>
    </q-dialog>
    <div class="row">
      <q-chip
        size="sm"
        v-for="(fprop, index) in Object.keys(filter)"
        :key="index"
        :selected.sync="filter[fprop]"
        >{{ fprop }}</q-chip
      >
    </div>
    <br />
    <div class="row">
      <q-list class="column">
        <div class="h4 centered" style="width:400px">
          DOMAIN
        </div>
        <div
          v-for="(item, index) in dedupe(getTransactions().DOMAIN)"
          :key="index"
          class="q-ma-none"
        >
          <q-card
            v-if="filter[findType(item.txn.type)]"
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
      </q-list>
      <q-list borderd separator class="column">
        <div class="h4 centered" style="width:400px">
          CONFIG
        </div>
        <div
          v-for="(item, index) in dedupe(getTransactions().CONFIG)"
          :key="index"
          class="q-ma-none"
        >
          <q-card
            v-if="filter[findType(item.txn.type)]"
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
      </q-list>
      <q-list borderd separator class="column">
        <div class="h4 centered" style="width:400px">
          POOL
        </div>
        <div
          v-for="(item, index) in dedupe(getTransactions().POOL)"
          :key="index"
          class="q-ma-none"
        >
          <q-card
            v-if="filter[findType(item.txn.type)]"
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
        <div v-if="listHasItems('PoolContainer')">
          No items.
        </div>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import { mapState, mapGetters } from 'vuex'
import TypeRouter from '../components/TypeRouter.vue'

const types = {
  '0': 'NODE',
  '1': 'NYM',
  '4': 'TXN_AUTHOR_AGREEMENT',
  '5': 'TXN_AUTHOR_AGREEMENT_AML',
  '100': 'ATTRIB',
  '101': 'SCHEMA',
  '102': 'CRED_DEF',
  // '109': 'POOL_UPGRADE',
  // '110': 'NODE_UPGRADE',
  // '111': 'POOL_CONFIG',
  // '3': 'GET_TXN',
  // '104': 'GET_ATTR',
  // '105': 'GET_NYM',
  // '107': 'GET_SCHEMA',
  // '108': 'GET_CRED_DEF',
}

const generateFilters = function() {
  const r = {}
  for (const prop of Object.values(types)) {
    r[prop] = true
  }
  return r
}

export default {
  data() {
    return {
      dialog: false,
      types: types,
      filter: {
        NODE: true,
        NYM: true,
        CRED_DEF: true,
        SCHEMA: true,
        ATTRIB: true,
        TXN_AUTHOR_AGREEMENT: true,
        TXN_AUTHOR_AGREEMENT_AML: true,
      },
      txnData: {},
    }
  },
  components: {
    VueJsonPretty,
    TypeRouter,
  },
  computed: {
    ...mapState('transactions', ['txns']),
  },
  methods: {
    ...mapGetters('transactions', ['getTransactions']),
    dedupe: txns => {
      return Array.from(new Set(txns))
    },
    findType: type => {
      return types[type]
    },
    openDialog: function(item) {
      this.txnData = item
      this.dialog = true
    },
    listHasItems: function(id) {
      return false
    },
  },
  created: function() {
    const $vm = this
    Object.values(types).map(x => ($vm.filter[x] = true))
  },
  mounted: function() {
    this.$store.dispatch('transactions/connect')
  },
  name: 'PageIndex',
}
</script>
