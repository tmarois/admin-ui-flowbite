<template>
    <table class="min-w-full h-full text-sm text-left text-gray-500 divide-y divide-gray-300">
        <thead 
            v-if="!props.hideHeader" 
            class="bg-gray-100" 
            :style="props.fixedHeader ? 'width: calc(100%); display: table; table-layout: fixed;' : ''"
        >
            <tr class="divide-x divide-gray-200" :class="{'shadow-md':!pageTop}">
                <th v-if="select" scope="col" class="p-2">
                    <div class="flex justify-center items-center">
                        <FormCheckbox
                            v-if="!props.selectOne"
                            v-model="state.selectedAll"
                            @change="toggleAll"
                            :disabled="props.loading"
                        />
                    </div>
                </th>
                <th v-for="(h, hindex) in headerColumns"
                    scope="col"
                    class="my-auto px-4 py-2 font-normal whitespace-nowrap uppercase text-gray-700 text-xs align-middle"
                    :key="hindex"
                    :class="{
                        'text-left': !h.align,
                        'text-right': h.align === 'right',
                        'text-center': h.align === 'center',
                        'sortable cursor-pointer hover:bg-gray-200': h.sorting,
                        'sorted !text-blue-700': h.sorted
                    }"
                    :style="`${h.minWidth ? `min-width: ${h.minWidth}` : ''} ${h.width ? `width: ${h.width};` : ''}`"
                    @click="sortClicked(h, hindex)"
                >
                    <slot :name="`header.${h.field}`" v-bind:header="h">
                        <div class="my-auto truncate flex items-center justify-center align-middle">
                            <div class="font-bold grow" style="line-height: 17px;">{{ h.title }}</div>
                            <div v-if="h.sorting" class="sort-icon">
                                <svg v-if="h.sorted === 'ASC'"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg>
                                <svg v-else-if="h.sorted === 'DESC'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" /></svg>
                                <!-- <svg v-else class="h-4 w-4 inline-block" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" /></svg> -->
                                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>
                            </div>
                        </div>
                    </slot>
                </th>
            </tr>
        </thead>
        <thead v-if="props.loading" :style="props.fixedHeader ? 'width: 100%; display: table; table-layout: fixed;' : 'position: relative; top: 0;'">
            <tr :class="`v-data-table__progress ${props.fixedHeader ? 'table table-fixed w-full' : ''}`">
                <th colspan="100%" class="border-none p-0 relative">
                    <ElementProgressBar />
                </th>
            </tr>
        </thead>
        <tbody 
            v-if="props.rows && props.rows.length" 
            ref="tablebody"
            class="divide-y divide-gray-200" 
            :class="{'table-scrollbar' : props.fixedHeader}"
            :style="props.fixedHeader ? `height: calc(100% - 36px); overflow-y: auto; display: block;` : ''"
        >
            <tr 
                v-for="(row, i) in props.rows"
                :key="i" 
                :class="[
                    'hover:bg-gray-100 text-gray-800',
                    (props.fixedHeader ? 'table table-fixed w-full' : ''),
                    (row.class ? row.class : ''), 
                    (state.selection.includes(i) ? `!bg-yellow-50` : ''),
                    (props.rowSelect || props.rowCursor) ? 'cursor-pointer' : ''
                ]"
                @click="selectRow(i, item, $event)"
            >
                <td
                    v-if="select"
                    class="w-4 px-4 py-3"
                >
                    <slot name="column.select">
                        <div class="flex justify-center w-full">
                            <FormCheckbox
                                :value="state.selection.includes(i)"
                                @change="toggleRow(i, 'selectRow', $event)"
                                @click.stop=""
                                :disabled="loading"
                            />
                        </div>
                    </slot>
                </td>
                <td 
                    v-for="(h) in headerColumns"
                    :key="h.field"
                    class="px-4 py-3"
                    :class="[
                        (!h.align) ? 'text-left' : '',
                        (h.align === 'right') ? 'text-right' : '',
                        (h.align === 'center') ? 'text-center' : '',
                        (row.class) ? row.class : '',
                        (h.class) ? h.class : ''
                    ]"
                    :style="`${h.minWidth ? `min-width: ${h.minWidth};` : ''} ${h.width ? `width: ${h.width};` : ''}`"
                >
                    <slot :name="`column.${h.field}`" v-bind:column="row" v-bind:index="i">
                        <span v-if="getValue(row, h.field) !== null && getValue(row, h.field) !== '' && getValue(row, h.field)">
                            <span v-if="typeof h.formatValue === 'function'">{{ h.formatValue(getValue(row, h.field)) }}</span>
                            <span v-else>{{ getValue(row, h.field) }}</span>
                        </span>
                        <span v-else-if="h.hasOwnProperty('empty')" class="text-gray-400">{{ h.empty }}</span>
                        <span v-else-if="props.emptyCellText" class="text-gray-400">{{ props.emptyCellText }}</span>
                    </slot>
                </td>
            </tr>
        </tbody>
        <tbody v-else :style="props.fixedHeader ? `height: calc(100% - 36px); display: block;` : ''" ref="tablebody">
            <tr :class="props.fixedHeader ? 'table table-fixed w-full' : ''">
                <td colspan="100%" class="text-center p-3">
                    <slot name="nodata">{{ messageText }}</slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>


<style scoped>
.table-scrollbar::-webkit-scrollbar {
    width: 10px;
}
.table-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.4);
    border-radius: 4px;
    border: 1px solid #fff;
}
.table-scrollbar::-webkit-scrollbar-track {
  position: absolute;
  right: -3rem;
  top: -50rem;
  background: transparent;
}
</style>

<script setup>
const emit = defineEmits(['sort','click-row','selection']);
const props = defineProps({
    headers: {
        type: Array,
        default: () => []
    },
    rows: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    noDataText: {
        type: String,
        default: 'No results found'
    },
    loadingText: {
        type: String,
        default: 'Loading... Please wait'
    },
    emptyCellText: {
        type: String,
        default: null
    },
    hideHeader: {
        type: Boolean,
        default: false
    },
    fixedHeader: {
        type: Boolean,
        default: false
    },
    select: {
        type: Boolean,
        default: false
    },
    rowSelect: {
        type: Boolean,
        default: false
    },
    rowCursor: {
        type: Boolean,
        default: false
    },
    selectOnlyOne: {
        type: Boolean,
        default: false
    },
    selectionField: {
        type: String,
        default: null
    },
});

const tablebody = ref(null);
const pageTop = ref(true);

const state = reactive({
    selection: [],
    selectAllOption: null,
    selectedAll: false
});

const headerColumns = computed(() => {
    return props.headers.filter((h) => !h?.hide);
});

const messageText = computed(() => {
    if (props.loading) return props.loadingText;
    return props.noDataText;
});

const getValue = (obj, path, defaultValue = undefined) => {
    return getObjectValue(obj, path, defaultValue);
};

// const changeSelectControl = (v) => {
//     // this.menuOpen = false;
//     if(v !== 'number') selectAllOption = v;
//     else selectAllOption = this.$refs.rows_to_select.value;
//     this.$emit('select-control', selectAllOption);
// }

const toggleAll = () => {
    if (!state.selectedAll) deselectAll();
    else selectAll();
};

const selectAll = () => {
    state.selection = [...Array(props.rows.length).keys()];
};

const selectRows = (i) => {
    state.selection = [...Array(+i).keys()];
};

const deselectAll = () => {
    state.selection = [];
};

const toggleRow = (i, origin, $event) => {
    if(!props.rowSelect || origin === 'selectRow') {
        const newSelection = [...state.selection];
        state.selectAllOption = null;
        if (!newSelection.includes(i)) {
            if (props.selectOnlyOne === true) newSelection = [i];
            else newSelection.push(i)
        } else {
            const index = newSelection.indexOf(i);
            if (index !== -1) newSelection.splice(index, 1);
        }
        state.selection = newSelection;
    }
};

const selectRow = (i, item, $event) => {
    // let $event.target.cellIndex
    if (props.rowSelect) toggleRow(i, 'selectRow');
    
    // we do not want to send this event
    // if we are also checking the box
    if (props.select) {
        // prevent input clicks
        // prevent first cell checkbox clicks
        if ($event.target.nodeName === 'INPUT') return;
        if ($event.target.nodeName === 'TD' && $event.target.cellIndex === 0) return;
        emit('click-row', item);
    } 
    else {
        emit('click-row', item);
    }
};

const sortClicked = (h, hindex) => {
    if (h.sorting === true) {
        let direction = null;
        if (h.sorted === 'ASC') direction = 'DESC';
        else if (h.sorted === 'DESC') direction = 'ASC';
        else if (!h.sorted) {
            if (h.sortDefault) direction = h.sortDefault;
            else direction = 'ASC';
        }
        else direction = null;

        // creates headers to be replaced
        let newHeaders = [];
        props.headers.forEach((c) => {
            if (c.field === h.field) {
                newHeaders.push({
                    ...c,
                    sorted: direction
                });
            } else {
                newHeaders.push({
                    ...c,
                    sorted: null
                });
            }
        });

        emit('sort', h, direction, [...newHeaders]);
    }
};

watch(() => state.selection, (v) => {
    let selectedItems = [];
    if (state.selection.length) {
        v.forEach(i => {
            const r = props.rows[i]
            if (r) {
                if (props.selectionField && r[props.selectionField]) {
                    selectedItems.push(r[props.selectionField]);
                }
                else {
                    selectedItems.push(props.rows[i]);
                }
            }
        });
        // if the selected items equal the total items
        // lets make sure to check the selected all
        // however, if they do not match, then uncheck select all
        if (state.selection.length === props.rows.length) state.selectedAll = true;
        else state.selectedAll = false;
    } 
    else {
        // if the selection is empty, 
        // lets uncheck the select all
        state.selectedAll = false;
    }

    emit('selection', selectedItems, [...v]);
});

const handleScroll = () => {
	if(tablebody.value.scrollTop > 1) {
		if(pageTop.value) pageTop.value = false;
	} else {
		if(!pageTop.value) pageTop.value = true;
	}
}

onMounted(() => {
    pageTop.value=true
    tablebody.value.addEventListener('scroll', handleScroll);
});
</script>