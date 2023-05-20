<template>
    <span 
        class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
        :class="{
            'rounded-full' : rounded,
            'rounded' : !rounded
        }"
    >{{ props.title }}</span>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: null
    },
    rounded: {
        type: Boolean,
        default: false
    }
});
</script>