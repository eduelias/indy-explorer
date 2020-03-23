<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="z-max">
      <q-toolbar class="tykn_bar">
        <q-toolbar-title class="q-ma-lg rubik"
          ><span class="tykn_title">tykn</span> Ledger Explorer</q-toolbar-title
        >
        <!-- <div>Framework v{{ $q.version }}</div> -->
      </q-toolbar>
      <q-toolbar
        inset
        class="bg-white q-pa-none q-ma-none"
        style="min-height: 22px; height: 22px; border: 0.5px solid #DCDBE1"
      >
        <q-space />
        <q-separator vertical="" />
        <q-toggle
          size="xs"
          left-label
          class="q-mx-md text-grey-5"
          label="Dark mode"
          color="green"
        />
        <q-separator vertical="" />
        <q-select
          class="q-pa-none q-ma-none"
          outlined
          v-model="sovmain"
          style="width:200px; min-height: 22px !important; height: 22px !important;"
          filled
          :options="['sovmain', 'sovtest', 'sovbuilder']"
          dense=""
          options-dense=""
        />
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
    };
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

.rubik {
  font-family: Rubik;
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
