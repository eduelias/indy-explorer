<template>
  <div
    v-if="item"
    class="q-pa-none q-pl-xs cursor-pointer"
    style="border-left:3px yellow solid"
  >
    <div
      style="font-size: 0.8em; line-height: 1.2em"
      class="text-yellow-10 text-caption q-pa-none q-ma-none text-weight-bolder"
    >
      SCHEMA - {{ formatDate(item.txnMetadata.txnTime) }}
    </div>
    <q-card-section
      class="q-pa-none bg-yellow-1"
      @click="openDialog(item)"
    >
      <txn-metadata
        :item="item.txnMetadata"
        color="yellow"
      ></txn-metadata>
    </q-card-section>
    <q-card-section class="q-ma-none q-pa-none bg-white">
      <required-signature
        :item="item.reqSignature"
      ></required-signature>
    </q-card-section>
    <q-expansion-item
      v-if="item.txn"
      dense
      expand-icon-toggle
      :label="
        `${item.txn.data.data.name} (${item.txn.data.data.version})`
      "
      class="text-yellow-10 text-caption"
      expand-icon-class="text-yellow-10"
    >
      <txn-data :item="item.txn"></txn-data>
    </q-expansion-item>
  </div>
</template>

<script>
import RequiredSignature from '../props/ReqSignature.vue'
import TxnMetadata from '../props/TxnMetadata.vue'
import TxnData from '../props/TxDataRouter.vue'
import moment from 'moment'
import { date } from 'quasar'

export default {
  components: {
    RequiredSignature,
    TxnMetadata,
    TxnData,
  },
  props: {
    item: Object,
    type: String,
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data)
    },
    formatDate: function(inputDate) {
      return date.formatDate(
        new Date(inputDate * 1000),
        'MMMM Do YYYY, HH:mm:ss (Z)'
      )
    },
  },
}
</script>
