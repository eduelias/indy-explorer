<template>
  <div
    q-ripple
    v-if="item"
    style="border-left:3px blue solid"
    class="q-pa-none q-ma-none q-pa-none"
  >
    <div
      style="font-size: 0.8em; line-height: 1.2em"
      class="text-indigo-3 text-caption q-pa-none q-px-xs q-ma-none text-weight-bolder"
    >
      NYM - {{ formatDate(item.txnMetadata.txnTime) }}
    </div>
    <q-card-section
      class="q-pa-none q-ma-none bg-indigo-1 cursor-pointer"
      @click="openDialog(item)"
    >
      <txn-metadata
        :item="item.txnMetadata"
        color="indigo"
      ></txn-metadata>
    </q-card-section>
    <q-card-section class="q-ma-none q-pa-none bg-white">
      <required-signature
        :item="item.reqSignature"
      ></required-signature>
    </q-card-section>
    <q-separator />
    <q-expansion-item
      dense
      expand-icon-toggle
      :label="item.txn.data.dest"
      class="text-grey-9 text-caption"
      expand-icon-class="text-grey-9"
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
