<template>
    <div class="flex flex-col w-full">
        <div v-if="props.detachedHeader && (props.title || slots.header || slots.actions)" :class="`flex items-center ${props.removePadding ? '' : 'p-2'}`">
            <div class="grow">
                <div v-if="!slots.header">
                    <h1 class="font-medium">{{ props.title }}</h1>
                    <div class="font-normal text-sm text-gray-600">{{ props.subtitle  }}</div>
                </div>
                <slot v-else name="header" />
            </div>
            <div v-if="slots.actions" class="flex items-center">
                <slot name="actions" />
            </div>
        </div>
        <div class="flex flex-col w-full" :class="{ 'rounded shadow border border-gray-200' : !props.removeStyle}">
            <div 
                v-if="!props.detachedHeader && (props.title || slots.header || slots.actions)" 
                :class="`flex items-center ${props.removePadding ? '' : 'p-4'} ${!props.removeStyle ? 'bg-white' : ''} border-b border-gray-200`"
            >
                <div class="grow">
                    <div v-if="!slots.header">
                        <h1 class="font-medium">{{ props.title }}</h1>
                        <div class="font-normal text-sm text-gray-600">{{ props.subtitle  }}</div>
                    </div>
                    <slot v-else name="header" />
                </div>
                <div v-if="slots.actions" class="flex items-center">
                    <slot name="actions" />
                </div>
            </div>
            <ElementProgressBar v-if="props.loading" class="absolute -mt-1" />
            <div :class="`${!props.removeStyle ? 'bg-white' : ''} grow ${(props.removePadding || props.removeBodyPadding) ? '' : 'p-4'}`">
                <slot />
            </div>
            <div v-if="slots.footer" :class="`${props.removePadding || props.removeFooterPadding ? '' : 'p-4'} border-t border-gray-300 ${!props.removeStyle ? 'bg-white' : ''}`">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script setup>
const slots = useSlots()
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    detachedHeader: {
        type: Boolean,
        default: false
    },
    removePadding: {
        type: Boolean,
        default: false
    },
    removeBodyPadding: {
        type: Boolean,
        default: false
    },
    removeFooterPadding: {
        type: Boolean,
        default: false
    },
    removeStyle: {
        type: Boolean,
        default: false
    },
});
</script>