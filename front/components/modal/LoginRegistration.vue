<script setup lang="ts">
import { APP_WRITE_ID } from "@/app.constants";
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";
import { Client, Account } from "appwrite";
import { object, string, ref as yupRef, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'  
// modal features
const isOpen = ref(false);
defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => { isOpen.value = false }
  }
});
// tab features
const items = [{
  key: 'login',
  label: 'Увійти',
  description: ''
}, {
  key: 'registration',
  label: 'Реєстрація',
  description: ''
}];

const formData = reactive({
  email: '',
  password: '',
  passConfirm: ''
});
// input validation
const minPwd = 4;

const loginSchema = object({
  email: string().email('Невірний email').required('Потрібен Email'),
  password: string()
    .min(minPwd, `Пароль має бути не менше ${minPwd} симовлів`)
    .required('Потрібен пароль'),
});

const registrationSchema = object({
  email: string().email('Невірний email').required('Потрібен Email'),
  password: string()
    .min(minPwd, `Пароль не менше ${minPwd} символів`)
    .required('Потрібен пароль'),
  passConfirm: string()
    .oneOf([yupRef('password'), null], 'Паролі не співпадають')
});

type LoginSchema = InferType<typeof loginSchema>;
type RegistrationSchema = InferType<typeof registrationSchema>;

const state = reactive({
  email: formData.email,
  password: formData.password,
  passConfirm: formData.passConfirm,
});

async function onSubmit(submit: 'login' | 'registration') {
  if (submit === 'login') {
    try {
    isLoadingStore.set(true);
    console.log(state.email, state.password)
    await account.createEmailPasswordSession(state.email, state.password);
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
    } catch (error) {
      console.error("Login error:", error);
      isLoadingStore.set(false);
    }
  } else if (submit === 'registration') {
    console.log(state);
  }
};

// input label features
const emailActive = ref(false);
const passwordActive = ref(false);
const passConfirmActive = ref(false);

const handleFocus = (field: string) => {
  if (field === 'email') emailActive.value = true;
  if (field === 'password') passwordActive.value = true;
  if (field === 'passConfirm') passConfirmActive.value = true;
};

const handleBlur = (field: string) => {
  if (field === 'email' && !formData.email) emailActive.value = false;
  if (field === 'password' && !formData.password) passwordActive.value = false;
  if (field === 'passConfirm' && !formData.passConfirm) passConfirmActive.value = false;
};

const validateForm = () => {
  console.log('Form data:', formData);
};

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(APP_WRITE_ID);
const account = new Account(client);
const result = account.get();

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const clearData = async () => {
  formData.email = "";
  formData.password = "";
  formData.passConfirm = "";
  await router.push("/");
  isLoadingStore.set(false);
};
</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              StarHub login
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
          <!-- <ModalSocial /> -->
        </template>

        <UTabs :items="items" class="w-full">
          <template #item="{ item }">
            <UForm 
              :schema="item.key === 'login' ? loginSchema : registrationSchema"
              :state="state" 
              class="space-y-4"
              @submit="onSubmit(item.key)"
              >
              <div class="space-y-3 mt-5">
                <UFormGroup name="email" :class="{ 'has-value': state.email !== '' || emailActive, 'form-group': true, 'text-right': true }">
                  <UInput 
                    variant="none" 
                    color="primary"
                    v-model="state.email" 
                    @focus="handleFocus('email')" 
                    @blur="handleBlur('email')"
                    :ui="{ 
                      base: 'border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0',
                      input: 'bg-transparent'
                    }"
                  >
                    <label>Email</label>
                  </UInput>
                </UFormGroup>
                <UFormGroup name="password" :class="{ 'has-value': state.password !== '' || passwordActive, 'form-group': true, 'text-right': true }">
                  <UInput
                  type="password"
                  variant="none" 
                  color="primary"
                  v-model="state.password"
                  @focus="handleFocus('password')" 
                  @blur="handleBlur('password')" 
                  :ui="{ 
                      base: 'border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0',
                      input: 'bg-transparent'
                    }"
                  >
                    <label>Пароль</label>
                  </UInput>
                </UFormGroup>
              </div>
              <UFormGroup v-if="item.key === 'registration'" name="passConfirm" :class="{ 'has-value': state.passConfirm !== '' || passConfirmActive, 'form-group': true, 'text-right': true }">
                <UInput
                type="password"
                variant="none" 
                color="primary"
                v-model="state.passConfirm"
                @focus="handleFocus('passConfirm')" 
                @blur="handleBlur('passConfirm')" 
                :ui="{ 
                    base: 'border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0',
                    input: 'bg-transparent'
                  }"
                >
                  <label>Підтвердіть пароль</label>
                </UInput>
              </UFormGroup>
              <UButton type="submit" color="black">
                {{ item.label }}
              </UButton>
            </UForm>
          </template>
        </UTabs>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-group label {
  position: absolute;
  top: 70%;
  left: 10px;
  transform: translateY(-70%);
  transition: all 0.2s;
  pointer-events: none;
  color: #999;
  z-index: 10;
  font-size: 125%;
}

.form-group.has-value label,
.form-group input:focus + label {
  top: 3px;
  left: 0;
  /* font-size: 0.75rem; */
  /* color: #333; */
}
</style>