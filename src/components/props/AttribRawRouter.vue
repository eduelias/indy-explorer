<template>
  <endpoint
    v-if="item.endpoint || item.endpoints"
    :item="item.endpoint || item.endpoints"
  ></endpoint>
  <div v-else>{{ Object.keys(item)[0] }}</div>
</template>

<script>
import endpoint from './../attribs/Endpoint.vue';
export default {
  components: {
    endpoint,
  },
  props: {
    item: Object,
  },
};
</script>
