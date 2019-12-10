<template>
  <q-item
    style="min-height:0px"
    class="q-ma-none q-py-none"
    v-if="item"
    @click="openDialog(item)"
  >
    <div :class="`text-${color}-8 text-h5 q-pa-none row`">
      #{{ item.seqNo }}
      <q-tooltip v-if="item.txnId">{{ item.txnId }}</q-tooltip>
      <div
        v-if="type"
        :class="`text-h3 text-white absolute-center ellipsis`"
        style="opacity:0.7"
      >
        {{ type }}
      </div>
    </div>
    <q-space></q-space>
    <div v-if="item.txnTime" :class="`text-overline text-${color}-8`">
      {{ formatDate(item.txnTime) }}
    </div>
  </q-item>
</template>

<script>
import moment from 'moment'
import { date } from 'quasar'

export default {
  props: {
    item: Object,
    color: String,
    type: String,
  },
  methods: {
    formatDate: function(inputDate) {
      return moment(
        date.formatDate(new Date(inputDate * 1000), 'YYYY-MM-DD HH:mm:ss'),
        'YYYY-MM-DD HH:mm:ss'
      ).fromNow()
    },
  },
}
</script>
