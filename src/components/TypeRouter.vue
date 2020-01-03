<template>
  <div :id="item.rootHash">
    <nym-transaction
      v-if="type == 'NYM'"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></nym-transaction>
    <author-agreement-aml
      v-else-if="type == 'TXN_AUTHOR_AGREEMENT_AML'"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></author-agreement-aml>
    <txn-author-agreement
      v-else-if="type == 'TXN_AUTHOR_AGREEMENT'"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></txn-author-agreement>
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
    <node
      v-else-if="type == 'NODE'"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></node>
    <attrib
      v-else-if="type == 'ATTRIB'"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></attrib>
    <revoc-reg-def
      v-else-if="type == 'REVOC_REG_DEF'"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></revoc-reg-def>
    <revoc-reg-entry
      v-else-if="type == 'REVOC_REG_ENTRY'"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></revoc-reg-entry>
    <node-upgrade
      v-else-if="type == 'NODE_UPGRADE'"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></node-upgrade>
    <generic-transaction
      v-else
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></generic-transaction>
  </div>
</template>

<script>
export default {
  components: {
    RevocRegDef: () => import('./transactions/RevocRegDef.vue'),
    RevocRegEntry: () => import('./transactions/RevocRegEntry.vue'),
    SchemaTransaction: () => import('./transactions/Schema.vue'),
    GenericTransaction: () => import('./transactions/Generic.vue'),
    NymTransaction: () => import('./transactions/Nym.vue'),
    CredDefTransaction: () => import('./transactions/CredDef.vue'),
    AuthorAgreementAml: () => import('./transactions/Aml.vue'),
    TxnAuthorAgreement: () => import('./transactions/Taa.vue'),
    Attrib: () => import('./transactions/Attrib.vue'),
    Node: () => import('./transactions/Node.vue'),
    NodeUpgrade: () => import('./transactions/NodeUpgrade.vue'),
  },
  props: {
    supportedTypes: Object,
    item: Object,
    type: String,
    filter: Object,
  },
  methods: {
    openDialog: function(data) {
      this.$emit('openDialog', data);
    },
  },
};
</script>
