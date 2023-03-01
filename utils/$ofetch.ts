import { $fetch, FetchOptions, FetchError } from "ohmyfetch";
import { useAuthStore } from '../stores/auth'

interface ResponseMap {
	blob: Blob;
	text: string;
	arrayBuffer: ArrayBuffer;
}

type ResponseType = keyof ResponseMap | "json";

type oFetchOptions<R extends ResponseType> = FetchOptions<R> & {
	redirectIfNotAuthenticated?: boolean;
	redirectIfNotVerified?: boolean;
};

export async function $ofetch<T, R extends ResponseType = "json">(
	path: RequestInfo,
	{
		redirectIfNotAuthenticated = true,
		redirectIfNotVerified = true,
		...options
	}: oFetchOptions<R> = {}
) {
	
	const { BASE_URL, API_URL } = useRuntimeConfig().public;
	const route = useRoute()
	const router = useRouter()
	const auth = useAuthStore()

	let headers: any = {
		...options?.headers,
		Authorization: `Bearer ${auth.token}`,
		Accept: "application/json",
		"content-type": "application/json",
	};

	if (process.server) {
		headers = {
			...headers,
			referer: BASE_URL,
		};
	}

	try {
		return await $fetch<T, R>(path, {
			baseURL: API_URL,
			...options,
			headers,
		});
	} 
	catch (error) {
		if (!(error instanceof FetchError)) throw error;

		const status = error.response?.status ?? -1;

		if (redirectIfNotAuthenticated && [401, 419].includes(status) && route.name !== 'login') {
			await router.push('/login?ref='+encodeURIComponent(route.fullPath))
		}

		if (redirectIfNotVerified && [409].includes(status)) {
			await router.push('/verify-email')
		}

		if ([500].includes(status)) {
			console.error("[Laravel Error]", error.data?.message, error.data);
		}

		throw error;
	}
}