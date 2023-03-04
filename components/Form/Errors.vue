<template>
    <div 
        class="bg-red-50 px-4 pt-4 pb-3 cursor-pointer" 
        :class="{'-m-4 mb-4 -mx-6 border-b border-red-200' : props.placement==='drawer'}"
        @click="expand = !expand"
    >
        <div class="flex items-center">
            <div class="ml-3 basis-full">
                <div class="flex my-1 text-sm font-medium text-red-800">
                    <div class="flex items-center grow">
                        <div class="pr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg></div>
                        <div>Errors ({{ count }})</div>
                    </div>
                    <div><div class="ml-auto" :class="expand===true ? 'rotate-180' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </div></div>
                </div>
                <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
                    <div class="text-sm text-red-700 transition-all duration-100" v-if="expand">
                        <ul role="list" class="list-disc pl-5 space-y-1" v-for="(er, index) in errors" :key="index">
                            <li v-for="(e, i) in er" :key="i"><span v-html="e" /></li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
const expand = ref(false)

const props = defineProps({
    errors: {
        type: Object,
        default: () => {}
    },
    placement: {
        type: String,
        default: 'drawer'
    }
});

const count = computed(() => {
    return !isEmpty(props.errors) ? objectLength(props.errors) : 0
})

const enter = (element) => {
    const width = getComputedStyle(element).width;
    element.style.width = width;
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    element.style.height = 'auto';
    const height = getComputedStyle(element).height;
    element.style.width = null;
    element.style.position = null;
    element.style.visibility = null;
    element.style.height = 0;
    getComputedStyle(element).height;
    requestAnimationFrame(() => {
        element.style.height = height;
    });
}

const afterEnter = (element) => {
    element.style.height = 'auto';
}

const leave = (element) => {
    const height = getComputedStyle(element).height;
    element.style.height = height;
    getComputedStyle(element).height;
    requestAnimationFrame(() => {
        element.style.height = 0;
    });
}

onMounted(()=>{
    setTimeout(()=>{
        expand.value=true
    },150)
});
</script>