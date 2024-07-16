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
      isactivated: boolean;
    };
    url: string;
  };
};

const { $api, $load } = useNuxtApp();

const textError = ref('');

const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  try{
    const res: AuthResponse = await $load(async () => $api.auth.socAuth(provider));
  if (res.data.url) {
    window.location.href = res.data.url;
  };
  } catch(error){
    textError.value = "Помилка при авторизації через соціальну мережу";
  } ;
};
</script>

<template>
  <div class="wrapper-login-using">
    <div class="login-using mt-5 mb-4">
      <UTooltip text="Увійти через Google" >
        <template #text>
          <span class="italic">Увійти через Google</span>
        </template>
        <div class="login-using-item" @click="handleSocialLogin('google')">
          <LogosGoogleIcon />
        </div>
      </UTooltip>
      <UTooltip text="Увійти через Facebook">
        <div class="login-using-item" @click="handleSocialLogin('facebook')">
          <LogosFacebook />
        </div>
      </UTooltip>
    </div>
    <UNotifications 
    v-if="textError" 
    color="red" 
    :timeout="3000">
      {{ textError }}
    </UNotifications>
  </div>
</template>

<style scoped>
.wrapper-login-using {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-using {
  width: 166px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.login-using .login-using-item {
  height: 100%;
  width: 60px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-using .login-using-item:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  border-radius: 50%;
}
</style>
