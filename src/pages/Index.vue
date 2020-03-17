<template>
    <q-page class="q-ma-none q-mt-md flex flex-center column">
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="teal" />
        </q-page-scroller>
        <q-dialog v-model="dialog" full-width class="z-max">
            <q-card class="q-pa-md z-max">
                <vue-json-pretty :data="txnData"></vue-json-pretty>
            </q-card>
        </q-dialog>
        <br />
        <div class="row">
            <q-list class="column">
                <q-page-scroller class="z-top" expand position="top" :scroll-offset="150" :offset="[0, 0]">
                    <div class="row q-pa-md bg-grey-3">
                        <div class="column">
                            <tip-filter
                                :filter="filter"
                                ledger="DOMAIN"
                                :getFilterChipColor="getFilterChipColor"
                            ></tip-filter>
                        </div>
                        <div class="column">
                            <tip-filter
                                :filter="filter"
                                ledger="CONFIG"
                                :getFilterChipColor="getFilterChipColor"
                            ></tip-filter>
                        </div>
                        <div class="column">
                            <tip-filter
                                :filter="filter"
                                ledger="POOL"
                                :getFilterChipColor="getFilterChipColor"
                            ></tip-filter>
                        </div>
                    </div>
                </q-page-scroller>
                <tip-filter :filter="filter" ledger="DOMAIN" :getFilterChipColor="getFilterChipColor"></tip-filter>
                <q-infinite-scroll @load="onload" :offset="2000">
                    <div v-for="(item, index) in dedupe(getTransactions().DOMAIN)" :key="index" class="q-ma-none">
                        <q-card
                            v-if="filter.DOMAIN[findType(findItem(getTransactions().DOMAIN, item).txn.type)]"
                            clickable
                            class="DomainContainer q-ma-xs"
                            style="width: 400px"
                        >
                            <type-router
                                :item="findItem(getTransactions().DOMAIN, item)"
                                :type="findType(findItem(getTransactions().DOMAIN, item).txn.type)"
                                v-on:openDialog="openDialog"
                            ></type-router>
                        </q-card>
                    </div>
                    <div v-if="listHasItems('DomainContainer')">No items.</div>
                    <template v-slot:loading>
                        <div class="row justify-center q-my-md">
                            <q-spinner-dots color="primary" size="40px" />
                        </div>
                    </template>
                </q-infinite-scroll>
            </q-list>
            <q-list borderd separator class="column">
                <tip-filter :filter="filter" ledger="CONFIG" :getFilterChipColor="getFilterChipColor"></tip-filter>
                <div v-for="(item, index) in dedupe(getTransactions().CONFIG)" :key="index" class="q-ma-none">
                    <q-card
                        v-if="filter.CONFIG[findType(findItem(getTransactions().CONFIG, item).txn.type)]"
                        clickable
                        class="ConfigContainer q-ma-xs"
                        style="width: 400px"
                    >
                        <type-router
                            :item="findItem(getTransactions().CONFIG, item)"
                            :type="findType(findItem(getTransactions().CONFIG, item).txn.type)"
                            v-on:openDialog="openDialog"
                            :filter="filter"
                        ></type-router>
                    </q-card>
                </div>
                <div v-if="listHasItems('ConfigContainer')">No items.</div>
            </q-list>
            <q-list borderd separator class="column">
                <tip-filter :filter="filter" ledger="POOL" :getFilterChipColor="getFilterChipColor"></tip-filter>
                <div v-for="(item, index) in dedupe(getTransactions().POOL)" :key="index" class="q-ma-none">
                    <q-card
                        v-if="filter.POOL[findType(findItem(getTransactions().POOL, item).txn.type)]"
                        :key="index"
                        class="PoolContainer q-ma-xs"
                        style="width: 400px"
                    >
                        <type-router
                            :item="findItem(getTransactions().POOL, item)"
                            :type="findType(findItem(getTransactions().POOL, item).txn.type)"
                            v-on:openDialog="openDialog"
                            :filter="filter"
                        ></type-router>
                    </q-card>
                </div>
                <div v-if="listHasItems('PoolContainer')">No items.</div>
            </q-list>
        </div>
    </q-page>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import { mapState, mapGetters } from 'vuex';
import TypeRouter from '../components/TypeRouter.vue';
import TipFilter from '../components/Filters.vue';

const types = {
    '0': 'NODE',
    '1': 'NYM',
    '4': 'TXN_AUTHOR_AGREEMENT',
    '5': 'TXN_AUTHOR_AGREEMENT_AML',
    '100': 'ATTRIB',
    '101': 'SCHEMA',
    '102': 'CRED_DEF',
    // '109': 'POOL_UPGRADE',
    // '110': 'NODE_UPGRADE',
    // '111': 'POOL_CONFIG',
    // '3': 'GET_TXN',
    // '104': 'GET_ATTR',
    // '105': 'GET_NYM',
    // '107': 'GET_SCHEMA',
    // '108': 'GET_CRED_DEF',
};

const generateFilters = function() {
    const r = {};
    for (const prop of Object.values(types)) {
        r[prop] = true;
    }
    return r;
};

export default {
    data() {
        return {
            dialog: false,
            types: types,
            filter: {
                DOMAIN: {
                    NYM: true,
                    CRED_DEF: true,
                    SCHEMA: true,
                    ATTRIB: true,
                },
                CONFIG: {
                    TXN_AUTHOR_AGREEMENT: true,
                    TXN_AUTHOR_AGREEMENT_AML: true,
                },
                POOL: {
                    NODE: true,
                },
            },
            txnData: {},
        };
    },
    components: {
        TipFilter,
        VueJsonPretty,
        TypeRouter,
    },
    computed: {
        ...mapState('transactions', ['txns']),
    },
    methods: {
        ...mapGetters('transactions', ['getTransactions']),
        onload: async function(index, done) {
            await this.$store.dispatch('transactions/getPage', {
                page: index,
                done,
            });
        },
        dedupe: txns => {
            return Array.from(new Set(txns.map(tx => tx.txnMetadata.seqNo))).sort((a, b) => b - a);
        },
        findItem: (txns, seqNo) => {
            return Array.from(txns).find(tx => tx.txnMetadata.seqNo == seqNo);
        },
        findType: type => {
            return types[type];
        },
        openDialog: function(item) {
            this.txnData = item;
            this.dialog = true;
        },
        listHasItems: function(id) {
            return false;
        },
        getFilterChipColor: function(type) {
            switch (type) {
                case 'CRED_DEF':
                    return 'green-2';
                case 'ATTRIB':
                    return 'orange-2';
                case 'TXN_AUTHOR_AGREEMENT':
                    return 'brown-2';
                case 'TXN_AUTHOR_AGREEMENT_AML':
                    return 'indigo-2';
                case 'NYM':
                    return 'teal-2';
                case 'SCHEMA':
                    return 'yellow-2';
                case 'NODE':
                    return 'light-grey';
                default:
                    return 'grey';
            }
        },
    },
    created: function() {
        const $vm = this;
        Object.values(types).map(x => ($vm.filter[x] = true));
    },
    mounted: function() {
        this.$store.dispatch('transactions/connect');
    },
    name: 'PageIndex',
};
</script>
