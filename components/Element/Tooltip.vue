<template>
    <div 
        :id="`${id}`" 
        role="tooltip" 
        class="absolute z-10 invisible inline-block px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded shadow-sm opacity-0 tooltip transition-opacity duration-300 max-w-[250px]"
    >
        <slot />
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
</template>

<script setup>
import { initTooltips } from 'flowbite'
const props = defineProps({
   id: {
      type: String,
      default: null
   },
});

onMounted(() => {
    nextTick(() => {
        initTooltips()
    })
});
</script>