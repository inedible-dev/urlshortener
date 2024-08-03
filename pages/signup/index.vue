<template>
  <Toaster position="top-center" richColors :theme="newColorScheme" />
  <div class="dark:bg-gray-900 min-h-screen dark:text-gray-200">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- <img class="mx-auto h-10 w-auto" src="path/to/logo" alt="Your Company" /> -->
        <h1 class="text text-xl text-center font-bold">URL Shortener</h1>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-200 text-black">Create your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6">Email address</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
              class="block dark:bg-gray-800 px-[10px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-200 dark:text-white text-grey-900 outline-none sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6">Password</label>
              <div class="text-sm">
                <!-- <a class="font-semibold text-[10px] text-sky-600">DO NOT use the password you used on any other websites.</a> -->
              </div>
            </div>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                required
                class="block dark:bg-gray-800 px-[10px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-200 dark:text-white text-grey-900 outline-none sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="repeat" class="block text-sm font-medium leading-6">Repeat Password</label>
              <div class="text-sm">
                <!-- <a href="#" class="font-semibold text-sky-600 hover:text-sky-500">Forgot password?</a> -->
              </div>
            </div>
            <div class="mt-2">
              <input v-model="repeat" id="repeat" name="repeat" type="password" autocomplete="current-password" required
              class="block dark:bg-gray-800 px-[10px] w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-200 dark:text-white text-grey-900 outline-none sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <button @click="onSignupClicked" type="submit"
            class="bg-sky-600 hover:bg-sky-500 flex w-full justify-center rounded-md dark:bg-sky-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm dark:hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Create
              new account</button>
            <!-- <button class="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
              <span>Continue with Google</span>
          </button> -->
          </div>
          </div>
          <div class="flex items-center mt-2.5 mb-2.5 text-sm font-medium">
            <span class="h-0 w-full border-[0.5px] dark:border-gray-700"></span>
            <span class="shrink-0 dark:bg-gray-900 px-6 text-gray-900 dark:text-gray-200 bg-white">Or continue
              with</span>
            <span class="h-0 w-full border-[0.5px] dark:border-gray-700"></span>
          </div>
          <button @click="googleSignIn" type="button"
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
            </svg><span>Continue with Google</span></button>

        <p class="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          {{ ' ' }}
          <a href="/login" class="font-semibold leading-6 text-sky-600 hover:text-sky-500 dark:text-sky-600 dark:hover:text-sky-700">Sign In</a>
        </p>
      </div>
    </div>
  </div>

  <!-- <footer class="absolute bottom-2 w-full text-center">
    <a class="">Copyright © 2024 <a class="font-semibold">Puntawat Subhamani.</a> All rights reserved.</a>
  </footer> -->
</template>

<script lang="ts" setup>
import { getAuth, createUserWithEmailAndPassword, signOut, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const newColorScheme = useState("newColorSchema")

const useUID = useState<string | undefined>("uid")
    
const firebaseApp = useFirebaseApp()
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const email = ref("")
const password = ref("")
const repeat = ref("")

const { $toast } = useNuxtApp()

// ChatGPT
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const clearField = () => {
  password.value = ""
  repeat.value = ""
}

const onSignupClicked = () => {
  if (password.value !== repeat.value) {
    $toast.error("Unable to verify password")
    clearField()
    return
  } else {
    if (!validateEmail(email.value)) {
      $toast.error("Email is not valid")
      clearField()
      return
    }
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user
        // console.log(user)
        sendEmailVerification(user)
          .then(() => {
            $toast.error("email verfication sent")
          }).catch((e: any) => {
            console.log(e)
          })
        signOut(auth).then(async () => {
          console.log("out")
          await navigateTo("/login")
        }).catch((error: any) => {
          console.log(error)
        })
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        $toast.error(errorCode)
      })
    clearField()
  }
}

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
      $toast.error(error)
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