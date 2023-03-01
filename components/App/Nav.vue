
<template>
		
<nav class="bg-gray-800 px-2 py-2 sticky w-full z-40 top-0 left-0">
	<div class="flex items-center justify-start">


		<div class="flex items-center grow">

			<NuxtLink to="/" class="ignore-active-link flex items-center mx-2 mr-4 text-white" >Versado Portal</NuxtLink>

	<div class="hidden w-full md:block md:w-auto text-sm" id="navbar-dropdown">
			<ul class="flex space-x-2">
				<li>
					<NuxtLink to="/" class="block py-2 px-4 text-white rounded hover:bg-gray-900">Overview</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/projects" class="block py-2 px-4 text-white rounded hover:bg-gray-900">Projects</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/clients" class="block py-2 px-4 text-white rounded hover:bg-gray-900">Clients</NuxtLink>
				</li>
				<li>
					<button id="trackingNavMenuLink" data-dropdown-trigger="click" data-dropdown-toggle="trackingNavMenu" class="flex items-center py-2 px-4 text-white rounded hover:bg-gray-900">Tracking <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
						<div id="trackingNavMenu" class="z-10 hidden font-normal bg-gray-800 divide-y divide-gray-600 rounded shadow w-48">
								<ul class="py-2 text-sm text-white" aria-labelledby="trackingNavMenu">
									<li><NuxtLink to="/tracking/time" class="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Team Hours</NuxtLink></li>
									<li><NuxtLink to="/tracking/contractors" class="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Contactor Invices</NuxtLink></li>
									<li><NuxtLink to="/tracking/receivables" class="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Client Receivables</NuxtLink></li>
								</ul>
						</div>
				</li>
				<li>
						<button id="manageNavMenuLink" data-dropdown-trigger="click" data-dropdown-toggle="manageNavMenu" class="flex items-center py-2 px-4 text-white rounded hover:bg-gray-900">Manage <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
						<div id="manageNavMenu" class="z-10 hidden font-normal bg-gray-800 divide-y divide-gray-600 rounded shadow w-48">
								<ul class="py-2 text-sm text-white" aria-labelledby="dropdownLargeButton">
									<li><NuxtLink to="/team/employees" class="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Team</NuxtLink></li>
									<li><NuxtLink to="/users" class="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Users</NuxtLink></li>
									<li><NuxtLink to="/settings/categories" class="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Settings</NuxtLink></li>
								</ul>
						</div>
				</li>
			</ul>
		</div>
</div>
	<div class="flex md:order-2">
			<button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
				<span class="sr-only">Open user menu</span>
				<div class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-blue-700 rounded-full dark:bg-gray-600">
						<span class="font-medium text-white">TM</span>
				</div>
			</button>


			<!-- Dropdown menu -->
			<div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
				<div class="px-4 py-3">
					<span class="block text-sm text-gray-900 dark:text-white">Timothy Marois</span>
					<span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">timothymarois@gmail.com</span>
				</div>
				<ul class="py-2" aria-labelledby="user-menu-button">
					<!-- <li>
						<NuxtLink href="/account/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Account</NuxtLink>
					</li> -->
					<li>
						<div @click="logout" class="hover:cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</div>
					</li>
				</ul>
			</div>



			<!-- <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
				<span class="sr-only">Open main menu</span>
				<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
		</button> -->
	</div>


	</div>
</nav>

</template>


<style scoped>
.router-link-active:not(.ignore-active-link) {
	@apply bg-black
}
</style>


<script setup>
import { initDropdowns } from 'flowbite'
const { logout } = useAuth()
onMounted(() => {
    initDropdowns();
});
</script>