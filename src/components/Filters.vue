<template>
  <div style="max-width: 400px">
    <div class="h4 centered" style="padding-left: 15px; width:400px">
      {{ ledger }}
    </div>
    <div
      class="row"
      :style="
        `width: 410px; padding: 10px; height:128px; ${
          ledger !== 'POOL' ? 'border-right: 1px #F5F5F5 solid;' : ''
        } border-bottom: 1px solid #F5F5F5;`
      "
    >
      <q-chip
        size="sm"
        v-for="(fprop, index) in Object.keys(filter[ledger])"
        :key="index"
        :selected.sync="filter[ledger][fprop]"
        :color="fprop.toLowerCase()"
        outline
        @click="onClick({ ledger, filter, network })"
        >{{ fprop }}</q-chip
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    filter: Object,
    ledger: String,
    getFilterChipColor: Function,
    network: String,
  },
  computed: {
    ...mapState('transactions', ['colors']),
  },
  methods: {
    onClick: async function({ network, ledger, filter }) {
      await this.$store.dispatch('transactions/getPage', {
        ledger,
        filter,
        network,
      });
    },
  },
};
</script>
