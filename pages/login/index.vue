<template>
  <Toaster position="top-center" richColors :theme="newColorScheme" />
  <div class="dark:bg-gray-900 min-h-screen dark:text-gray-200">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- <img class="mx-auto h-10 w-auto" src="path/to/logo" alt="Your Company" /> -->
        <h1 class="text text-xl text-center font-bold">URL Shortener</h1>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-200 text-black">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 light:text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
              class="block focus:ring-sky-400 focus:ring- dark:bg-gray-800 px-[10px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-200 dark:text-white text-grey-900 outline-none sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6">Password</label>
              <div class="text-sm">
                <a href="/fog" class="font-semibold text-sky-600 hover:text-sky-500 dark:hover:text-sky-700">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                required
                class="block focus:ring-sky-400 focus:ring- dark:bg-gray-800 px-[10px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-200 dark:text-white text-grey-900 outline-none sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button @click="signInClicked" type="submit"
              class="bg-sky-600 hover:bg-sky-500 flex w-full justify-center rounded-md dark:bg-sky-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm dark:hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Sign
              in</button>
          </div>
        </div>
        <div class="flex items-center mt-3 mb-3 text-sm font-medium">
            <span class="h-0 w-full border-[0.5px] dark:border-gray-700"></span>
            <span class="shrink-0 dark:bg-gray-900 px-6 text-gray-900 dark:text-gray-200 bg-white">Or continue
              with</span>
            <span class="h-0 w-full border-[0.5px] dark:border-gray-700"></span>
          </div>
          <button type="button"
            @click="googleSignIn"
            class="flex items-center justify-center w-full gap-2 rounded-md border bg-white dark:bg-black dark:text-white dark:border-gray-700 px-3 py-2 text-sm font-medium text-black transition hover:bg-gray-100 dark:hover:bg-[#080808] focus:outline-none"><svg
              width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="size-5">
              <path
                d="M250 98.9583C286.875 98.9583 319.896 111.667 345.937 136.458L417.292 65.1042C373.958 24.7917 317.396 0 250 0C152.292 0 67.8123 56.0417 26.6665 137.708L109.792 202.188C129.479 142.917 184.792 98.9583 250 98.9583Z"
                fill="#EA4335"></path>
              <path
                d="M489.375 255.729C489.375 239.375 487.812 223.541 485.417 208.333H250V302.291H384.792C378.75 333.125 361.25 359.375 335 377.083L415.521 439.583C462.5 396.041 489.375 331.666 489.375 255.729Z"
                fill="#4285F4"></path>
              <path
                d="M109.688 297.812C104.688 282.708 101.771 266.666 101.771 250C101.771 233.333 104.583 217.291 109.688 202.187L26.5625 137.708C9.58333 171.458 0 209.583 0 250C0 290.416 9.58333 328.541 26.6667 362.291L109.688 297.812Z"
                fill="#FBBC05"></path>
              <path
                d="M250 500C317.5 500 374.271 477.812 415.521 439.479L335 376.979C312.604 392.083 283.75 400.937 250 400.937C184.792 400.937 129.479 356.979 109.687 297.708L26.5625 362.187C67.8125 443.958 152.292 500 250 500Z"
                fill="#34A853"></path>
            </svg><span>Sign in with Google</span></button>

        <p class="mt-10 text-center text-sm text-gray-500">
          No account?
          {{ ' ' }}
          <a href="/signup" class="font-semibold leading-6 text-sky-600 hover:text-sky-500 dark:text-sky-600 dark:hover:text-sky-700">Create new!</a>
        </p>
      </div>
    </div>
  </div>
  <!-- <footer class="absolute bottom-2 w-full text-center">
    <a class="">Copyright © 2024 <a class="font-semibold">Puntawat Subhamani.</a> All rights reserved.</a>
  </footer> -->
</template>

<script lang="ts" setup>
import { getAuth, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const newColorScheme = useState("newColorSchema")

const { $toast } = useNuxtApp()

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
    $toast.error("Email or Password cannot be empty")
    clearField()
    return
  }
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async(userCredential) => {
      const user = userCredential.user
      const uid = user.uid
      // set here to disable verify email
      const shoudEmailBeVerified = true
      if (shoudEmailBeVerified) {
        if (!user.emailVerified) {
          sendEmailVerification(user)
            .then(() => {
              $toast.error("Email not verified, new verification sent")
            })
            .catch((err: any) => {
              console.log("Email not verified or unknown errors have occured")
            })
        } else {
          // localStorage.setItem("uid", uid)
          useUID.value = uid
          await navigateTo("/dash")
        }
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
      $toast.error(errorCode)
      
    })
  clearField()
}

const googleProvider = new GoogleAuthProvider();
const googleSignIn = () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      if (!user.emailVerified) {
        sendEmailVerification(user)
          .then(() => {
            $toast.success("email verfication sent")
          }).catch((e: any) => {
            console.log(e)
          })
      } else {
        // localStorage.setItem("uid", uid)
        useUID.value = user.uid
        await navigateTo("/dash")
      }
      // console.log(user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      $toast.error(errorCode)
    })
}
</script>

<script lang="ts">
export default {
  beforeMount() {
    const newColorScheme = useState("newColorSchema" , () => window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        newColorScheme.value = event.matches ? "dark" : "light";
    });
  }
}
</script>