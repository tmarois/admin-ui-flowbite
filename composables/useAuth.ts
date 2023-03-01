import { useAuthStore } from '../stores/auth'

type User = {
	name: string;
	email?: string;
};

export const useUser = () => {
	return useState<User>("user", () => undefined);
};

export const useAuth = () => {
	const router = useRouter();
	const user = useUser();
	const isLoggedIn = computed(() => !!user.value);

	async function refresh() {
		try {
			user.value = await fetchCurrentUser();
		} catch {
			user.value = null;
		}
	}

	async function login(credentials) {
		const auth = useAuthStore()
		if (isLoggedIn.value) return;
		const ar = await $ofetch("/api/login", {
			method: "post",
			body: {
				...credentials
			} 
		});
		if (ar.token) auth.setToken(ar.token)
		await refresh();
	}

	async function register(credentials) {
		await $ofetch("/register", { method: "post", body: credentials });
		await refresh();
	}

	async function resendEmailVerification() {
		return await $ofetch<{ status: string }>("/email/verification-notification", {
			method: "post",
		});
	}

	async function logout() {
		// if (!isLoggedIn.value) return;
		await $ofetch("/api/logout", { method: "post" });
		user.value = null;
		await router.push("/login");
	}

	async function forgotPassword(email) {
		return await $ofetch<{ status: string }>("/forgot-password", {
			method: "post",
			body: { email },
		});
	}

	async function resetPassword(credentials) {
		return await $ofetch<{ status: string }>("/reset-password", {
			method: "post",
			body: credentials,
		});
	}

	return {
		user,
		isLoggedIn,
		login,
		register,
		resendEmailVerification,
		logout,
		forgotPassword,
		resetPassword,
		refresh,
	};
};

export const fetchCurrentUser = async () => {
	try {
		return await $ofetch<User>("/api/user", {
			redirectIfNotAuthenticated: true,
		});
	} catch (error) {
		if ([401, 419].includes(error?.response?.status)) return null;
		throw error;
	}
};