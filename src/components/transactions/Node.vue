<template>
  <div
    :id="`NODE${item.rootHash}`"
    v-if="item"
    :style="`border-left:3px ${color} solid;`"
    class="q-pa-none q-ma-none q-pa-none"
  >
    <tx-header
      :color="color"
      :type="type"
      :date="item.txnMetadata.txnTime"
      :seqNo="item.txnMetadata.seqNo"
      v-on:click="openDialog(item)"
    ></tx-header>
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
export default {
  components: {
    TxnData: () => import('../props/TxDataRouter.vue'),
    TxHeader: () => import('../common/CardHeader.vue'),
  },
  props: {
    item: Object,
    type: String,
    color: {
      type: String,
    },
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data);
    },
    formatLabel: function(data) {
      return `http://${data.node_ip}:${data.node_port}`;
    },
  },
};
</script>
