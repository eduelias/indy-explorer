<template>
  <div class="bg-white text-black q-pa-sm">
    <div>{{ formatDate(findTheDate(item.metadata.reqId)) }}</div>
    <div>
      <span class="text-bold">Verkey:</span>
      {{ item.data.verkey }}
    </div>
    <!-- <div>
      <span class="text-bold">Oboarding:</span> {{ item.data.dest }}
    </div>-->
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  props: {
    item: Object,
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data)
    },
    findTheDate: function(inputDate) {
      if (Date.parse(inputDate * 1000)) {
        return Date.parse(inputDate * 1000)
      }
      if (Date.parse(inputDate)) {
        return Date.parse(inputDate)
      }
      if (Date.parse(inputDate / 10)) {
        return Date.parse(inputDate / 10)
      }
      if (Date.parse(inputDate / 1000)) {
        return Date.parse(inputDate / 1000)
      }
      if (Date.parse(inputDate / 1000000)) {
        return Date.parse(inputDate / 1000000)
      }

      return inputDate
    },
    formatDate: function(inputDate) {
      if (inputDate < 1575000000) return inputDate
      return date.formatDate(new Date(inputDate), 'MMMM Do YYYY, HH:mm:ss (Z)')
    },
  },
}
</script>
