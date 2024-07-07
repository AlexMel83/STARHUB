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
import { APP_WRITE_ID } from "@/app.constants";
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";
import { Client, Account, ID } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(APP_WRITE_ID);

const account = new Account(client);
const result = account.get();

useSeoMeta({
  title: "Login",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const clearData = async () => {
  emailRef.value = "";
  passwordRef.value = "";
  nameRef.value = "";
  await router.push("/");
  isLoadingStore.set(false);
};

// const login = async () => {
//   console.log("+");
//   try {
//     isLoadingStore.set(true);
//     await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
//     const response = await account.get();
//     if (response) {
//       authStore.set({
//         email: response.email,
//         name: response.name,
//         status: response.status,
//       });
//     }
//     console.log(response, authStore);
//     await clearData();
//   } catch (error) {
//     console.error("Login error:", error);
//     isLoadingStore.set(false);
//   }
// };

const register = async () => {
  try {
    const userId = ID.unique();
    if (
      userId.length > 36 ||
      !/^[a-zA-Z0-9._-]+$/.test(userId) ||
      /^[._-]/.test(userId)
    ) {
      throw new Error("Generated userId is invalid");
    }
    console.log("Generated User ID:", userId);
    console.log("Email:", emailRef.value);
    console.log("Password:", passwordRef.value);
    console.log("Name:", nameRef.value);
    const result = await account.create(
      userId,
      emailRef.value,
      passwordRef.value,
      nameRef.value,
    );
    console.log("User created successfully", result);
    await login();
  } catch (error) {
    console.error("Registration error:", error);
  }
};
</script>

<style scoped></style>
