<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-teal z-max">
      <q-toolbar>
        <q-toolbar-title>Tykn Ledger Explorer</q-toolbar-title>
        <!-- <div>Framework v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
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
    }
  },
}
</script>
