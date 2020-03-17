<template>
  <div class="bg-white text-black q-pa-sm wrap">
    <div>{{ formatDate(item.metadata.reqId) }}</div>
    {{ item.data.text }}
  </div>
</template>

<script>
import { date } from 'quasar';

export default {
  props: {
    item: Object,
  },
  methods: {
    getAttribs: function(def) {
      return Object.keys(def);
    },
    formatDate: function(inputDate) {
      if (inputDate < 1575000000) return inputDate;

      return date.formatDate(new Date(inputDate * 1000), 'MMMM Do YYYY, HH:mm:ss (Z)');
    },
  },
};
</script>
