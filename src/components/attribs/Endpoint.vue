<template>
    <a :class="!item[Object.keys(item)[0]] ? `text-strike` : ``" :href="item[Object.keys(item)[0]]" target="_blank">{{
        Object.keys(item)[0]
    }}</a>
</template>

<script>
export default {
    props: {
        item: Object,
    },
};
</script>
