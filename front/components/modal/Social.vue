<script setup>
    import LogosGoogleIcon from './LogosGoogleIcon.vue';
    import LogosFacebook from './LogosFacebook.vue';
    
    const config = useRuntimeConfig();
    const localhostApi = config.public.localhostApi;
    console.log(localhostApi)
    const error = ref('');

    // onMounted(() => {
    //     const errorParam = urlParams.get('error');
    //     if (errorParam) {
    //         error.value = errorParam;
    //     }
    // });

    const handleSocialLogin = async (provider) => {
  try {
    const response = await fetch(`${localhostApi}/social-login/${provider}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();  // Преобразование тела ответа в JSON
    console.log(data);

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.log("Social Login Error:", error);
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
        <p class="social-title text-slate-600 mt-5 mb-0">Або продовжуйте вхід через: </p>
      <div class="social-error" v-if="error">{{ error }} <br>скористайтесь полями нижче для авторизації через email</div>
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