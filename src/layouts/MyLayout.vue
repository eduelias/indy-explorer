<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="z-max rubik">
      <q-toolbar class="tykn_bar">
        <q-toolbar-title class="q-ma-lg rubik row">
          <div class="column">
            <img src="statics/icons/32x32.png" />
          </div>
          <div class="column q-ml-lg tykn_title">
            tykn
          </div>
          <div class="column q-ml-sm q-mt-xs">
            Indy Inspector
          </div>
        </q-toolbar-title>
        <!-- <div>Framework v{{ $q.version }}</div> -->
      </q-toolbar>
      <q-toolbar
        inset
        class="bg-white q-pa-none q-ma-none"
        style="min-height: 22px; height: 22px; border: 0.5px solid #DCDBE1"
      >
        <q-space />
        <q-separator vertical="" />
        <!-- <q-toggle
          size="xs"
          left-label
          class="q-mx-md text-grey-5"
          label="Dark mode"
          color="green"
        /> -->
        <q-separator vertical="" />
        <q-select
          class="q-pa-none q-ma-none"
          bg-color="transparent"
          :standout="false"
          hide-bottom-space
          v-model="network"
          style="width:200px; background-color:transparent; max-height: 22px !important; height: 22px !important;"
          filled
          :options="['sovmain', 'sovstaging', 'sovbuilder']"
          dense
          options-dense
          @input="navigate"
        >
        </q-select>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-banner inline-actions rounded style="width=80%" class="q-ma-lg bg-green-11">
        The tykn Indy Scan is now available for beta testing. We welcome you to try it and provide
        your <b>feedback</b>.
      </q-banner>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data() {
    return {
      leftDrawerOpen: false,
      network: 'sovbuilder',
    };
  },
  methods: {
    navigate() {
      this.$store.dispatch('transactions/networkChange', this.$data.network);
    },
  },
};
</script>

<style scoped>
.tykn_bar {
  height: 87px;
  left: 0px;
  top: 0px;

  background: #44368e;
}

.tykn_title {
  font-family: RubikBlack;
  font-size: 24px;
  color: #ffffff;
}

.beta_bar {
  width: 1138px;
  height: 43px;
  left: 283px;
  top: 120px;

  background: rgba(32, 159, 142);
  border: 0.5px solid rgba(32, 159, 142);
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
