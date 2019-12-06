<template>
  <div class="bg-white text-black q-pa-sm wrap">
    <div>{{ formatDate(item.metadata.reqId) }}</div>
    <q-chip
      dense
      square
      v-for="(attr, index) in item.data.data.attr_names"
      :key="index"
      color="yellow-4"
      class="glossy ellipsis"
      >{{ attr }}</q-chip
    >
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  props: {
    item: Object,
  },
  methods: {
    getAttribs: function(def) {
      return Object.keys(def)
    },
    formatDate: function(inputDate) {
      if (inputDate < 1575000000) return inputDate
      return date.formatDate(
        new Date(inputDate / 1000000),
        'MMMM Do YYYY, HH:mm:ss (Z)'
      )
    },
  },
}
</script>
