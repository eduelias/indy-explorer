<template>
  <div
    :id="`NODEUP${item.txn.data.dest}`"
    v-if="item"
    style="border-left:3px teal solid"
    class="q-pa-none q-ma-none q-pa-none"
  >
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
            :color="color"
            :type="type"
          ></txn-metadata>
        </div>
      </div>
    </q-card-section>

    <q-expansion-item
      dense
      expand-icon-toggle
      :label="formatLabel(item.txn.data.dest)"
      class="text-grey-9 text-caption"
      expand-icon-class="text-grey-9"
    >
      <template v-slot:header>
        <q-item-section avatar class="text-weight-bold">{{
          item.txn.data.data.version
        }}</q-item-section>
        <q-item-section>
          {{ item.txn.data.data.action }}
        </q-item-section>
      </template>
      <txn-data :item="item.txn.data"></txn-data>
    </q-expansion-item>
  </div>
</template>

<script>
import moment from 'moment';
import { date } from 'quasar';

const roles = {
  '0': 'TRUSTEE',
  '2': 'STEWARD',
  '101': 'TRUST_ANCHOR',
};

export default {
  name: 'node-upgrade-transaction',
  components: {
    RequiredSignature: () => import('../props/ReqSignature.vue'),
    TxnMetadata: () => import('../props/TxnMetadata.vue'),
    TxnData: () => import('../props/TxDataRouter.vue'),
  },
  props: {
    item: Object,
    type: String,
    color: {
      type: String,
      default: 'teal',
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
      return `<b> Onboarding: </b> ${data}`;
    },
  },
};
</script>
