<template>
    <div class="page-body bg-body h-full w-full" :class="{'p-4' : !props.disablePadding}">
        <div class="flex justify-center w-full">
            <div class="w-full" :class="{'max-w-screen-2xl' : !props.disableMaxWidth}">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    disablePadding: {
        type: Boolean,
        default: false
    },
    disableMaxWidth: {
        type: Boolean,
        default: false
    },
});
</script>