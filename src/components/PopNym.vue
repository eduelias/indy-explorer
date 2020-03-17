<template>
    <div v-if="!computedItem">Loading ...</div>
    <component dark :is="nym" v-else :item="computedItem"></component>
</template>

<script>
export default {
    name: 'popup-nym',
    data() {
        return {
            nym: () => import('./transactions/Nym.vue'),
            item: false,
        };
    },
    props: {
        fromAddress: String,
    },
    methods: {
        getNym: function(from) {
            console.log(from);
            return (
                this.$store.state.transactions.txns.DOMAIN.find(
                    tx => tx.txn && tx.txn.data && tx.txn.data.dest && tx.txn.data.dest.indexOf(from) > 0
                ) || from
            );
        },
    },
    computed: {
        computedItem: function() {
            return this.item;
        },
    },
    mounted() {
        const hereItem = this.$store.state.transactions.txns.DOMAIN.find(
            tx =>
                tx.txn &&
                tx.txn.data &&
                tx.txn.data.dest &&
                (tx.txn.data.dest.indexOf(this.fromAddress) > 0 ||
                    tx.txn.data.dest.slice(0, 6) === this.fromAddress.slice(0, 6))
        );

        if (hereItem) this.item = hereItem;
    },
};
</script>
