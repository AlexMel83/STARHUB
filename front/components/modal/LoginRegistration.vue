<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from "~/stores/auth.store";
import { object, string, ref as yupRef } from "yup";
import { defineShortcuts } from "#imports";

interface AuthResponse {
  status: number;
  data: {
    user: {
      email: string;
      name: string;
      role: string;
    };
  };
}

const { $api, $load } = useNuxtApp();
const isOpen = ref(false);
defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => {
      isOpen.value = false;
    },
  },
});
// tab features
const items = [
  {
    key: "login",
    label: "Увійти",
    description: "",
  },
  {
    key: "registration",
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

const clearErrors = () => {
  errors.email = "";
  errors.password = "";
  errors.form = "";
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

async function onSubmit(event: Event, submit: "login" | "registration") {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }
  clearErrors();

  const payload = {
    email: state.email,
    password: state.password,
    role: "",
  };
  let res: AuthResponse | null = null;
  if (submit === "login") {
    res = await $load(async () => $api.auth.signIn(payload), errors);
  } else if (submit === "registration") {
    payload.role = "user";
    res = await $load(async () => $api.auth.signUp(payload), errors);
  }

  if (res && (res.status === 200 || res.status === 201)) {
    const data = res.data;
    localStorage.setItem("user", JSON.stringify(data));
    authStore.set({
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
      status: true,
    });
    isOpen.value = false;
  }
}
</script>

<template>
  <div>
    <UButton label="Login" @click="isOpen = true" />

    <UModal v-model="isOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              StarHub login
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
          <!-- <ModalSocial /> -->
        </template>

        <UTabs :items="items" class="w-full">
          <template #item="{ item }">
            <UForm
              ref="form"
              :schema="item.key === 'login' ? loginSchema : registrationSchema"
              :state="state"
              class="space-y-4"
              @submit="(event) => onSubmit(event, item.key)"
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
                  <UInput
                    type="password"
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
                </UFormGroup>
              </div>
              <UFormGroup
                v-if="item.key === 'registration'"
                name="passConfirm"
                :class="{
                  'has-value': state.passConfirm !== '' || passConfirmActive,
                  'form-group': true,
                  'text-right': true,
                }"
              >
                <UInput
                  type="password"
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
.input-error {
  color: red;
}
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
