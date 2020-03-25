<template>
  <div v-if="item" class="q-pa-none cursor-pointer" style="border-left:2px yellow solid">
    <div :class="`row text-${color}-3 q-ma-sm tx_header`">
      {{ type }} - {{ formatDate(item.txnMetadata.txnTime) }}<q-space />
      <div class="float-right text-h5 tx_number">#{{ item.txnMetadata.seqNo }}</div>
    </div>
    <q-card-section class="row q-ma-none q-pa-none q-mx-xs bg-white">
      <div class="row">
        <div class="column" style="width: 70%">
          <required-signature :item="item.reqSignature"></required-signature>
        </div>
        <q-space />
        <div class="column" style="width: 30%; align-content: flex-end;">
          <txn-metadata
            :item="item.txnMetadata"
            :txnmetadata="item.txn.metadata"
            color="yellow"
            type="SCHEMA"
          ></txn-metadata>
        </div>
      </div>
    </q-card-section>
    <q-expansion-item
      v-if="item.txn"
      dense
      expand-icon-toggle
      :label="`${item.txn.data.data.name} (${item.txn.data.data.version})`"
      class="text-yellow-10 text-caption tx_expander"
      expand-icon-class="text-yellow-10"
    >
      <txn-data :item="item.txn"></txn-data>
    </q-expansion-item>
  </div>
</template>

<script>
import RequiredSignature from '../props/ReqSignature.vue';
import TxnMetadata from '../props/TxnMetadata.vue';
import TxnData from '../props/TxDataRouter.vue';
import moment from 'moment';
import { date } from 'quasar';

export default {
  components: {
    RequiredSignature,
    TxnMetadata,
    TxnData,
  },
  props: {
    item: Object,
    type: String,
    color: {
      type: String,
      default: 'yellow',
    },
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data);
    },
    formatDate: function(inputDate) {
      return date.formatDate(new Date(inputDate * 1000), 'MMMM Do YYYY, HH:mm:ss (Z)');
    },
  },
};
</script>
