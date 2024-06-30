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
				<div class="flex items-center justify-center gap-5 mt-4 inline">
					<UiButton type="button" @click="login" class="w-full">Login</UiButton>
					<UiButton type="button" @click="register" class="w-full">Register</UiButton>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
    useSeoMeta({
        title: 'Login',
    });

    const emailRef = ref('');
    const passwordRef = ref('');
    const nameRef = ref('');

	const login = ()=>{}
	const register = ()=>{}
    
</script>
<style scoped>
    
</style>