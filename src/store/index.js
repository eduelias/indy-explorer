import Vue from 'vue';
import Vuex from 'vuex';
import transactions from './transactions';
import moment from 'vue-moment';

Vue.use(Vuex);
Vue.use(moment);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
    const Store = new Vuex.Store({
        namespaced: true,
        modules: {
            transactions,
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEV,
    });

    return Store;
}
