<template>
    <div :class="[_classes.base, _classes.theme]">
        <div><slot>{{ props.title }}</slot></div>
        <button 
            v-if="props.enableRemove" 
            type="button" 
            :class="_classes.button"
            @click="remove($event)"
        >
            <slot name="button-icon">
                <svg viewBox="0 0 14 14" :class="_classes.buttonIcon"><path d="M4 4l6 6m0-6l-6 6" /></svg>
                <span class="absolute -inset-1"></span>
            </slot>
        </button>
    </div>
</template>

<script setup>
const emit = defineEmits(['remove'])
const props = defineProps({
    title: {
        type: String,
        default: null
    },
    variant: {
        type: String,
        default: null
    },
    enableRemove: {
        type: Boolean,
        default: false
    }
});

const variantClasses = getVariantClass('ElementBadge', props.variant)
const _classes = computed(() => {
    return {
        ...variantClasses
    }
});

const remove = (event) => {
    emit('remove', event)
}
</script>