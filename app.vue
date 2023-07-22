<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
import { 
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    // initDrawers, 
    initDropdowns, 
    // initModals, 
    initPopovers, 
    initTabs, 
    initTooltips 
} from 'flowbite'

onMounted(() => {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    // initDrawers();
    // initDrawers();
    // initDrawers();
    initDropdowns();
    // initModals();
    initPopovers();
    initTabs();
    initTooltips();
});
</script>