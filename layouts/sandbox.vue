<template>
    <div class="h-full w-full">
        <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-2">
                    <li v-for="item in items" :key="item.to">
                        <NuxtLink :to="item.to" class="flex items-center p-2 text-base font-normal text-gray-900 rounded hover:bg-blue-100">{{ item.title }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </aside>
        <div class="sm:ml-64">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.router-link-active{
	@apply bg-blue-200
}
</style>

<script setup>
const items = [
    {
        to:'/sandbox/avatars',
        title: 'Avatars'
    },
    {
        to:'/sandbox/cards',
        title: 'Cards'
    },
    {
        to:'/sandbox/buttons',
        title: 'Buttons'
    },
    {
        to:'/sandbox/menus',
        title: 'Menus'
    },
    {
        to:'/sandbox/modals',
        title: 'Modals'
    },
    {
        to:'/sandbox/drawers',
        title: 'Drawers'
    },
    {
        to:'/sandbox/tabs',
        title: 'Tabs'
    },
    {
        to:'/sandbox/forms-textfield',
        title: 'Forms: Text Field'
    },
    {
        to:'/sandbox/forms-textarea',
        title: 'Forms: Text Area'
    },
    {
        to:'/sandbox/forms-checkbox',
        title: 'Forms: Checkbox'
    },
    {
        to:'/sandbox/forms-select',
        title: 'Forms: Select'
    },
    {
        to:'/sandbox/tables',
        title: 'Tables'
    },
    {
        to:'/sandbox/tables-pagination',
        title: 'Tables: Pagination'
    },
    {
        to:'/sandbox/page-tabs/tab-one',
        title: 'Page: Tabs'
    }
]
</script>