<template>
	<div :class="_classes.root">
        <div 
            v-if="props.switch && props.falseLabel"
            :class="_classes.labelFalseWrapper"
		>
			<FormLabel 
				@click.native="switchState('before')"
                :disabled="props.disabled"
				:classes="{
                    'cursor-pointer': true,
                    [_classes.switchFalseLabelColorChecked]: isChecked,
                }"
			>
				{{ props.falseLabel }}
			</FormLabel>
		</div>
        <div 
            v-if="!props.switch || (!props.disabled && props.switch)" 
            :class="_classes.inputWrapper" 
            @click="clickHandler"
        >
            <input 
                :id="id"
                :type="props.radio ? 'radio' : 'checkbox'" 
                :class="props.switch ? 'sr-only' : {
                    [_classes.inputCheck]: !props.radio, 
                    [_classes.inputRadio]: props.radio, 
                    [_classes.inputDisabled]: props.disabled
                }" 
                :checked="isChecked"
                :value="props.modelValue"
                :disabled="props.disabled"
                @change="onChange($event)" 
            />
            <div v-if="props.switch">
                <div :class="`${props.inset ? 'w-12' : 'w-10'} ${props.inset ? 'h-6' : 'h-4'} ${isChecked ? _classes.switchColorChecked : _classes.switchColor} rounded-full shadow-inner`" id="switch-background" />
                <div :class="`absolute w-6 h-6 bg-white border-2 ${isChecked ? `${_classes.switchColorBorderChecked} translate-x-full` : `${_classes.switchColorBorder} translate-x-0`} rounded-full ${props.inset ? 'left-0 top-0' : '-left-1 -top-1'} transition`" />
            </div>
        </div>
        <div v-else class="relative cursor-not-allowed">
			<div :class="`${props.inset ? 'w-12' : 'w-10'} ${props.inset ? 'h-6' : 'h-4'} ${isChecked ? _classes.switchDisabledColorChecked : _classes.switchDisabledColor } rounded-full shadow-inner`" />
			<div :class="`absolute w-6 h-6 bg-white border-2 ${isChecked ? `${_classes.switchDisabledColorBorderChecked} translate-x-full` : 'translate-x-0'} rounded-full ${props.inset ? 'left-0 top-0' : '-left-1 -top-1'} transition`" /> 
		</div>
		<div 
            v-if="props.label" 
            :class="_classes.labelWrapper"
            @click.native="switchState('after')"
        >
			<FormLabel 
                :id="props.switch ? null : id" 
                :required="required"
                :disabled="props.disabled"
                :classes="{
                    'cursor-pointer': true,
                    [_classes.switchTrueLabelColorChecked]: isChecked && props.switch && props.falseLabel,
                    [_classes.switchTrueLabelColor]: !isChecked && props.switch && props.falseLabel,
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
    variant: {
        type: String,
        default: null
    },
});

const variantClasses = getVariantClass('FormCheckbox', props.variant)
const _classes = computed(() => {
    return {
        ...variantClasses
    }
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

const isChecked = computed(() => valueComparator(props.modelValue || props.value, props.trueValue) ? true : false);
</script> 
