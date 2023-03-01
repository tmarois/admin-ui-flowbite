import { defineStore } from "pinia";

interface Auth {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
}

export const useAuthStore = defineStore("_auth", {
    state: (): Auth => ({
        access_token: '',
        expires_in: 0,
        refresh_token: '',
        token_type: ''
    }),
    getters: {
        token(state) {
            return state.access_token;
        },
    },
    actions: {
        setToken(v: string) {
            this.access_token = v;
        }
    },
    persist: true
});