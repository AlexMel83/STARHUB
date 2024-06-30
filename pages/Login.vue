<template>
	<div class="flex items-center justify-center min-h-screen w-full">
		<div class="rounded bg-sidebar min-w-1/4 p-5">
			<h1 class="text-2xl font-bold text-center mb-5">Login</h1>

			<form class="flex flex-col items-center">
				<UiInput
					placeholder="Email"
					type="email"
					class="mb-3 w-full"
					v-model="emailRef"
				/>
				<UiInput
					placeholder="Password"
					type="password"
					class="mb-3 w-full"
					v-model="passwordRef"
				/>
				<UiInput
					placeholder="Name"
					type="name"
					class="mb-3 w-full"
					v-model="nameRef"
				/>
				<div class="grid grid-cols-2 gap-5 mt-4">
					<UiButton type="button" @click="login">Login</UiButton>
					<UiButton type="button" @click="register">Register</UiButton>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { APP_WRITE_ID } from '@/app.constants'
import { useAuthStore, useIsLoadingStore } from '~/stores/auth.store';
import { Client, Account, ID } from 'appwrite';
import { v4 as uuidv4 } from 'uuid';
const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject(APP_WRITE_ID);               // Your project ID

const account = new Account(client);

    useSeoMeta({
        title: 'Login',
    });

    const emailRef = ref('');
    const passwordRef = ref('');
    const nameRef = ref('');
	
	const isLoadingStore = useIsLoadingStore();
	const authStore = useAuthStore();
	const router = useRouter();

	const clearData = async ()=>{
		emailRef.value = '';
		passwordRef.value = '';
		nameRef.value = '';
		await router.push('/');
		isLoadingStore.set(false);
	}

	const login = async ()=>{
		try {
			isLoadingStore.set(true);
			await account.createSession(emailRef.value, passwordRef.value);
			const response = await account.get();
			if (response) {
			authStore.set({
				email: response.email,
				name: response.name,
				status: response.status,
			});
			}
			await clearData();
		} catch (error) {
			console.error(error);
			isLoadingStore.set(false);
		}
	};
	const register = async ()=>{
		try {
		await account.create(uuidv4(), emailRef.value, passwordRef.value, nameRef.value);
		await login();
	} catch (error) {
		console.error(error);
	}
	};
    
</script>
<style scoped>
    
</style>