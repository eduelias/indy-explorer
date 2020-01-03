<template>
  <div :id="item.rootHash">
    <component
      :is="findName(type)"
      :item="item"
      :type="type"
      v-on:openDialog="openDialog"
    ></component>
  </div>
</template>

<script>
const toCamel = s => {
  return s.replace(/(_\w)/g, function(m) {
    return m[1].toUpperCase();
  });
};

export default {
  components: {
    RevocRegDef: () => import('./transactions/RevocRegDef.vue'),
    RevocRegEntry: () => import('./transactions/RevocRegEntry.vue'),
    Schema: () => import('./transactions/Schema.vue'),
    Generic: () => import('./transactions/Generic.vue'),
    Nym: () => import('./transactions/Nym.vue'),
    CredDef: () => import('./transactions/CredDef.vue'),
    TxnAuthorAgreementAml: () => import('./transactions/Aml.vue'),
    TxnAuthorAgreementAmlDisable: () =>
      import('./transactions/Aml.vue'),
    TxnAuthorAgreement: () => import('./transactions/Taa.vue'),
    Attrib: () => import('./transactions/Attrib.vue'),
    Node: () => import('./transactions/Node.vue'),
    NodeUpgrade: () => import('./transactions/NodeUpgrade.vue'),
    PoolUpgrade: () => import('./transactions/PoolUpgrade.vue'),
    AuthRules: () => import('./transactions/AuthRules.vue'),
    PoolConfig: () => import('./transactions/PoolConfig.vue'),
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
    findName: function(name) {
      const available = this.$options.components;
      const component = Object.keys(available).find(
        x => x.toLowerCase() == toCamel(name).toLowerCase()
      );

      if (!component) name = 'Generic';

      return name.replace(/_/gi, '-').toLowerCase();
    },
  },
};
</script>
