<template>
    <div class="flex flex-col w-full">
        <div v-if="props.detachedHeader && (props.title || slots.header || slots.actions)" :class="`flex ${removePadding ? '' : 'p-2'}`">
            <div class="grow">
                <div v-if="!slots.header">
                    <h1 class="font-medium">{{ props.title }}</h1>
                    <div class="font-normal text-sm text-gray-600">{{ subtitle  }}</div>
                </div>
                <slot v-else name="header" />
            </div>
            <div v-if="slots.actions">
                <slot name="actions" />
            </div>
        </div>
        <div class="flex flex-col rounded shadow border border-gray-200 w-full">
            <div v-if="!props.detachedHeader && (props.title || slots.header || slots.actions)" :class="`flex ${removePadding ? '' : 'p-4'} border-b border-gray-200 bg-white`">
                <div class="grow">
                    <div v-if="!slots.header">
                        <h1 class="font-medium">{{ props.title }}</h1>
                        <div class="font-normal text-sm text-gray-600">{{ subtitle  }}</div>
                    </div>
                    <slot v-else name="header" />
                </div>
                <div v-if="slots.actions">
                    <slot name="actions" />
                </div>
            </div>
            <ElementProgressBar v-if="props.loading" class="absolute -mt-1" />
            <div :class="`bg-white grow ${(removePadding || removeBodyPadding) ? '' : 'p-4'}`">
                <slot />
            </div>
            <div v-if="slots.footer" :class="`${removePadding || removeFooterPadding ? '' : 'p-4'} border-t border-gray-300 bg-white`">
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
});
</script>