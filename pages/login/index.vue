<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="path/to/logo" alt="Your Company" /> -->
       <h1 class="text text-xl text-center font-bold">URL Shortener</h1>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required class="block px-[10px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="/fog" class="font-semibold text-sky-600 hover:text-sky-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="block px-[10px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click="signInClicked" type="submit" class="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Sign in</button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        No account?
        {{ ' ' }}
        <a href="/signup" class="font-semibold leading-6 text-sky-600 hover:text-sky-500">Create new!</a>
      </p>
    </div>
  </div>
  <!-- <footer class="absolute bottom-2 w-full text-center">
    <a class="">Copyright © 2024 <a class="font-semibold">Puntawat Subhamani.</a> All rights reserved.</a>
  </footer> -->
</template>

<script lang="ts" setup>
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
const app = useFirebaseApp()
const auth = getAuth()
const email = ref("")
const password = ref("")
const useUID = useState<string | undefined>("uid")
const clearField = () => {
  password.value = ""
}
const signInClicked = () => {
  if (email.value === "" && password.value === "") {
    alert("Email or Password cannot be empty")
    clearField()
    return
  }
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async(userCredential) => {
      const user = userCredential.user
      const uid = user.uid
      if (!user.emailVerified) {
        sendEmailVerification(user)
          .then(() => {
            alert("Email not verified, new verification sent")
          })
          .catch((err: any) => {
            console.log("Email not verified or unknown errors have occured")
          })
      } else {
        // localStorage.setItem("uid", uid)
        useUID.value = uid
        await navigateTo("/dash")
      }
    }).catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // if (errorCode !== "auth/invalid-email") {
      //   alert(errorCode)
      // }
      alert(errorCode)
      
    })
  clearField()
}
</script>