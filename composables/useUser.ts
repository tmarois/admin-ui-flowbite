type User = {
	name: string;
	email?: string;
};

export const useUser = () => {
	return useState<User>("user", () => undefined);
};

export const fetchCurrentUser = async () => {
	try {
		const u = await $ofetch<User>("/api/user", {
			redirectIfNotAuthenticated: true,
		});
		if (u && u?.data) {
			return u.data;
		}
	} catch (error) {
		if ([401, 419].includes(error?.response?.status)) return null;
		throw error;
	}
};