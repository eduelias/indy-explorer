<template>
  <div v-if="!computedItem">Loading ...</div>
  <component
    dark
    :is="nym"
    v-else
    :item="computedItem"
    type="NYM"
    v-on:openDialog="openDialog"
  ></component>
</template>

<script>
export default {
  name: 'popup-nym',
  data() {
    return {
      nym: () => import('./transactions/Nym.vue'),
      item: false,
    };
  },
  props: {
    fromAddress: String,
  },
  methods: {
    getNym: function(from) {
      return (
        this.$store.state.transactions.txns.DOMAIN.find(
          tx => tx?.txn?.data?.dest?.indexOf(from.slice(0, 6)) > 0
        ) || from
      );
    },
    setNym: function(nym) {
      this.item = nym;
    },
    openDialog: function(item) {
      this.$emit('openDialog', item);
    },
  },
  computed: {
    computedItem: function() {
      return this.item;
    },
  },
  async mounted() {
    const hereItem = this.$store.state.transactions.txns.DOMAIN.find(
      tx =>
        tx?.txn?.type === '1' &&
        (tx?.txn?.data?.dest?.indexOf(this.fromAddress) > 0 ||
          tx?.txn?.data?.dest?.slice(0, 6) === this.fromAddress.slice(0, 6))
    );

    if (hereItem) return (this.item = hereItem);

    this.$store.dispatch('transactions/getNymByVerkey', {
      from: this.fromAddress,
      setter: this.setNym,
    });
  },
};
</script>
