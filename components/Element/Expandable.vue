<template>
    <div>
        <div 
            v-if="props.title" 
            class="flex items-center justify-between p-2 bg-gray-100 cursor-pointer rounded hover:bg-gray-100 border-gray-200 border"
            :class="{'bg-gray-100 rounded-b-none': status}"
            @click="status = !status"
        >
            <div 
                class="text-blue-800 text-sm" 
            
            >{{ props.title }}</div>
            <div v-if="status===true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" /></svg></div>
            <div v-else><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg></div>
        </div>
        <div :class="{
            'hidden': !status, 
            'border-gray-200 border rounded-b p-2 border-t-0': status}">
            <slot />
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
   title: {
      type: String,
      default: null
   }
});

const status = ref(false);

</script>