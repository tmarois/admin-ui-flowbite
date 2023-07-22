<template>
    <div :class="_classes.base">
        <div :class="[_classes.baseContent, _classes.themeContent, {'hover:z-10 cursor-pointer': props.hover}]">
            <div :class="_classes.content">
                <slot>{{ props.text }}</slot>
            </div>
            <span v-if="props.status" :class="_classes.statusDot"></span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        default: null
    },
    variant: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    hover: {
        type: Boolean,
        default: false
    }
});

const variantClasses = getVariantClass('ElementAvatar', props.variant)
const _classes = computed(() => {
    return {
        ...variantClasses
    }
});
</script>