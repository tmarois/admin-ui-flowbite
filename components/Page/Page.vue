<template>
    <div class="page">
        <div ref="pagebody" 
            id="pagebody"
            class="w-full h-full"
            :class="{
                'overflow-hidden' : props.disableScroll,
                'overflow-y-auto page-body-h' : !props.disableScroll
            }"
            :style="heightStyle"
        >
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    disableScroll: {
        type: Boolean,
        default: false
    },
    heightOffset: {
        type: String,
        default: '52px'
    },
});

const pageTop = usePageTop()
const pagebody = ref(null)

onBeforeUnmount(() => {
    pageTop.value=true
});

const heightStyle = computed(() => {
    return `height: calc(100vh - ${props.heightOffset});`;
});

onMounted(() => {
    pageTop.value=true
    pagebody.value.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
	if(pagebody.value.scrollTop > 1) {
		if(pageTop.value) pageTop.value = false;
	} else {
		if(!pageTop.value) pageTop.value = true;
	}
}
</script>
