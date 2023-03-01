<template>
    <div 
        :id="`modal-${id}`" 
        tabindex="-1" 
        aria-hidden="true" 
        class="fixed top-0 left-0 right-0 z-[60] hidden w-full p-4 overflow-x-hidden overflow-y-auto inset-0 w-auto justify-center items-center flex"
    >
        <div class="pointer-events-none relative h-[calc(100%-1rem)] md:h-[calc(100%-8rem)] w-auto w-full h-full max-w-2xl">
            <div class="pointer-events-auto relative flex max-h-[100%] w-full flex-col overflow-hidden rounded border-none bg-white shadow-lg outline-none animate-fade-in-down"> 
                <div v-if="slots?.header || title" class="border-b rounded-t" :class="{'shadow':!bodytop}">
                    <slot name="header">
                        <div class="flex items-center justify-between p-4">
                            <h3 v-if="title" class="text-xl font-semibold text-gray-900">
                                {{ title }}
                            </h3>
                            <ElementButton ghost @click="close" circle>
                                <template v-slot:icon><svg aria-hidden="true" class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></template>
                            </ElementButton>
                        </div>
                    </slot>
                </div>
                <div ref="bodyscroll" class="p-4 relative overflow-x-hidden overflow-y-auto">
                    <slot />
                </div>
                <div v-if="slots?.footer" class="border-t border-gray-200 rounded-b" :class="{'shadow-top':!bodytop}">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
 </template>
 
 <script setup>
 import { Modal } from 'flowbite'
 const slots = useSlots()
 const props = defineProps({
    id: {
       type: String,
       default: null
    },
    placement: {
       type: String,
       default: 'center'
    },
    title: {
        type: String,
        default: ''
    },
 });
 
const bodytop = ref(true)
const bodyscroll = ref(null)

 const close = () => {
    hideInstance(props.id)
 };

 const handleScroll = () => {
	if(bodyscroll.value.scrollTop > 1) {
		if(bodytop.value) bodytop.value = false;
	} else {
		if(!bodytop.value) bodytop.value = true;
	}
}
 
 onMounted(() => {
    addInstance(props.id, new Modal(document.getElementById(`modal-${props.id}`), {
       placement: props.placement,
       closable: true,
       backdrop: 'static',
       backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-50 backdrop-blur hover:cursor-pointer'
    }));

    bodytop.value=true
    bodyscroll.value.addEventListener('scroll', handleScroll);

 });
 
 onUnmounted(() => {
    removeInstance(props.id)
 });
 
 </script>