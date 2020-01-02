<template>
  <div style="min-height:0px; width: 400px;">
    <q-chip
      v-for="(val, index) in item.values"
      :key="index"
      size="sm"
      icon="gesture"
    >
      {{ val.from.slice(0, 3) }} ...
      <q-icon
        size="sm"
        name="mdi-chevron-right"
        class="cursor-pointer"
      >
        <q-popup-proxy
          @before-show="setComponent()"
          anchor="top right"
          ><component
            :is="currentComp"
            :fromAddress="val.from"
          ></component
        ></q-popup-proxy>
      </q-icon>
      <q-tooltip>{{ val.value }}</q-tooltip>
    </q-chip>
  </div>
</template>

<style scoped>
@keyframes highlight {
  0% {
    background-color: yellow;
  }
  100% {
    background-color: transparent;
  }
}

.highlight-enter-active {
  animation: highlight 2s;
}
</style>

<script>
import { scroll } from 'quasar';

const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: 'required-signature',
  data() {
    return {
      nymTransaction: () => import('./../PopNym.vue'),
      currentComp: null,
    };
  },
  props: {
    item: Object,
  },
  methods: {
    goto: el => {
      const ele = document.getElementById(`NYM${el}`); // You need to get your element here
      const colorClass = 'bg-yellow-3';
      ele.classList.add(colorClass);
      ele.scrollIntoView({ block: 'end' });
      setTimeout(() => {
        ele.classList.remove(colorClass);
      }, 2500);
    },
    setComponent: function() {
      this.currentComp = this.nymTransaction;
    },
  },
};
</script>
