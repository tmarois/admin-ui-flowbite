import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
	const auth = useAuthStore()
	const user = useUser();

	let redirectPath = '/';
	if (to?.query?.ref) {
		redirectPath = to?.query?.ref || '/'
	}

	if (user.value && auth.token) return navigateTo({
		path: redirectPath, 
		replace: true
	});
});