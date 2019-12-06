<template>
  <q-item class="q-ma-none" style="min-height:0px">
    <q-chip
      v-for="(val, index) in item.values"
      :key="index"
      size="sm"
      icon="lock"
    >
      {{ val.from.slice(0, 6) }} ...
      <q-tooltip>{{ val.value }}</q-tooltip>
    </q-chip>
  </q-item>
</template>

<script>
export default {
  props: {
    item: Object,
  },
}
</script>
