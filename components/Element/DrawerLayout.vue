<template>
    <div class="flex flex-col w-full h-full">
        <div class="border-b border-slate-300 z-10" :class="{'!shadow' : !bodytop, 'border-b':props.tabs?.length>0}">
            <div class="flex items-center p-4 px-6 pl-4" :class="{'p-4 pb-2':props.tabs?.length>0}">
                <div class="mr-2">
                    <ElementButton ghost @click="close" circle>
                        <template v-slot:icon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></template>
                    </ElementButton>
                </div>
                <div class="grow">
                    <h1 class="font-medium text-lg">{{ title }}</h1>
                </div>
                <div class="flex items-center space-x-2">
                    <slot name="title-actions" />
                </div>
            </div>
            <div v-if="props.tabs && props.tabs.length>0" class="flex flex-wrap -mb-px">
                <div class="grow pl-2">
                    <ul class="flex flex-wrap -mb-px space-x-4">
                        <li v-for="tab in props.tabs" :key="tab.id">
                        <div 
                            :class="{'tab-active !border-slate-600 !text-slate-600': activeTab==tab.id }"
                            @click="activeTab=tab.id" 
                            style="position: relative;bottom: 1px;" 
                            class="inline-block w-full py-2 px-4 border-b-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-slate-300 hover:cursor-pointer text-center"
                        >{{ tab.title }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div ref="bodyscroll" class="pb-6 grow overflow-hidden overflow-y-auto bg-body h-full">
            <div class="p-6 bg-body flex justify-center">
                <div class="w-full max-w-2xl">
                    <template v-if="tabSlots?.length>0">
                        <slot v-for="tab in tabSlots" :key="tab.id" :name="`tab-${tab.id}`" />
                    </template>
                    <template v-else>
                        <slot />
                    </template>
                </div>
            </div>
        </div>
        <div v-if="slots.actions" class="border-t border-slate-300 p-6 py-4" :class="{'shadow-top':!bodytop}">
            <slot name="actions" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
   id: {
      type: String,
      default: null
   },
   tabs: {
      type: Array,
      default: () => []
   },
   title: {
      type: String,
      default: ''
   },
});

const activeTab = ref(null)
const slots = useSlots()
const bodytop = ref(true)
const bodyscroll = ref(null)

if (props.tabs && props.tabs?.length>0) {
    activeTab.value = props.tabs[0]?.id
}

const tabSlots = computed(() => {
    return activeTab.value ? props.tabs.filter(i => i.id==activeTab.value) : [];
})

const handleScroll = () => {
	if(bodyscroll.value.scrollTop > 1) {
		if(bodytop.value) bodytop.value = false;
	} else {
		if(!bodytop.value) bodytop.value = true;
	}
}

const close = () => {
   hideInstance(props.id)
};

onMounted(() => {
   bodytop.value=true
   bodyscroll.value.addEventListener('scroll', handleScroll);
});
</script>