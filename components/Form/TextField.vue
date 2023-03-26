<template>
    <div class="relative w-full">
        <FormLabel 
            v-if="props.label"
            :id="id"
            :title="props.label"
            :required="props.required"
            :error="props.errors"
            :tooltip="props.tooltip"
        />
        <div class="flex" :class="{'mt-1': props.label}">
            <div v-if="slots?.prepend" class="inline-flex items-center px-3 text-sm text-gray-800 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md">
                <slot name="prepend" />
            </div>
            <div class="grow relative text-gray-500">
                <div v-if="slots?.icon" class="pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center">
                    <slot name="icon" />
                </div>
                <component 
                    ref="inputTag"
                    :is="tag"
                    :id="id"
                    :type="inputType"
                    :name="`${props.name}-${id}`"
                    :placeholder="props.placeholder"
                    :readonly="props.readonly"
                    :disabled="props.disabled"
                    :required="props.required"
                    :maxlength="props.maxlength"
                    :autocomplete="`new-${id}`"
                    :autofill="`new-${id}`"
                    :pattern="props.pattern"
                    :value="internalValue"
                    @input="input($event)"
                    @keyup="keyup($event)"
                    @keydown="keydown($event)"
                    @focusout="focusout($event)"
                    @focus="focusin($event)"
                    @blur="blur($event)"
                    :min="props.min"
                    :max="props.max"
                    :step="props.step"
                    :class="inputClasses"
                    :style="(width ? `width: ${width}px;` : '')+customStyle"
                />
                <div 
                    v-if="props.clearable && internalValue && !props.readonly && !props.disabled && props.type!=='area'"
                    class="cursor-pointer absolute inset-y-0 right-0 p-2 flex items-center"
                    @click="clearField"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                </div>
            </div>
        </div>
        <div v-if="props.characterCounter" class="absolute text-right text-[11px] text-gray-600 right-0.5 -bottom-[18px]">
            {{ (internalValue && internalValue.length) || 0 }}<span v-if="props.maxlength">/{{ props.maxlength }}</span>
        </div>
    </div>
</template>

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
    placeholder: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: 'input'
    },
    type: {
        type: String,
        default: 'text'
    },
    readonly: {
        type: Boolean,
        default: false
    },
    maxlength: {
        type: Number,
        default: null
    },
    modelValue: {
        type: [Number, String],
        default: null
    },
    value: {
        type: [Number, String],
        default: null
    },
    clearable: {
        type: Boolean,
        default: false
    },
    min: {
        type: [String, Number],
        default: null
    },
    max: {
        type: [String, Number],
        default: null
    },
    errors: {
        type: Boolean,
        default: false
    },
    pattern: {
        type: String,
        default: null
    },
    classes: {
        type: String,
        default: null
    },
    width: {
        type: [String, Number],
        default : null
    },
    characterCounter: {
        type: Boolean,
        default: false
    },
    step: {
        type: [String, Number],
        default: null
    },
    customClasses: {
        type: String,
        default: null
    },
    customStyle: {
        type: String,
        default: null
    },
    noresize: {
        type: Boolean,
        default: false
    },
    formatter: {
        type: Function,
        default: null
    },
    selectAll: {
        type: Boolean,
        default: false
    },
    tooltip: {
        type: String,
        default: null
    },
});

const tag = (props.type==='area') ? 'textarea' : 'input';

const inputType = (props.type==='number') ? 'text' : props.type;

const emit = defineEmits(['keyup','keydown','focusin','focusout','blur', 'cleared','update:modelValue','input']);

const id = uniqueId();

const inputTag = ref(null)

const validateValue = (value) => {
    if (value === null || value === undefined || value === '') return null;
    if (props.type === 'number') {
        value = value.toString().replace(/\D/g, '');
        value = Number(value)
        if (props.max && value > props.max) value = props.max;
        if (props.min && value < props.min) value = props.min;
    }
    if (typeof props.formatter === 'function') {
        value = props.formatter(value)
    }
    return value;
};

const input = (e) => {
    // internalValue.value = validateValue(e.target.value);
    // e.target.value = internalValue.value;
};

const keyup = (e) => {
    e.target.value = validateValue(e.target.value);
    internalValue.value = (e.target.value);
    emit('keyup', e);
};

const keydown = (e) => {
    emit('keydown', e);
};

const focusin = (e) => {
    if (props.selectAll && inputTag?.value) {
        inputTag.value.select()
    }
    emit('focusin', e);
};

const focusout = (e) => {
    // internalValue.value = validateValue(e.target.value);
    // e.target.value = internalValue.value;
    emit('focusout', e);
};

const clearField = () => {
    internalValue.value = null;
    emit('cleared');
};

const blur = (e) => {
    internalValue.value = validateValue(e.target.value);
    e.target.value = internalValue.value;
    emit('blur',e)
};

const inputClasses = computed(() => {
    if(!props.customClasses) {
        let c = [`block w-full rounded text-sm focus:outline-none focus:ring-0 border px-2`];
        if (tag === 'input') c = c.concat(['py-2'])
        if (tag === 'textarea') c = c.concat(['py-2'])
        if (props.noresize && props.type === 'area') c = c.concat(['resize-none'])
        if (slots?.prepend) c = c.concat(['rounded-l-none'])
        if (slots?.icon) c = c.concat(['pl-9'])
        if (props.classes) c = c.concat([props.classes])
        if (props.clearable) c = c.concat(['pr-8'])
        if(props.readonly) c = c.concat(['cursor-default'])
        if(props.disabled) c = c.concat(['cursor-default bg-gray-100 border-gray-200 focus:border-gray-200'])
        if(props.errors) c = c.concat(['border-red-500 focus:border-red-500 text-red-500 hover:text-red-800'])
        if (!props.errors && !props.disabled) c = c.concat([`text-gray-800 border-slate-300 hover:bg-slate-50 bg-slate-50 hover:border-slate-400 focus:border-slate-700 hover:text-slate-900`])
        return c;
    }
    else return props.customClasses;
});

const internalValue = computed({
    get: () => {
        return validateValue((props.modelValue!==null) ? props.modelValue : props.value)
    },
    set: (v) => {
        emit('update:modelValue', (v));
    }
});
</script>