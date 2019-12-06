<template>
  <q-page class="flex flex-center">
    <q-dialog v-model="dialog" full-width>
      <q-card class="q-pa-md">
        <vue-json-pretty :data="txnData"></vue-json-pretty>
      </q-card>
    </q-dialog>
    <q-list borderd separator>
      <q-card
        clickable
        v-ripple
        v-for="(item, index) in dedupe(getTransactions())"
        :key="index"
        class="q-ma-md"
        style="width: 400px"
      >
        <type-router
          :item="item"
          :type="findType(item.txn.type)"
          v-on:openDialog="openDialog"
        ></type-router>
      </q-card>
    </q-list>
  </q-page>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import { mapState, mapGetters } from 'vuex'
import TypeRouter from '../components/TypeRouter.vue'

const types = {
  '0': 'NODE',
  '1': 'NYM',
  '100': 'ATTRIB',
  '101': 'SCHEMA',
  '102': 'CRED_DEF',
  '109': 'POOL_UPGRADE',
  '110': 'NODE_UPGRADE',
  '111': 'POOL_CONFIG',
  '3': 'GET_TXN',
  '104': 'GET_ATTR',
  '105': 'GET_NYM',
  '107': 'GET_SCHEMA',
  '108': 'GET_CRED_DEF',
}

export default {
  data() {
    return {
      dialog: false,
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
  },
  mounted() {
    this.$store.dispatch('transactions/connect')
  },
  name: 'PageIndex',
}
</script>
