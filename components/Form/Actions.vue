<template>
    <div class="flex items-center space-x-2">
        <div class="flex items-center space-x-2 grow">
            <ElementButton 
                @click.prevent="emit('submit')" 
                :loading="props.loading" 
                :disabled="props.loading || !changed"
            >{{ props.submitButton }}</ElementButton>
            <ElementButton 
                v-if="props.enableCancel"
                ghost
                @click.prevent="emit('cancel')"
            >{{ props.cancelButton }}</ElementButton>
        </div>
        <div v-if="props.enableReset">
            <ElementButton 
                ghost
                circle
                @click.prevent="reset" 
                :disabled="props.loading || !canReset"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
            </ElementButton>
        </div>
    </div>
</template>

<script setup>
const changed = ref(false)
const emit = defineEmits(['submit','cancel','changed','reset'])
const props  = defineProps({
    enableReset: {
        type: Boolean,
        default: false
    },
    enableCancel: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    watchState: {
        type: Object,
        default: null
    },
    submitButton: {
        type: String,
        default: 'SAVE'
    },
    cancelButton: {
        type: String,
        default: 'CANCEL'
    }
});

const canReset = computed(() => changed.value===true && props.watchState?.original);

const change = (v) => {
    changed.value = (v === true)
    emit('changed', changed.value)
}

const reset = () => {
    emit('reset', props.watchState?.original)
}

// This is so we can watch to see if our original data gets changed
// if so, we trigger an emit so that we can handle the change
if (props.watchState !== null) {
    watch(props.watchState, (newValue) => {
        change(hasObjectChanged(JSON.parse(JSON.stringify(props.watchState?.original)), JSON.parse(JSON.stringify(newValue?.current))))
    }, { deep: true });
}
else {
    changed.value = true
}
</script>