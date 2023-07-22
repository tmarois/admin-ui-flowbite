<template>
    <label 
        :for="props.id"
        :class="{
            [_classes.base]: true,
            [_classes.theme]: true,
            [_classes.disabled]: props.disabled,
            [_classes.errors]: props.errors,
            ...props.classes,
        }"
    >
        <span v-if="slots?.icon" class="mr-1">
            <slot name="icon" />
        </span>
        <slot>
            <span 
                v-if="props.title"
            >{{ props.title }}</span>
        </slot>
        <span 
            v-if="props.required" 
            class="text-red-500"
        >*</span>
        <span 
            v-if="props.tooltip || slots['tooltip-content']" 
            :data-tooltip-target="`tooltip-${tooltipId}`" 
            :data-tooltip-placement="props.tooltipPosition" 
            :class="[_classes.icon, 'ml-1 cursor-pointer']"
        >
            <slot name="tooltip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" :class="`w-${tooltipIconSize} h-${tooltipIconSize}`"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>
            </slot>
        </span>
        <ElementTooltip 
            v-if="props.tooltip || slots['tooltip-content']" 
            :id="`tooltip-${tooltipId}`" 
            :variant="props.variantTooltip"
            :hideArrow="tooltipHideArrow"
        >
            <slot name="tooltip-content">{{ tooltip }}</slot>
        </ElementTooltip>
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
    tooltipPosition: {
        type: String,
        default: 'top'
    },
    tooltipIconSize: {
        type: Number,
        default: 4
    },
    tooltipHideArrow: {
        type: Boolean,
        default: false
    },
    variant: {
        type: String,
        default: null
    },
    variantTooltip: {
        type: String,
        default: null
    },
    classes: {
        type: Object,
        default: () => {}
    }
});

let tooltipId = ref(uniqueId())
const variantClasses = getVariantClass('FormLabel', props.variant)
const _classes = computed(() => {
    return {
        ...variantClasses
    }
});

onMounted(() => {
    if (props.tooltip) {
        tooltipId.value = uniqueId()
    }
});
</script> 