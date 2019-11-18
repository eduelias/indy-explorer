<template>
  <q-page class="flex flex-center">
    <q-dialog v-model="dialog" full-width>
      <q-card class="q-pa-md">
        <vue-json-pretty :data="txnData"></vue-json-pretty> </q-card
      >ßß
    </q-dialog>
    <q-list borderd separator style="max-width: 800px; margin-top:20px">
      <q-card
        clickable
        v-ripple
        v-for="(item, index) in dedupe(getTransactions())"
        :key="index"
      >
        <div v-if="item">
          <q-card-section>
            <div class="text-h6">
              {{
                item.txnMetadata.txnTime ||
                  new Date('1970-01-01') | moment('YYYY-MM-DD HH:mm:ss')
              }}
            </div>
            <div class="text-subtitle2">From: {{ item.txn.metadata.from }}</div>
            <div class="text-subtitle3">TxId: {{ item.txnMetadata.txnId }}</div>
          </q-card-section>
          <q-separator dark />

          <q-card-actions>
            <div>Type: {{ findType(item.txn.type) }}</div>
            <q-space />
            <q-btn flat @click="openDialog(item)"
              >Tx #:{{ item.txnMetadata.seqNo }}</q-btn
            >
          </q-card-actions>
        </div>
      </q-card>
    </q-list>
  </q-page>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import { mapState, mapGetters } from 'vuex'

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
