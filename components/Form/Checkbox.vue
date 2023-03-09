<template>
	<div class="relative flex items-center">
        <div 
        v-if="props.switch && props.falseLabel"
			class="pr-3 text-sm" 
		>
			<FormLabel 
				@click.native="switchState('before')"
				:classes="{
                    'cursor-pointer': true,
                    '!text-gray-400': isChecked,
                    '!cursor-not-allowed': isChecked && props.disabled
                }"
			>
				{{ props.falseLabel }}
			</FormLabel>
		</div>
        <div 
            v-if="!props.switch || (!props.disabled && props.switch)" 
            class="relative cursor-pointer flex items-center" 
            @click="clickHandler"
        >
            <input 
                :id="id"
                :type="props.radio ? 'radio' : 'checkbox'" 
                :class="props.switch ? 'sr-only' : `h-4 w-4 ${props.disabled ? 'cursor-default' : 'cursor-pointer'} z-10`" 
                :checked="isChecked"
                :value="props.modelValue"
                :disabled="props.disabled"
                @change="onChange($event)" 
            />
            <div v-if="props.switch">
                <div :class="`${props.inset ? 'w-12' : 'w-10'} ${props.inset ? 'h-6' : 'h-4'} ${isChecked ? `bg-blue-600` : 'bg-gray-400'} rounded-full shadow-inner`" id="switch-background" />
                <div :class="`absolute w-6 h-6 bg-white border-2 ${isChecked ? `border-blue-600 translate-x-full` : 'translate-x-0 border-gray-400'} rounded-full ${props.inset ? 'left-0 top-0' : '-left-1 -top-1'} transition`" id="switch-dot" />
            </div>
        </div>
        <div v-else class="relative cursor-not-allowed">
			<div :class="`${props.inset ? 'w-12' : 'w-10'} ${props.inset ? 'h-6' : 'h-4'} ${isChecked ? `bg-blue-200` : 'bg-gray-100'} rounded-full shadow-inner`" />
			<div :class="`absolute w-6 h-6 bg-white border-2 ${isChecked ? `border-blue-200 translate-x-full` : 'translate-x-0'} rounded-full ${props.inset ? 'left-0 top-0' : '-left-1 -top-1'} transition`" /> 
		</div>
		<div v-if="props.label" class="pl-3 text-sm" @click.native="switchState('after')">
			<FormLabel 
                :id="props.switch ? null : id" 
                :required="required"
                :classes="{
                    'cursor-pointer': true,
                    '!text-blue-600': isChecked && props.switch && props.falseLabel,
                    '!text-gray-400': !isChecked && props.switch && props.falseLabel,
                    '!cursor-not-allowed': props.disabled
                }"
            >{{ props.label }}</FormLabel>
		</div>
	</div>
</template>

<style scoped>
input:checked + div div {
  display: block;
}
</style>

<script setup>
const slots = useSlots();
const props = defineProps({
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: null
    },
    modelValue: {
        type: [String, Boolean],
        default: null
    },
    value: {
        type: [String, Boolean],
        default: null
    },
    trueValue: {
        type: [String, Boolean],
        default: true
    },
    falseValue: {
        type: [String, Boolean],
        default: false
    },
    falseLabel: {
        type: [String,Boolean],
        default: false
    },
    radio: {
        type: Boolean,
        default: false
    },
    switch: {
        type: Boolean,
        default: false
    },
    inset: {
        type: Boolean,
        default: false
    },
});

const emit = defineEmits(['update:modelValue', 'change']);

const id = uniqueId();

const valueComparator = (a, b) => a === b
const onChange = (e) => {
    const value = props.modelValue;
    let input = internalValue;
    input = valueComparator(value, props.trueValue) ? props.falseValue : props.trueValue;
    internalValue.value = input;
    emit('change', e);
}

const clickHandler = (e) => {
    if (props.switch) {
        e.preventDefault()
        switchState('toggle')
    }
}

const switchState = (side) => {
    if(!props.disabled && props.switch) {
        if(side === 'after' && props.falseLabel) {
            internalValue.value = props.trueValue;
        }
        else if(side === 'before' && props.falseLabel) {
            internalValue.value = props.falseValue;
        }
        else {
            internalValue.value = valueComparator(props.modelValue, props.trueValue) ? props.falseValue : props.trueValue
        }
    }
};

const internalValue = computed({
    get: () => {
        return props.modelValue
    },
    set: (v) => {
        emit('update:modelValue', v);
    }
});

const isChecked = computed(() => valueComparator(props.modelValue || props.value, props.trueValue) ? true : false)

// onMounted(() => {
//     if (props.value) {
//         internalValue.value = props.value
//     }
// })

</script> 
