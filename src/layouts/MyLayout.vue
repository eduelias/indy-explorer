<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="z-max rubik">
      <q-toolbar class="tykn_bar">
        <q-toolbar-title class="q-ma-lg rubik row">
          <div class="column">
            <img width="32" height="32" src="statics/icons/128x128.png" />
          </div>
          <h1 style="display:none">Tykn Indy Inspector</h1>
          <div class="column q-ml-sm tykn_title">
            tykn
          </div>
          <div style="font-size: 24px" class="column q-ml-sm">
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
      <q-banner inline-actions rounded style="width=80%" class="text-center q-ma-lg bg-green-11">
        The <b class="tykn_font">tykn</b> Indy Inspector is now available for beta testing. We
        welcome you to try it and provide your
        <b
          ><a style="color:#000000; text-decoration:underline" href="mailto:dev@tykn.tech"
            >feedback</a
          ></b
        >.
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

  background: #493193;
}

.tykn_font {
  font-family: RubikBlack;
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
