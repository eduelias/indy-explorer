<template>
  <div
    :id="`NODEUP${item.txn.data.dest}`"
    v-if="item"
    style="border-left:3px teal solid"
    class="q-pa-none q-ma-none q-pa-none"
  >
    <div
      style="font-size: 0.8em; line-height: 1.2em"
      class="text-teal-3 text-caption q-pa-none q-px-xs q-ma-none text-weight-bolder"
    >
      NODE_UPGRADE - {{ formatDate(item.txnMetadata.txnTime) }}
    </div>
    <q-card-section
      class="glossy q-pa-none q-ma-none bg-teal-2 cursor-pointer"
      @click="openDialog(item)"
    >
      <txn-metadata
        :item="item.txnMetadata"
        :type="type"
        :txnmetadata="item.txn.metadata"
        color="teal"
      ></txn-metadata>
    </q-card-section>
    <q-card-section class="q-ma-none q-pa-none bg-white">
      <required-signature
        :popup="false"
        :item="item.reqSignature"
      ></required-signature>
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
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data);
    },
    formatDate: function(inputDate) {
      return date.formatDate(
        new Date(inputDate * 1000),
        'MMMM Do YYYY, HH:mm:ss (Z)'
      );
    },
    formatLabel: function(data) {
      return `<b> Onboarding: </b> ${data}`;
    },
  },
};
</script>
