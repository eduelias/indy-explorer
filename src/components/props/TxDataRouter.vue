<template>
  <div class="bg-grey-4">
    <q-separator />
    <nym v-if="item.type == '1'" :item="item"></nym>
    <cred-def v-else-if="item.type == '102'" :item="item"></cred-def>
    <schema v-else-if="item.type == '101'" :item="item"></schema>
    <aml v-else-if="item.type == '5'" :item="item"></aml>
    <taa v-else-if="item.type == '4'" :item="item"></taa>
    <div v-else>{{ item }}</div>
  </div>
</template>

<script>
import Nym from '../dataprops/NymData.vue'
import CredDef from '../dataprops/CredDefData.vue'
import Schema from '../dataprops/SchemaData.vue'
import Aml from '../dataprops/AmlData.vue'
import Taa from '../dataprops/TaaData.vue'

export default {
  components: {
    Nym,
    CredDef,
    Schema,
    Aml,
    Taa,
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
