<template>
    <div class="relative w-full">
        <FormLabel 
            v-if="props.label"
            :id="id"
            :title="props.label"
            :required="props.required"
            :error="props.errors"
        />
        <div class="relative w-full" :class="{'mt-1': props.label}">
            <div ref="root">
                <button
                    type="button"
                    :class="buttonClasses"
                    @keydown.enter.prevent="cycleIndex > -1 ? selectItem(searchableOptions[cycleIndex]) : ''"
                    @keydown.up.prevent="cycleOptions('up')"
                    @keydown.down.prevent="cycleOptions('down')"
                    @keydown.tab="menu = false"
                    @click.self="menuToggle('button')"
                    :tabindex="props.searchable && !props.disabled ? '-1' : '0'"
                >
                    <span
                        v-if="(!props.searchable && selected.length === 0) || (props.searchable && props.disabled && !selected)" 
                        :placeholder="props.placeholder" 
                        class="truncate pl-2 font-medium"
                        @click="menuToggle('label')"
                    >{{ props.placeholder }}</span>

                    <span
                        v-else-if="!searchable && selectPlaceholder" 
                        class="truncate pl-2 font-medium"
                        :class="{
                            'text-gray-500 cursor-not-allowed': props.disabled,
                            'text-slate-900': !props.disabled
                        }"
                        @click="menuToggle('label')"
                    >{{ selectPlaceholder }}</span>

                    <span
                        v-if="clearable && (localsearch || selected.length || selected[props.itemValue] || selected[props.itemValue] === false)"
                        class="cursor-pointer absolute right-6 p-2 flex items-center"
                        @click="clearField"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                    </span>

                    <span 
                        v-if="loading"
                        class="px-2 h-full flex items-center ml-auto"
                    >
                        <ElementLoader size="5" />
                    </span>

                    <span
                        v-else
                        @click="menuToggle('arrow')"
                        class="px-2 h-full flex items-center ml-auto"
                    >
                        <svg v-if="menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" /></svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" /></svg>
                    </span>

                </button>
            </div>
            <ul
                v-show="menu"
                :class="dropdownClasses"
                :style="`${props.maxHeight ? `max-height: ${props.maxHeight}px` : ''}`"
                :id="`dropdown-${id}`"
            >
                <template v-if="computedOptions.length && !props.grouped">
                    <li
                        v-for="(item, i) of searchableOptions"
                        :key="i"
                        class="relative flex items-center transition duration-150"
                        :class="[
                            {'text-white bg-slate-600': (!props.multiple && selected[props.itemValue] === item[props.itemValue]) },
                            { 'focused': equalsSearch(item[itemValue]) },
                            item.disabled ? 'text-gray-300' : 'cursor-pointer hover:bg-blue-600 hover:text-white'
                        ]"
                        @click.stop="item.disabled ? '' : selectItem(item)"
                    >
                        <FormCheckbox
                            v-if="props.multiple"
                            :value="isChecked(item)"
                            :disabled="item.disabled"
                            class="ml-2"
                        />
                        <slot name="option" :option="item">
                            <div
                                class="font-normal p-2"
                                v-html="item[props.itemLabel]"
                            />
                        </slot>
                    </li>
                </template>
                <li v-else class="flex items-center justify-between rounded p-4 font-medium">
                    {{ nodata }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['change','update:modelValue','input']);
const slots = useSlots();
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    searchable: {
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
        default: null
    },
    readonly: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [Number, String, Object, Array],
        default: null
    },
    errors: {
        type: Boolean,
        default: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array,
        default: () => []
    },
    itemValue: {
        type: String,
        default: 'value'
    },
    itemLabel: {
        type: String,
        default: 'label'
    },
    grouped: {
        type: Boolean,
        default: false
    },
    maxHeight: {
        type: [String, Number],
        default: null
    },
    direction: {
        type: String,
        default: 'bottom'
    },
    useExternal: {
        type: Boolean,
        default: false
    },
    returnObject: {
        type: Boolean,
        default: false
    },
    clearable: {
        type: Boolean,
        required: false,
        default: false
    },
    nodata: {
        type: String,
        default: 'No Results Found'
    },
});

const root = ref(null);
const id = uniqueId()
const menu = ref(false)
const cycleIndex = ref(-1)
const viewportIni = ref([])
const selected = ref([])
const selectedIndex = ref(-1)
const localsearch = ref(null)
const isSearching = ref(false)

const dropdownDirection = computed(() => {
    if(viewportIni.value.includes('bottom')) return 'top';
    if(viewportIni.value.includes('top')) return 'bottom';
    return props.direction
})

const buttonClasses = computed(() => {
    let c = [
        'flex justify-start items-center border text-sm font-medium w-full py-2 focus:outline-none'
    ];
    if (!props.disabled) c = c.concat(['text-gray-800 border-slate-300 hover:bg-slate-50 bg-slate-50 hover:border-slate-400 focus:border-slate-700 hover:text-slate-900 group']);
    if (props.disabled) c = c.concat(['bg-gray-100 cursor-not-allowed']);
    if (!menu.value) c = c.concat(['rounded']);
    if (menu.value) c = c.concat(['rounded-t']);
    return c;
});

const dropdownClasses = computed(() => {
    let c = [
        `absolute w-full overflow-y-auto text-sm rounded rounded-t-none shadow-lg text-gray-500 bg-white focus:outline-none border border-gray-200 z-10`
    ];
    if(!props.maxHeight) c = c.concat(['max-h-80']);
    // if(this.$slots.opener) c = c.concat(['min-w-[200px]']);
    if (dropdownDirection === 'top') {
        c = c.concat(['bottom-10']);
    }
    else {
        // c = c.concat(['mt-[-1px]']);
    }
    return c;
});

const isChecked = (item) => {
    if(selected.value.some((obj) => obj[props.itemValue] === item[props.itemValue])) return true;
    return false;
};

const computedOptions = computed(() => {
    if(props.options.length && (!props.options[0][props.itemValue] && props.options[0][props.itemValue] !== false) && !props.grouped) {
        return props.options.map((key) => {
            return {
                label: key,
                value: key
            }
        })
    } 
    else if(props.grouped) {
        let returnItems = [];
        for(const group of props.options) {
            returnItems.push(...group.items);
        }
        return returnItems;
    }
    else return props.options.filter((x) => !x.hide);
});

const searchableOptions = computed(() => {
    if (localsearch && props.searchable && isSearching && !props.useExternal) {
        const filteredOptions = JSON.parse(JSON.stringify(computedOptions.value)).filter((option) => {
            let o = String(option[props.itemLabel]).toLowerCase().match(localsearch.toLowerCase().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
            if (o) {
                option[props.itemLabel] = String(option[props.itemLabel]).replace((new RegExp(localsearch, "ig")), (matchedText) => {
                    return (`<u>${matchedText}</u>`);
                });
                return o;
            }
        });
        return filteredOptions || [];
    } else {
        return computedOptions.value || [];
    }
});

const returnValue = computed(() => {
    if(props.multiple) {
        if(props.returnObject) return [...selected.value];
        return selected.value.map((obj) => obj[props.itemValue]);
    } else {
        if(props.returnObject) return {...selected.value};
        return selected.value[props.itemValue];
    }
});

const selectPlaceholder = computed(() => {
    if (props.multiple && selected.value.length) {
        return `${selected.value[0][props.itemLabel]}${selected.value.length > 1 ? `, (${selected.value.length - 1} others)` : ''}`
    } 
    else if (!props.multiple && (selected.value[props.itemValue] || selected.value[props.itemValue] === false)) {
        return selected.value[props.itemLabel];
    }
    return null;
});

const close = (e) => {
    if (!root.value.contains(e.target)) {
        menu.value = false;
        if (props.searchable && !selected.value) localsearch.value = null;
    }
};

const updateValue = (value) => {
    if (value || value === false) {
        let items = getItemsByValue(value);
        if (items) selected.value = items;
    } else {
        selected.value = [];
        selectedIndex.value = -1;
        cycleIndex.value = -1;
        localsearch.value = null;
    }
};

const getItemsByValue = (values) => {
    let found = [];
    if(props.multiple) {
        for(const item of values) {
            computedOptions.value.find((obj) => {
                if(obj[props.itemValue] === (props.returnObject ? item[props.itemValue] : item)) return found.push(obj);
            });
        }
    } else {
        found = computedOptions.value.find((obj) => {
            if(obj[props.itemValue] === (typeof values === 'object' ? values[props.itemValue] : values)) return true;
        });
    }
    return found;
};

onMounted(() => {
    if (props.modelValue || props.modelValue === false) {
        checkValueOptions(props.modelValue);
    }
    document.addEventListener('click', close, false);
})

onUnmounted(() => {
    document.removeEventListener('click', close, false);
})

const equalsSearch = (item) => {
    return searchableOptions?.[cycleIndex.value]?.[props.itemValue] === item;
}

const selectItem = (item) => {
    if (props.loading) return;
    // remove possible underline from search select
    item[props.itemLabel] = String(item[props.itemLabel]).replace(/(<([^>]+)>)/ig, '');

    if(!props.multiple) {
        selected.value = item;
        selectedIndex.value = searchableOptions.value.indexOf(item);
        if(!item.select || !item.select.length) menu.value = false;
        if(!item.select || !item.select.length) isSearching.value = false;
        // make sure we clear search out after we have selected an item
        if(!item.select || !item.select.length) localsearch.value = null;
    } 
    else {
        if (!selected.value.some( (obj) => obj[props.itemValue] === item[props.itemValue]) ) {
            selected.value.push(item);
        } else {
            selected.value = selected.value.filter((obj) => obj[props.itemValue] !== item[props.itemValue])
        }
    }

    emit('change', returnValue.value); 
    emit('update:modelValue', returnValue.value);
    emit('input', returnValue.value);
}

const checkValueOptions = (value) => {
    updateValue(value)
};

// need to figure this out
// its causing inifnite updates
watch(() => props.modelValue, (v) => {
    checkValueOptions(v)
})

// watch(() => searchableOptions, (v) => {
//     if(props.searchable && !v.length) menu.value = false;
// })

watch(() => menu.value, (v) => {
    if (v === true) nextTick(() => viewportIni.value = viewport(`#dropdown-${id}`));
    else {
        if(props.multiple || props.searchable) cycleIndex.value = -1;
        else cycleIndex.value = selectedIndex.value || -1;
        viewportIni.value = [];
    }    
})

watch(() => props.options, (v) => {
    checkValueOptions(selected.value)
}) 

const menuToggle = (source) => {
    // if our options are external
    // and there are no options and we have not searched yet
    // then we dont want to show it until the user actually does a search
    // if (this.textField) return;
    if (props.searchable && !localsearch.value && !computedOptions.length) return menu.value = false;
    if (!props.disabled) {
        // if (props.searchable && source !== 'arrow') menu.value = true;
        // else menu.value = !menu.value;
        menu.value = !menu.value;
    }
};

const cycleOptions = (key) => {
    if(searchableOptions.value.length) {
        if(key === 'up' && cycleIndex.value > 0) cycleIndex.value -= 1;
        else if(key === 'down' && cycleIndex.value + 1 !== searchableOptions.value.length) cycleIndex.value += 1;
        nextTick(() => {
            const el = document.getElementById(`focus-${id}`);
            if (el) el.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
    }
}

const clearField = () => {
    localsearch.value = null;
    selected.value = [];
    emit('change', null); 
    emit('update:modelValue', returnValue);
};

</script>

<style scoped>
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
}

.focused {
    scroll-margin: 8px;
}

.focused::before {
    content: "";
    transition: .3s cubic-bezier(.25, .8, .5, 1);
    @apply inset-0 rounded pointer-events-none absolute block bg-black opacity-5;
}
</style>