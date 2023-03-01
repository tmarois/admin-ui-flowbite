<template>
    <div class="page">
        <div ref="pagebody" 
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

const modal = useModal()
const pageTop = usePageTop()
const pagebody = ref(null)
const removed = ref(false)

onBeforeUnmount(() => {
    pageTop.value=true
});

const heightStyle = computed(() => {
    return `height: calc(100vh - ${props.heightOffset});`;
});

onMounted(() => {
    pageTop.value=true
    pagebody.value.addEventListener('scroll', handleScroll);

    // setTimeout(() => {
    //     console.log('removed!')
    //     removed.value = true
    // },2000)
});

const handleScroll = () => {
	if(pagebody.value.scrollTop > 1) {
		if(pageTop.value) pageTop.value = false;
	} else {
		if(!pageTop.value) pageTop.value = true;
	}
}
</script>
