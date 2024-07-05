<script setup lang="ts">
// import { useRouter } from "vue-router";
import { APP_WRITE_ID } from "@/app.constants";
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";
import { Client, Account, ID } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(APP_WRITE_ID);

const account = new Account(client);

interface LoginForm {
  email: string;
  password: string;
}

interface RegistrationForm {
  email: string;
  password: string;
  passwordRepeat: string;
}

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const items = [{
  key: 'login',
  label: 'Login',
  description: 'Make changes to your account here. Click save when you\'re done.'
}, {
  key: 'registration',
  label: 'Registration',
  description: 'Change your password here. After saving, you\'ll be logged out.'
}]

const loginForm = reactive({ email: 'admin@test.com', password: '12345678' });
const registrationForm = reactive({ email: 'admin5@admin.com', password: '12345', passwordRepeat: '12345' });
const activeTab = ref(0);
const isOpen = ref(false);

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false }
  }
});

const clearData = async () => {
  loginForm.email = loginForm.password ="";
  registrationForm.email = registrationForm.password = registrationForm.passwordRepeat = "";
  await router.push("/");
  isLoadingStore.set(false);
};

const registration = () => {
    try {
    // Implement your registration logic here
    console.log('Registration logic here');
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const login = async () => {
  console.log("+");
  try {
    isLoadingStore.set(true);
    await account.createEmailPasswordSession(loginForm.email, loginForm.password);
    const response = await account.get();
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status,
      });
    }
    console.log(response, authStore);
    await clearData();
    isOpen.value = false;
  } catch (error) {
    console.error("Login error:", error);
    isLoadingStore.set(false);
  }
};

function onSubmit(form: LoginForm | RegistrationForm) {
  console.log('Submitted form:', form);
  if (activeTab.value === 1) {
    login();
  } else if (activeTab.value === 2) {
    registration();
  }
}
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