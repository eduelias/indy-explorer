<template>
  <nym-transaction
    v-if="type == 'NYM'"
    :item="item"
    :type="type"
    v-on:openDialog="openDialog"
  ></nym-transaction>
  <schema-transaction
    v-else-if="type == 'SCHEMA'"
    :item="item"
    :type="type"
    v-on:openDialog="openDialog"
  ></schema-transaction>
  <cred-def-transaction
    v-else-if="type == 'CRED_DEF'"
    :item="item"
    :type="type"
    v-on:openDialog="openDialog"
  ></cred-def-transaction>
  <generic-transaction
    v-else
    :item="item"
    :type="type"
    v-on:openDialog="openDialog"
  ></generic-transaction>
</template>

<script>
import GenericTransaction from './transactions/Generic.vue'
import SchemaTransaction from './transactions/Schema.vue'
import NymTransaction from './transactions/Nym.vue'
import CredDefTransaction from './transactions/CredDef.vue'

export default {
  components: {
    GenericTransaction,
    SchemaTransaction,
    NymTransaction,
    CredDefTransaction,
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
