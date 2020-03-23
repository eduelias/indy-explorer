<template>
  <div v-if="item">
    <q-card-section>
      <div class="text-h6">
        {{ item.txnMetadata.txnTime || new Date('1970-01-01') | moment('YYYY-MM-DD HH:mm:ss') }}
      </div>
      <div class="text-subtitle2">From: {{ item.txn.metadata.from }}</div>
      <div class="text-subtitle3">TxId: {{ item.txnMetadata.txnId }}</div>
    </q-card-section>
    <q-separator dark />

    <q-card-actions>
      <div>Type: {{ type }}</div>
      <q-space />
      <q-btn flat @click="openDialog(item)">Tx #:{{ item.txnMetadata.seqNo }}</q-btn>
    </q-card-actions>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    type: String,
    color: {
      type: String,
      default: 'orange',
    },
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data);
    },
  },
};
</script>
