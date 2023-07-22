<template>
    <div 
        :id="props.id" 
        role="tooltip" 
        class="tooltip"
        :class="[classes.base, classes.theme]"
    >
        <slot />
        <div v-if="!props.hideArrow" class="tooltip-arrow" data-popper-arrow></div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        default: null
    },
    hideArrow: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String,
        default: null
    }
});

const variantClasses = getVariantClass('ElementTooltip', props.variant)
const classes = computed(() => {
    return {
        ...variantClasses
    }
});

</script>