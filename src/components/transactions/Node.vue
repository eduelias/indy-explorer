<template>
  <div
    :id="`NODE${item.rootHash}`"
    v-if="item"
    :style="`border-left:3px ${color} solid;`"
    class="q-pa-none q-ma-none q-pa-none"
  >
    <div :style="`color: ${color}`" :class="`row q-ma-sm tx_header`">
      {{ type }} - {{ formatDate(item.txnMetadata.txnTime) }}
      <q-space />
      <div class="float-right text-h5 tx_number">#{{ item.txnMetadata.seqNo }}</div>
    </div>
    <div style="height:24px">&nbsp;</div>
    <q-expansion-item
      dense
      expand-icon-toggle
      class="text-grey-9 text-caption"
      expand-icon-class="text-grey-9"
    >
      <template v-slot:header>
        <q-item-section avatar class="text-weight-bold">{{
          item.txn.data.data.alias
        }}</q-item-section>
        <q-item-section>{{ formatLabel(item.txn.data.data) }}</q-item-section>
      </template>
      <txn-data :item="item.txn.data"></txn-data>
    </q-expansion-item>
  </div>
</template>

<script>
import TxnMetadata from '../props/TxnMetadata.vue';
import TxnData from '../props/TxDataRouter.vue';
import moment from 'moment';
import { date } from 'quasar';

const roles = {
  '0': 'TRUSTEE',
  '2': 'STEWARD',
  '101': 'TRUST_ANCHOR',
};

export default {
  components: {
    TxnData,
  },
  props: {
    item: Object,
    type: String,
    color: {
      type: String,
      default: 'grey',
    },
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data);
    },
    formatDate: function(inputDate) {
      return date.formatDate(new Date(inputDate * 1000), 'MMMM Do YYYY, HH:mm:ss (Z)');
    },
    formatLabel: function(data) {
      return `http://${data.node_ip}:${data.node_port}`;
    },
  },
};
</script>
