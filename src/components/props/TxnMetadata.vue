<template>
  <q-item style="min-height:0px" class="q-ma-none q-py-none" v-if="item">
    <div :class="`text-${color}-8 text-h5 q-pa-none row`">
      #{{ item.seqNo }}
      <q-tooltip v-if="item.txnId">{{ item.txnId }}</q-tooltip>
      <q-space />
      <div
        v-if="type"
        :class="`text-h3 text-white absolute-center ellipsis`"
        style="opacity:0.7; z-index:0; font-size:1em"
      >
        {{ type }}
      </div>
    </div>
    <q-space></q-space>
    <div v-if="item.txnTime" :class="`text-overline text-${color}-8`" style="z-index:1">
      {{ formatDate(item.txnTime) }}
    </div>
    <div v-if="txnmetadata && txnmetadata.taaAcceptance" style="z-index: 10">
      <q-icon
        :name="defineIcon(txnmetadata.taaAcceptance.mechanism)"
        :class="`text-${color}-8 q-ml-sm`"
        style="margin-top: 10px; opacity:0.8"
        ><q-tooltip>{{ agreements[txnmetadata.taaAcceptance.mechanism] }}</q-tooltip></q-icon
      >
    </div>
  </q-item>
</template>

<script>
import moment from 'moment';
import { date } from 'quasar';

export default {
  data() {
    return {
      agreements: {
        for_session:
          'The agreement was reviewed by the user and accepted at some point in the user’s session prior to submission.',
        at_submission:
          'The agreement was reviewed by the user and accepted at the time of submission of this transaction.',
        product_eula:
          'The agreement was included in the software product’s terms and conditions as part of a license to the end user.',
        service_agreement:
          'The agreement was included in the terms and conditions the user accepted as part of contracting a service.',
        wallet_agreement:
          'The agreement was reviewed by the user and this affirmation was persisted in the user’s wallet for use during submission.',
        on_file:
          'An authorized person accepted the agreement, and such acceptance is on file with the user’s organization.',
        click_agreement:
          'The agreement was displayed and then agreed to by typing or clicking acceptance.',
      },
    };
  },
  props: {
    item: Object,
    color: String,
    type: String,
    txnmetadata: Object,
  },
  methods: {
    formatDate: function(inputDate) {
      return moment(
        date.formatDate(new Date(inputDate * 1000), 'YYYY-MM-DD HH:mm:ss'),
        'YYYY-MM-DD HH:mm:ss'
      ).fromNow();
    },
    openDialog: function(data) {
      this.$emit('openDialog', data);
    },
    defineIcon: function(mechanism) {
      switch (mechanism) {
        case 'for_session':
          return 'mdi-google-chrome';
        case 'wallet_agreement':
          return 'mdi-wallet';
        case 'on_file':
          return 'mdi-file-outline';
        case 'click_agreement':
          return 'mdi-mouse';
        case 'product_eula':
        case 'at_submission':
        case 'service_agreement':
        default:
          return 'mdi-file-lock';
      }
    },
  },
};
</script>
