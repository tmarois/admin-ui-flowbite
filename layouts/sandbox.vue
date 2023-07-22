<template>
    <div class="h-full w-full">
        <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-2">
                    <li v-for="item in items" :key="item.to">
                        <div
                            v-if="item.header"
                            class="flex items-center p-2 text-xs font-medium text-gray-500 border-b border-gray-200"
                        >{{ item.header }}</div>
                        <NuxtLink 
                            v-else
                            :to="item.to" 
                            class="flex items-center p-2 text-sm font-normal text-gray-900 rounded hover:bg-blue-100"
                        >{{ item.title }}</NuxtLink>
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
        header: 'ELEMENTS'
    },
    {
        to:'/sandbox/avatars',
        title: 'Avatars'
    },
    {
        to:'/sandbox/badges',
        title: 'Badges'
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
        to:'/sandbox/drawers',
        title: 'Drawers'
    },
    {
        to:'/sandbox/modals',
        title: '*Modals'
    },
    {
        to:'/sandbox/tabs',
        title: '*Tabs'
    },

    {
        header: 'FORMS'
    },
    {
        to:'/sandbox/forms-label',
        title: 'Labels'
    },
    {
        to:'/sandbox/forms-textfield',
        title: 'Input (Text)'
    },
    {
        to:'/sandbox/forms-textarea',
        title: 'Input (Area)'
    },
    {
        to:'/sandbox/forms-checkbox',
        title: 'Checkbox'
    },
    {
        to:'/sandbox/forms-select',
        title: 'Select'
    },

    {
        header: 'TABLES'
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
        header: 'ADMIN APP'
    },
    {
        to:'/sandbox/admin/page-nav-top',
        title: '*Page Navigation (top)'
    },
    {
        to:'/sandbox/admin/page-nav-side',
        title: '*Page Navigation (side)'
    },
    {
        to:'/sandbox/page-tabs/tab-one',
        title: 'Page Header + Tabs'
    }
]
</script>