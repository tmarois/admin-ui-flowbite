import { useUser, fetchCurrentUser } from "../composables/useUser";

export default defineNuxtPlugin(async () => {
	const user = useUser();
	if (user.value !== undefined) return;
	user.value = await fetchCurrentUser();
});