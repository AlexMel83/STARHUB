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
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";

interface User {
  id: number;
  email: string;
  name: string | null;
  surname: string | null;
  phone: string | null;
  role: string;
  isactivated: boolean;
  social_login: boolean;
  facebook_id: string | null;
  google_id: string | null;
  picture: string | null;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

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

const login = async () => {
  try {
    isLoadingStore.set(true);
    const response: Response = await fetch("http://localhost:4041/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.value,
        password: passwordRef.value,
      }),
    });
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    };
    const responseData: LoginResponse = await response.json();
    if(responseData.accessToken) {
      const {accessToken, refreshToken, user} = responseData;
      authStore.set({
        email: user.email,
        name: user.name || '',
        role: user.role || '',
        status: user.isactivated ? true : false, 
      });

      document.cookie = `accessToken=${accessToken}; Secure; HttpOnly; SameSite=Strict`;
      document.cookie = `refreshToken=${refreshToken}; Secure; HttpOnly; SameSite=Strict`;

      await clearData();
    } else {
      console.error("Not getting accessToken from server");
    }
  } catch (error) {
    console.error("Login error:", error);
    isLoadingStore.set(false);
  }
};

// const register = async () => {
//   try {
//     const userId = ID.unique();
//     if (
//       userId.length > 36 ||
//       !/^[a-zA-Z0-9._-]+$/.test(userId) ||
//       /^[._-]/.test(userId)
//     ) {
//       throw new Error("Generated userId is invalid");
//     }
//     console.log("Generated User ID:", userId);
//     console.log("Email:", emailRef.value);
//     console.log("Password:", passwordRef.value);
//     console.log("Name:", nameRef.value);
//     const result = await account.create(
//       userId,
//       emailRef.value,
//       passwordRef.value,
//       nameRef.value,
//     );
//     console.log("User created successfully", result);
//     await login();
//   } catch (error) {
//     console.error("Registration error:", error);
//   }
// };
</script>

<style scoped></style>
