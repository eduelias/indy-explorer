<template>
  <div v-if="item" class="q-pa-none cursor-pointer" :style="`border-left:3px ${color} solid`">
    <tx-header
      :color="color"
      :type="type"
      :date="item.txnMetadata.txnTime"
      :seqNo="item.txnMetadata.seqNo"
      v-on:click="openDialog(item)"
    ></tx-header>
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
      class="text-caption tx_expander"
    >
      <txn-data :item="item.txn"></txn-data>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  components: {
    RequiredSignature: () => import('../props/ReqSignature.vue'),
    TxnMetadata: () => import('../props/TxnMetadata.vue'),
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
  },
};
</script>
