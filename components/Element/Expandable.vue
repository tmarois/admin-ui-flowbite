<template>
    <div class="relative">
        <div 
            v-if="props.title" 
            class="flex items-center justify-between p-2 bg-gray-100 cursor-pointer rounded hover:border-gray-400 border-gray-200 border select-none"
            :class="{'rounded-b-none': status}"
            @click="toggle"
        >
            <div 
                class="text-gray-800 text-sm" 
            
            >{{ props.title }}</div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transition-transform duration-300 transform" :class="{'rotate-180': status}"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>
            </div>
        </div>
        <transition name="slide">
            <div 
                v-show="status"
                class="relative bg-white border-gray-200 border rounded-b p-2 border-t-0 shadow-sm">
                <slot />
            </div>
        </transition>
    </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all .15s cubic-bezier(.25,.8,.25,1);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0%);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-5%);
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>

<script setup>
const props = defineProps({
   title: {
      type: String,
      default: null
   }
});
const status = ref(false);
const toggle = () => {
    status.value = !status.value;
};
</script>