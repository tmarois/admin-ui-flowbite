<template>
    <div :class="`relative inline-flex items-center justify-center h-${size} w-${size} overflow-hidden bg-${color}-700 ${square ? 'rounded' : 'rounded-full'}`">
        <span class="font-medium text-white"><slot>{{ text }}</slot></span>
    </div>
</template>

<script setup>
const props = defineProps({
    size: {
        type: [String, Number],
        default: 8
    },
    color: {
        type: String,
        default: 'blue'
    },
    text: {
        type: String,
        default: null
    },
    square: {
        type: Boolean,
        default: false
    }
});
</script>