<script setup lang="ts">
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
  label: 'Login',
  description: ''
}, {
  key: 'registration',
  label: 'Registration',
  description: ''
}];

const loginForm = reactive({ email: 'admin@test.com', password: '12345678' });
const regForm = reactive({ email: '', firstPassword: '', retypePassword: '' });
// input validation
const minPwd = 4;

const loginSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(minPwd, `Must be at least ${minPwd} characters`)
    .required('Required'),
});

const registrationSchema = object({
  email: string().email('Invalid email').required('Required'),
  firstPassword: string()
    .min(minPwd, `Must be at least ${minPwd} characters`)
    .required('Required'),
  retypePassword: string()
    .oneOf([yupRef('firstPassword'), null], 'Passwords must match')
    .required('Required')
});

type LoginSchema = InferType<typeof loginSchema>;
  type RegistrationSchema = InferType<typeof registrationSchema>;

const state = reactive({
  email: loginForm.email,
  password: loginForm.password,
  firstPassword: regForm.firstPassword,
  retypePassword: regForm.retypePassword,
});
//input validation end
async function onSubmitLogin(event: FormSubmitEvent<LoginSchema>) {
  console.log(event.data);
}

async function onSubmitRegistration(event: FormSubmitEvent<RegistrationSchema>) {
  console.log(event.data);
}
</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Login
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
          <ModalSocial />
        </template>

        <UTabs :items="items" class="w-full">
          <template #item="{ item }">
            <UForm :schema="item.key === 'login' ? loginSchema : registrationSchema" :state="state" class="space-y-4" @submit.prevent="item.key === 'login' ? onSubmitLogin : onSubmitRegistration">
              <div v-if="item.key === 'login'" class="space-y-3">
                <UFormGroup label="Email" name="email">
                  <UInput v-model="state.email" />
                </UFormGroup>
                <UFormGroup label="Password" name="password">
                  <UInput v-model="state.password" type="password" />
                </UFormGroup>
              </div>
              <div v-else-if="item.key === 'registration'" class="space-y-3">
                <UFormGroup label="Email" name="email">
                  <UInput v-model="state.email" />
                </UFormGroup>
                <UFormGroup label="Password" name="firstPassword" required>
                  <UInput v-model="state.firstPassword" type="password" required />
                </UFormGroup>
                <UFormGroup label="Retype Password" name="retypePassword" required>
                  <UInput v-model="state.retypePassword" type="password" required />
                </UFormGroup>
              </div>
              <UButton type="submit" color="black">
                {{ item.key === 'login' ? 'login' : 'registration' }}
              </UButton>
            </UForm>
          </template>
        </UTabs>
      </UCard>
    </UModal>
  </div>
</template>