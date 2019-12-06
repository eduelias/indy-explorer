<template>
  <div class="bg-grey-4">
    <nym v-if="item.type == '1'" :item="item"></nym>
    <cred-def v-else-if="item.type == '102'" :item="item"></cred-def>
    <schema v-else-if="item.type == '101'" :item="item"></schema>
    <div v-else>{{ item }}</div>
  </div>
</template>

<script>
import Nym from '../dataprops/NymData.vue'
import CredDef from '../dataprops/CredDefData.vue'
import Schema from '../dataprops/SchemaData.vue'

export default {
  components: {
    Nym,
    CredDef,
    Schema,
  },
  props: {
    item: Object,
    type: String,
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data)
    },
  },
}
</script>
