<template>
  <div
    :id="`ATTRIB${item.txn.data.dest}`"
    v-if="item"
    :style="`border-left:3px ${color} solid`"
    class="q-pa-none q-ma-none q-pa-none"
  >
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
            color="orange"
            type="ATTRIB"
          ></txn-metadata>
        </div>
      </div>
    </q-card-section>

    <q-expansion-item
      dense
      expand-icon-toggle
      :label="formatLabel(item.txn.data.dest)"
      class="text-grey-9 text-caption tx_expander"
      expand-icon-class="text-grey-9"
    >
      <template v-slot:header>
        <q-item-section avatar class="text-weight-bold">{{ item.txn.data.dest }}</q-item-section>
        <q-item-section>
          <attrib-raw v-if="item.txn.data.raw" :item="JSON.parse(item.txn.data.raw)"></attrib-raw>
        </q-item-section>
      </template>
      <txn-data :item="item.txn"></txn-data>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  components: {
    AttribRaw: () => import('../props/AttribRawRouter.vue'),
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
    formatLabel: function(data) {
      return `<b> Onboarding: </b> ${data}`;
    },
  },
};
</script>
