<template>
  <div :style="`color: ${color}`" :class="`row q-ma-sm tx_header`">
    {{ type }} - {{ formatDate(date) }}<q-space />
    <div class="float-right cursor-pointer text-h5 tx_number" @click="click">#{{ seqNo }}</div>
  </div>
</template>

<script>
import { date } from 'quasar';

export default {
  props: {
    color: String,
    type: String,
    date: Number,
    seqNo: Number,
  },
  methods: {
    formatDate: function(inputDate) {
      return date.formatDate(new Date(inputDate * 1000), 'MMMM Do YYYY, HH:mm:ss (Z)');
    },
    click: function() {
      this.$emit('click', {});
    },
  },
};
</script>
