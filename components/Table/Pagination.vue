<template>
    <div class="flex  justify-between text-sm">
        <div class="flex flex-row items-center">
            <select
                name="currentPerPage"
                class="flex w-18 py-2 pl-2 pr-2 text-sm font-medium text-gray-500 bg-white border-gray-200 rounded cursor-pointer hover:bg-blue-100 hover:border-blue-900 hover:text-blue-900 focus:outline-none focus:border-blue-900 focus:ring-0"
                :value="props.perPage"
                @input="changePerPage($event)"
            >
                <option
                    v-for="option of props.perPageOptions"
                    :key="option"
                    :value="option"
                >
                    {{ option }}
                </option>
            </select>
            <label for="perPage" class="mt-0 ml-4 text-left text-gray-500">
                <template v-if="totalCount">Showing {{ fromItem }} to {{ toItem }} of {{ totalCount }} results</template>
                <template v-else-if="props.loading">Loading...</template>
            </label>
        </div>
        <div class="relative flex order-1 space-x-2">
            <div>
                <ElementButton 
                    ghost
                    circle
                    @click="prevDisabled ? '' : goToPage(props.page - 1)"
                    :disabled="prevDisabled"
                >
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                    </template>
                </ElementButton>
            </div>
            <div class="relative flex items-center space-x-2">
                <FormTextField 
                    type="number"
                    :value="props.page"
                    :disabled="(!props.totalCount && props.loading) || (totalPages < 1 && !props.loading)"
                    @focusin="$event.target.select()"
                    @blur="changePage"
                    @change="changePage"
                    classes="text-center"
                    style="width:74px"
                />
                <span class="text-gray-500" v-if="totalCount">of {{ totalPages }}</span>
            </div>
            <div>
                <ElementButton 
                    ghost
                    circle
                    @click="nextDisabled ? '' : goToPage(props.page + 1)"
                    :disabled="nextDisabled"
                >
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    </template>
                </ElementButton>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['change']);
const props = defineProps({
    page: {
        type: Number,
        default: 1
    },
    perPage: {
        type: Number,
        default: 15
    },
    perPageOptions: {
        type: Array,
        default: () => {
            return [15, 30, 50, 100]
        }
    },
    totalCount: {
        type: Number,
        default: 0
    },
    loading: {
        type: Boolean,
        default: false
    }
});

const totalPages = computed(() => { 
    // if totalItems is not set, the total page is -1 to disable page validation
    return props.totalCount === undefined ? -1 : Math.ceil(props.totalCount / props.perPage);
});

const prevDisabled = computed(() => {
    return props.page === 1;
});

const fromItem = computed(() => {
    if (props.page === 1) return 1;
    else return (props.perPage * (props.page - 1)) + 1;
});

const toItem = computed(() => {
    if (props.page === totalPages.value) return props.totalCount;
    else return (props.page) * props.perPage;
});

const nextDisabled = computed(() => {
    if (totalPages.value === -1) return false // allow next button to be clicked when total items is not loaded
    if ((totalPages.value < 1 && !props.loading) || totalPages.value === 1 ) return true
    if (totalPages.value > 1) return props.page === totalPages.value
    return false
});

const changePage = (e) => {
    goToPage(e.target.value);
    if (e.target === document.activeElement) e.target.blur();
};

const changePerPage = (e) => {
    emit('change',{
        page: 1,
        perPage: Number(e.target.value)
    });
}

const goToPage = (page) => {
    if (page < 1 || page === 1) page = 1;
    else if (totalPages.value > 0 && Number(page) > totalPages.value) page = totalPages.value;
    emit('change',{
        page: Number(page),
        perPage: props.perPage
    });
}

</script>