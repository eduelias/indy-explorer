<template>
  <div v-if="!computedItem">Loading ...</div>
  <component dark :is="nym" v-else :item="computedItem"></component>
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
      console.log(from);
      return (
        this.$store.state.transactions.txns.DOMAIN.find(
          tx => tx?.txn?.data?.dest?.indexOf(from.slice(0, 6)) > 0
        ) || from
      );
    },
    setNym: function(nym) {
      this.item = nym;
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
          tx?.txn?.data?.dest?.slice(0, 6) ===
            this.fromAddress.slice(0, 6))
    );

    console.log(
      'aaa',
      this.$store.state.transactions.txns.DOMAIN[412]
    );

    if (hereItem) return (this.item = hereItem);

    this.$store.dispatch('transactions/getNymByVerkey', {
      from: this.fromAddress,
      setter: this.setNym,
    });
  },
};
</script>
