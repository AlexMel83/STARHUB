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

interface LoginForm {
  email: string;
  password: string;
}

interface RegistrationForm {
  email: string;
  password: string;
  passwordRepeat: string;
}

useSeoMeta({
  title: "Login",
});


const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const clearData = async () => {
  loginForm.email = loginForm.password ="";
  registrationForm.email = registrationForm.password = registrationForm.passwordRepeat = "";
  await router.push("/");
  isLoadingStore.set(false);
};

// const refresh = async () => {
//   try{
//     const responseRefresh: Response = await fetch("http://localhost:4041/refresh", {
//       method: "GET",
//       headers: {
//         "Content-type": "aplication/json",
//       },
//     })
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }


const login = async () => {
  try {
    isLoadingStore.set(true);
    const response: Response = await fetch("http://localhost:4041/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:loginForm.email,
        password: loginForm.password,
      }),
    });
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    };
    const responseData: LoginResponse = await response.json();
    console.log(responseData)
    if(responseData.accessToken) {
      const {accessToken, refreshToken, user} = responseData;
      authStore.set({
        email: user.email,
        name: user.name || '',
        role: user.role || '',
        status: user.isactivated ? true : false, 
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      await clearData();
      isOpen.value = false;
    } else {
      console.error("Not getting accessToken from server");
    }
  } catch (error) {
    console.error("Login error:", error);
    isLoadingStore.set(false);
  }
};

const registration = () => {
    try {
    // Implement your registration logic here
    console.log('Registration logic here');
  } catch (error) {
    console.error("Registration error:", error);
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

const items = [{
  key: 'login',
  label: 'Login',
  description: 'Make changes to your account here. Click save when you\'re done.'
}, {
  key: 'registration',
  label: 'Registration',
  description: 'Change your password here. After saving, you\'ll be logged out.'
}]

const loginForm = reactive({ email: 'admin4@admin.com', password: '12345' });
const registrationForm = reactive({ email: 'admin5@admin.com', password: '12345', passwordRepeat: '12345' });
const activeTab = ref(0);

function onSubmit(form: LoginForm | RegistrationForm) {
  console.log('Submitted form:', form);
  if (activeTab.value === 1) {
    login();
  } else if (activeTab.value === 2) {
    registration();
  }
}

const isOpen = ref(false);

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false }
  }
})

</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen" prevent-close>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Account</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
          <ModalSocial />
        </template>
        <div>
          <UTabs :items="items" class="w-full" v-model="activeTab">
            <template #item="{ item }">
              <UCard @submit.prevent="() => onSubmit(item.key === 'login' ? loginForm : registrationForm)">
                
                <div v-if="item.key === 'login'" class="space-y-3">
                  <UFormGroup label="Email" name="email">
                    <UInput v-model="loginForm.email" type="email" required />
                  </UFormGroup>
                  <UFormGroup label="Password" name="password">
                    <UInput v-model="loginForm.password" type="password" required />
                  </UFormGroup>
                </div>
                <div v-else-if="item.key === 'registration'" class="space-y-3">
                  <UFormGroup label="Email" name="email" required>
                    <UInput v-model="registrationForm.email" type="email" required />
                  </UFormGroup>
                  <UFormGroup label="Password" name="password" required>
                    <UInput v-model="registrationForm.password" type="password" required />
                  </UFormGroup>
                  <UFormGroup label="Password repeat" name="passwordRepeat" required>
                    <UInput v-model="registrationForm.passwordRepeat" type="password" required />
                  </UFormGroup>
                </div>
                <template #footer>
                  <UButton type="submit" color="black" @click="()=>{item.key === 'login' ? activeTab = 1 : activeTab = 2}">
                    Complete {{ item.key === 'login' ? 'login' : 'registration' }}
                  </UButton>
                </template>
              </UCard>
            </template>
          </UTabs>
        </div>
      </UCard>
    </UModal>
  </div>
</template>