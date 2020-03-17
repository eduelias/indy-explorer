<template>
  <div
    :id="`NODE${item.rootHash}`"
    v-if="item"
    style="border-left:3px grey solid"
    class="q-pa-none q-ma-none q-pa-none"
  >
    <div
      style="font-size: 0.8em; line-height: 1.2em"
      class="text-grey-6 text-caption q-pa-none q-px-xs q-ma-none text-weight-bolder"
    >
      NODE
    </div>
    <q-card-section
      class="glossy q-pa-none q-ma-none bg-grey-4 cursor-pointer"
      @click="openDialog(item)"
    >
      <txn-metadata
        :item="item.txnMetadata"
        :txnmetadata="item.txn.metadata"
        type="NODE"
        color="grey"
      ></txn-metadata>
    </q-card-section>
    <q-card-section class="q-ma-none q-pa-sm bg-white">
      <q-chip
        size="sm"
        outline
        square
        v-for="(service, index) in item.txn.data.data.services"
        :key="index"
        >{{ service }}</q-chip
      >
    </q-card-section>

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
    TxnMetadata,
    TxnData,
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
      return date.formatDate(new Date(inputDate * 1000), 'MMMM Do YYYY, HH:mm:ss (Z)');
    },
    formatLabel: function(data) {
      return `http://${data.node_ip}:${data.node_port}`;
    },
  },
};
</script>
