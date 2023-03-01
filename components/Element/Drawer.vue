<template>
   <div 
      :id="`drawer-${props.id}`" 
      class="fixed top-0 right-0 z-50 h-screen overflow-y-auto transition-transform translate-x-full bg-white max-w-4xl w-full" 
      tabindex="-1" 
      :aria-labelledby="`drawer-${props.id}`"
   >
      <div class="w-full p-0 overflow-hidden" :style="`height: calc(100vh - 0px);`">
         <slot 
            v-if="instanceKey" 
            :key="instanceKey">
         </slot>
      </div>
   </div>
</template>

<script setup>
import { Drawer } from 'flowbite'

const props = defineProps({
   id: {
      type: String,
      default: null
   },
   placement: {
      type: String,
      default: 'right'
   }
});

const instanceKey = computed(() => getInstance(props.id)?.key)

onMounted(() => {
   addInstance(props.id, uniqueId(), new Drawer(document.getElementById(`drawer-${props.id}`), {
      placement: props.placement,
      bodyScrolling: false,
      backdrop: true,
      backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40 hover:cursor-pointer',
      onHide: (i) => {
         // let instance = getInstance(props.id)
         // instance.key = uniqueId()
      },
      onShow: (i) => {
         let instance = getInstance(props.id)
         instance.key = uniqueId()
      }
   }));
});

onUnmounted(() => {
   removeInstance(props.id)
});
</script>