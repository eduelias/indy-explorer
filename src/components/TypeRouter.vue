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
    <generic-transaction
      v-else
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></generic-transaction>
  </div>
</template>

<script>
import SchemaTransaction from './transactions/Schema.vue';
import GenericTransaction from './transactions/Generic.vue';
import NymTransaction from './transactions/Nym.vue';
import CredDefTransaction from './transactions/CredDef.vue';
import AuthorAgreementAml from './transactions/Aml.vue';
import TxnAuthorAgreement from './transactions/Taa.vue';
import Attrib from './transactions/Attrib.vue';
import Node from './transactions/Node.vue';

export default {
  components: {
    SchemaTransaction,
    NymTransaction,
    CredDefTransaction,
    GenericTransaction,
    AuthorAgreementAml,
    TxnAuthorAgreement,
    Node,
    Attrib,
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
