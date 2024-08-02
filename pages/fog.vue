<template>
  <div class="bg-gray-900 min-h-screen text-gray-200">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- <img class="mx-auto h-10 w-auto" src="path/to/logo" alt="Your Company" /> -->
        <h1 class="text text-xl text-center font-bold">URL Shortener</h1>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">Reset password</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
              class="block bg-gray-800 px-[10px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-200 text-white outline-none sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button @click="onReset" type="submit"
            class="flex w-full justify-center rounded-md bg-sky-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Reset
              Password</button>
          </div>
        </div>

        <p class="mt-10 text-center text-sm text-gray-500">
          No account?
          {{ ' ' }}
          <a href="/signup" class="font-semibold leading-6 text-sky-600 hover:text-sky-700">Create new!</a>
        </p>
      </div>
    </div>
  </div>
  <!-- <footer class="absolute bottom-2 w-full text-center">
    <a class="">Copyright © 2024 <a class="font-semibold">Puntawat Subhamani.</a> All rights reserved.</a>
  </footer> -->
</template>

<script setup lang="ts">
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const app = useFirebaseApp();
const email = ref("")
const auth = getAuth();

const onReset = () => {
    sendPasswordResetEmail(auth, email.value)
        .then(async () => {
            alert("Password reset email sent, please also check your spam folder");
            await navigateTo("/login")
        })
        .catch((error: any) => {
            console.log(error.code);
        })
}
</script>