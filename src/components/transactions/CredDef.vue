<template>
  <div v-if="item" :style="`border-left:3px ${color} solid`" class="q-pa-none cursor-pointer">
    <div :style="`color: ${color}`" :class="`row q-ma-sm tx_header`">
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
            :color="color"
            :type="type"
          ></txn-metadata>
        </div>
      </div>
    </q-card-section>
    <q-expansion-item
      dense
      expand-icon-toggle
      label="Payload"
      class="text-grey-9 text-caption tx_expander"
      expand-icon-class="text-grey-9"
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
      default: 'light-green',
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
