<template>
    <label 
        :for="props.id"
        :class="labelClasses"
        class="flex items-center select-none"
    >
        <span v-if="slots?.icon" class="mr-1">
            <slot name="icon" />
        </span>
        <slot>
            <span v-if="props.title">{{ props.title }}</span>
        </slot>
        <span v-if="props.required" class="text-red-500">*</span>
        <span v-if="props.tooltip" :data-tooltip-target="`tooltip-${props.id}`" data-tooltip-placement="top" class="text-blue-600 cursor-pointer ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>
        </span>
        <ElementTooltip v-if="props.tooltip" :id="`tooltip-${props.id}`" >{{ tooltip }}</ElementTooltip>
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
    tooltip: {
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