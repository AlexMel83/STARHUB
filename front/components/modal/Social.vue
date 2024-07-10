<script setup lang="ts">
import LogosGoogleIcon from "./LogosGoogleIcon.vue";
import LogosFacebook from "./LogosFacebook.vue";

interface AuthResponse {
  status: number;
  data: {
    user: {
      email: string;
      name: string;
      role: string;
    };
    url: string;
  };
}

const { $api, $load } = useNuxtApp();

const errors = reactive({
  textError: "",
});

const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  let res: AuthResponse | null = null;
  res = await $load(async () => $api.auth.socAuth(provider), errors);
  if (res.data.url) {
    window.location.href = res.data.url;
  }
};
</script>

<template>
  <div class="wrapper-login-using">
    <p class="social-title text-slate-600">Увійти за допомогою соцмереж</p>
    <div class="login-using">
      <div class="login-using-item" @click="handleSocialLogin('google')">
        <LogosGoogleIcon />
      </div>
      <div class="login-using-item" @click="handleSocialLogin('facebook')">
        <LogosFacebook />
      </div>
    </div>
    <!-- <div class="space-y-4 block">
          <UButton color="black" label="Login with Facebook" icon="i-simple-icons-facebook" block />
          <UButton color="black" label="Login with Google" icon="i-simple-icons-google" block />
        </div> -->
    <p v-if="errors.textError" class="text-eror">{{ errors.textError }}</p>
    <p class="social-title text-slate-600 mt-5 mb-0">
      Або продовжуйте вхід через:
    </p>
    <div class="social-error" v-if="errors.textError">
      {{ errors.textError }} <br />скористайтесь полями нижче для авторизації через email
    </div>
  </div>
</template>

<style scoped>
.social-title {
  margin: 0 10px 10px 10px;
}
.social-error {
  color: red;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
}
.wrapper-login-using {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.login-using {
  width: 166px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.login-using .login-using-item {
  height: 100%;
  width: 60px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
