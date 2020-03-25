<template>
  <div style="max-width: 400px">
    <div class="h4 centered" style="width:400px">
      {{ ledger }}
    </div>
    <div class="row" style="height:96px;">
      <q-chip
        size="sm"
        v-for="(fprop, index) in Object.keys(filter[ledger])"
        :key="index"
        :selected.sync="filter[ledger][fprop]"
        :color="getFilterChipColor(fprop)"
        outline
        @click="onClick(ledger, filter)"
        >{{ fprop }}</q-chip
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filter: Object,
    ledger: String,
    getFilterChipColor: Function,
  },
  methods: {
    onClick: async function(ledger, filter) {
      await this.$store.dispatch('transactions/getPage', {
        ledger: ledger,
        filter: filter,
      });
    },
  },
};
</script>
