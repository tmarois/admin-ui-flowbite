import { useUser, fetchCurrentUser } from "../composables/useUser";

export default defineNuxtPlugin(async () => {
	const { API_URL } = useRuntimeConfig().public;
	// we use this to determine if there is an API we should fetch
	if (API_URL) {
		const user = useUser();
		if (user.value !== undefined) return;
		user.value = await fetchCurrentUser();
	}
});