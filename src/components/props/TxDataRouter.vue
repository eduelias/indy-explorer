<template>
    <div class="bg-grey-4">
        <q-separator />
        <nym v-if="item.type == '1'" :item="item"></nym>
        <vue-json-pretty
            class="bg-white"
            v-else-if="item.type == '100'"
            :data="JSON.parse(item.data.raw)"
        ></vue-json-pretty>
        <cred-def v-else-if="item.type == '102'" :item="item"></cred-def>
        <schema v-else-if="item.type == '101'" :item="item"></schema>
        <aml v-else-if="item.type == '5'" :item="item"></aml>
        <taa v-else-if="item.type == '4'" :item="item"></taa>
        <vue-json-pretty v-else :data="item"></vue-json-pretty>
    </div>
</template>

<script>
import Nym from '../dataprops/NymData.vue';
import CredDef from '../dataprops/CredDefData.vue';
import Schema from '../dataprops/SchemaData.vue';
import Aml from '../dataprops/AmlData.vue';
import Taa from '../dataprops/TaaData.vue';
import VueJsonPretty from 'vue-json-pretty';

export default {
    components: {
        Nym,
        CredDef,
        Schema,
        Aml,
        Taa,
        VueJsonPretty,
    },
    props: {
        item: Object,
        type: String,
    },
    methods: {
        openDialog: function(data) {
            this.$emit('openDialog', data);
        },
    },
};
</script>
