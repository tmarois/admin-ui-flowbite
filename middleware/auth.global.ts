import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (to.name!=='login') {
		const auth = useAuthStore()
		const user = useUser();
		if (!user.value && !auth.token) return navigateTo({
			path: "/login", 
			query: { ref: from.fullPath },
			replace: true
		});
	}
});