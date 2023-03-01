<template>
    <label 
        :for="props.id"
        :class="labelClasses"
    >
        <span v-if="slots?.icon" class="mr-1">
            <slot name="icon" />
        </span>
        <slot>
            <span v-if="props.title">{{ props.title }}</span>
        </slot>
        <span v-if="props.required" class="text-red-500">*</span>
    </label>
</template>

<script setup>
const slots = useSlots()
const props = defineProps({
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    errors: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: null
    },
    id: {
        type: String,
        default: null
    },
    classes: {
        type: Object,
        default: () => {}
    },
});

const labelClasses = computed(() => {
    return {
        'cursor-default' : props.disabled,
        'cursor-pointer' : !props.disabled,
        'block text-sm font-medium transition-colors duration-150 flex': true,
        'text-red-600': props.errors,
        'text-gray-800': !props.errors,
        ...props.classes
    }
});
</script> 