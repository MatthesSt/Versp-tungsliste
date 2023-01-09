<template>
    <div class="d-flex justify-content-center align-items-center flex-column w-100" style="height: 100vh">
      <div>
        <h1>Login</h1>
        <form @submit.prevent="submit()" style="min-width: 300px">
          <Message v-model:error="error" />
          <div>
            <EmailInput placeholder="Email" v-model="email" required></EmailInput>
          </div>
          <div>
            <TextInput placeholder="Passwort" v-model="password" required></TextInput>
          </div>
          <Button class="btn btn-primary mt-2">Login</Button>
        </form>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { Button, TextInput, EmailInput, Message } from 'custom-mbd-components';
  import * as API from '../API';
  import { ref } from 'vue';
  import router from '../router';
  const email = ref('');
  const password = ref('');
  const error = ref('');
  async function submit() {
    try {
      if (!email.value || !password.value) return (error.value = 'Bitte alle Felder ausfüllen');
     
        await API.login(email.value, password.value);
      
      router.push('/');
    } catch (e: any) {
      console.log(e);
      error.value = e.message;
    }
  }
  </script>