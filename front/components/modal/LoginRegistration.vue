<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { object, string, ref as yupRef } from "yup";
import { defineShortcuts } from "#imports";

interface AuthResponse {
  status: number;
  data: {
    user: {
      email: string;
      name: string;
      role: string;
      isactivated: boolean;
    };
  };
};

const { $api, $load } = useNuxtApp();
const isOpen = ref(false);
const currentTab = ref(0);

const schema = computed(()=>currentTab.value === 0 ? loginSchema : registrationSchema);

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => {
      isOpen.value = false;
      clearVars();
    },
  },
});
// tab features
const items = [
  {
    key: 0,
    label: "Увійти",
    description: "",
  },
  {
    key: 1,
    label: "Реєстрація",
    description: "",
  },
];

const formData = reactive({
  email: "",
  password: "",
  passConfirm: "",
});
// input validation
const minPwd = 4;

const loginSchema = object({
  email: string().email("Невірний email").required("Потрібен Email"),
  password: string()
    .min(minPwd, `Пароль має бути не менше ${minPwd} симовлів`)
    .required("Потрібен пароль"),
});

const registrationSchema = object({
  email: string().email("Невірний email").required("Потрібен Email"),
  password: string()
    .min(minPwd, `Пароль не менше ${minPwd} символів`)
    .required("Потрібен пароль"),
  passConfirm: string().oneOf(
    [yupRef("password"), ""],
    "Паролі не співпадають",
  ),
});

const state = reactive({
  email: formData.email,
  password: formData.password,
  passConfirm: formData.passConfirm,
});

const errors = reactive({
  email: "",
  password: "",
  form: "",
});

const clearVars = () => {
  errors.email = "";
  errors.password = "";
  errors.form = "";
  togglePasswordVisibility.value = false;
  state.email = '';
  state.password = '';
  state.passConfirm = '';
};

// input label features
const emailActive = ref(false);
const passwordActive = ref(false);
const passConfirmActive = ref(false);

const handleFocus = (field: string) => {
  if (field === "email") emailActive.value = true;
  if (field === "password") passwordActive.value = true;
  if (field === "passConfirm") passConfirmActive.value = true;
};

const handleBlur = (field: string) => {
  if (field === "email" && !formData.email) emailActive.value = false;
  if (field === "password" && !formData.password) passwordActive.value = false;
  if (field === "passConfirm" && !formData.passConfirm)
    passConfirmActive.value = false;
};

const authStore = useAuthStore();

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  clearVars();

  const payload = {
    email: state.email,
    password: state.password,
    role: currentTab.value === 1 ? 'user' : '',
  };
  try{
    const res = await $load(()=>
    currentTab.value === 0
      ? $api.auth.signIn(payload)
      : $api.auth.signUp(payload));
    
      if (res && [200, 201].includes(res.status)) {
        const data = res.data;
        localStorage.setItem("authUser", JSON.stringify(data));
        authStore.setUser(data.user);
        isOpen.value = false;
      }
  } catch(error) {
    errors.form = "Користувача не авторизовано"
  }
};

const togglePasswordVisibility = ref(false);

const handleTogglePasswordVisibility = async () => {
  togglePasswordVisibility.value = !togglePasswordVisibility.value;
};

watch(isOpen, (newValue) => {
  if (!newValue) {
    togglePasswordVisibility.value = false;
  }
});
</script>

<template>
  <div>
    <UButton label="Login" @click="isOpen = true" />

    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white" >
              StarHub login
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="()=>{isOpen = false; clearVars();}"
            />
          </div>
          <ModalSocial />
        </template>

        <UTabs v-model="currentTab" :items="items" class="w-full">
          <template #item="{ item }">
            <UForm
              :schema="schema"
              :state="state"
              class="space-y-4"
              @submit="handleSubmit"
            >
              <div class="space-y-3 mt-5">
                <UFormGroup
                  name="email"
                  :error="errors.email"
                  :class="{
                    'has-value': state.email !== '' || emailActive,
                    'form-group': true,
                    'text-right': true,
                  }"
                >
                  <UInput
                    icon="i-heroicons-envelope"
                    variant="none"
                    color="primary"
                    v-model="state.email"
                    @focus="handleFocus('email')"
                    @blur="handleBlur('email')"
                    :ui="{
                      base: 'border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0',
                      input: 'bg-transparent',
                    }"
                  >
                    <label>Email</label>
                  </UInput>
                </UFormGroup>
                <UFormGroup
                  name="password"
                  :error="errors.password"
                  :class="{
                    'has-value': state.password !== '' || passwordActive,
                    'form-group': true,
                    'text-right': true,
                  }"
                >
                <div class="password-input-wrapper">
                  <UInput
                    v-if="!togglePasswordVisibility"
                    type="password"
                    icon="i-heroicons-lock-closed"
                    variant="none"
                    color="primary"
                    v-model="state.password"
                    @focus="handleFocus('password')"
                    @blur="handleBlur('password')"
                    :ui="{
                      base: 'border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0',
                      input: 'bg-transparent',
                    }"
                    :passwordVisible="false"
                  >
                    <label>Пароль</label>
                  </UInput>
                  <UInput
                    v-else
                    type="text"
                    icon="i-heroicons-lock-closed"
                    variant="none"
                    color="primary"
                    v-model="state.password"
                    @focus="handleFocus('password')"
                    @blur="handleBlur('password')"
                    :ui="{
                      base: 'border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0',
                      input: 'bg-transparent',
                    }"
                  >
                    <label>Пароль</label>
                  </UInput>
                  <UButton
                    color="gray"
                    variant="ghost"
                    :icon="togglePasswordVisibility ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    @click="handleTogglePasswordVisibility"
                    class="password-toggle"
                  />
                  </div>
                </UFormGroup>
              </div>
              <UFormGroup
                v-if="item.key === 1"
                name="passConfirm"
                :class="{
                  'has-value': state.passConfirm !== '' || passConfirmActive,
                  'form-group': true,
                  'text-right': true,
                }"
              >
              <div class="password-input-wrapper">
                <UInput
                  v-if="!togglePasswordVisibility"
                  type="password"
                  icon="i-heroicons-lock-closed"
                  variant="none"
                  color="primary"
                  v-model="state.passConfirm"
                  @focus="handleFocus('passConfirm')"
                  @blur="handleBlur('passConfirm')"
                  :ui="{
                    base: 'border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0',
                    input: 'bg-transparent',
                  }"
                >
                  <label>Повторіть пароль</label>
                </UInput>
                <UInput
                  v-else
                  type="text"
                  icon="i-heroicons-lock-closed"
                  variant="none"
                  color="primary"
                  v-model="state.passConfirm"
                  @focus="handleFocus('passConfirm')"
                  @blur="handleBlur('passConfirm')"
                  :ui="{
                    base: 'border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0',
                    input: 'bg-transparent',
                  }"
                >
                  <label>Повторіть пароль</label>
                </UInput>
                <UButton
                  color="gray"
                  variant="ghost"
                  :icon="togglePasswordVisibility ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                  @click="handleTogglePasswordVisibility"
                  class="password-toggle"
                />
                </div>
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
.password-input-wrapper {
  position: relative;
}
.password-toggle{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.input-error {
  color: red;
}
.form-group {
  position: relative;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.form-group label {
  position: absolute;
  top: 70%;
  left: 35px;
  transform: translateY(-70%);
  transition: all 0.3s;
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
