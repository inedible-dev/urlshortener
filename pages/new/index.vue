<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';

const app = useFirebaseApp()
const url = ref("")
const isInput = ref(true)
// const currentHref = ref('https://short.inedible.dev/')
const currentHref = useState('currentHref')
const appName = useState('appName')
const useUID = useState<string | undefined>("uid")


// const data = await $fetch.raw("/api/newUrl", {
//     method: "POST",
//     body: { id: '2' }
// })
// console.log(data._data)
// if (data.status !== 200) {
//     console.log('url not found')
// }

// ChatGPT
const generateRandomUrl = (length?: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    const charactersLength = characters.length;
    const urlLength = length ?? Math.floor(Math.random() * 3) + 6; // Random length between 6 and 8

    let result = '';
    for (let i = 0; i < urlLength; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }
    return result;
}
const isValidURL = (url: string): boolean => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
}

const onShorten = async () => {
    if (!isValidURL(url.value)) {
        alert("Not a valid URL")
        return;
    }
    let urlString = ""
    while (true) {
        urlString = generateRandomUrl()
        const data = await $fetch.raw("/api/checkUrl", {
            method: "POST",
            body: { id: `${urlString}` }
        })
        if (data._data == "not found") {
            // console.log(data._data)
            try {
                const newData = await $fetch.raw("/api/newUrl", {
                    method: "POST",
                    body: { id: `${urlString}`, url: `${url.value}`, user_id: `${useUID.value}` }
                })
                // console.log(newData)
            } catch (err: any) {
                alert(err.message)
            }
            isInput.value = false
            url.value = `${urlString}`
            break;
        }
    }
}

const onCopy = () => {
    navigator.clipboard.writeText(`${currentHref.value}${url.value}`)
    alert(`Copied ${currentHref.value}${url.value} to clipboard.`)
}

const auth = getAuth()

const logOut = () => {
    console.log("log out")
    signOut(auth).then(async () => {
        // success
        // localStorage.removeItem("uid")
        useUID.value = undefined
        console.log("success")
        await navigateTo("/")
    }).catch((error: any) => {
        console.error(error)
        alert("An error has occured. See log for more info")
    })
}
</script>
<script lang="ts">
import { onAuthStateChanged } from 'firebase/auth';
export default {
    async beforeMount() {
        const app = useFirebaseApp();
        const auth = getAuth();
        const useUID = useState<string | undefined>("uid");
        onAuthStateChanged(auth, async (user) => {
            if (!(user?.uid)) {
                await navigateTo("/signup");
            } else {
                useUID.value = user.uid;
            }
        })
    },
    mounted() {
        // ChatGPT (isSubdomain)
        const isSubdomain = (url: any, domain: any) => {
            try {
                const hostname = new URL(url).hostname;
                return hostname.endsWith('.' + domain) && hostname.split('.').length > domain.split('.').length;
            } catch (e) {
                // Handle invalid URLs
                return false;
            }
        }
        const currentHref = useState('currentHref')
        function removeNewFromURL(url: string) {
            if (url.includes("/new/")) {
                return url.replace("/new/", "/");
            } else if (url.includes("/new")) {
                return url.replace("/new", "/");
            } else {
                return url
            }
        }
        currentHref.value = removeNewFromURL(window.location.href)
        // console.log(currentHref.value)
        const appName = useState('appName')
        if (isSubdomain(currentHref.value, "inedible.dev")) {
            appName.value = "Inedible"
        } else {
            appName.value = "Puntawat"
        }
    },
}
</script>

<template>
    <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div class="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
            <ul class="flex items-center hidden space-x-8 lg:flex">
                <!-- <li>
            <a
              href="/"
              aria-label="Our product"
              title="Our product"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >Product</a
            >
          </li>
          <li>
            <a
              href="/"
              aria-label="Our product"
              title="Our product"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >Features</a
            >
          </li>
          <li>
            <a
              href="/"
              aria-label="Product pricing"
              title="Product pricing"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-blue-accent-400"
              >Pricing</a
            >
          </li> -->
            </ul>
            <a href="/" aria-label="Company" title="Company" class="inline-flex items-center lg:mx-auto">
                <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">URL Shortener</span>
            </a>
            <ul class="flex items-center ml-auto space-x-8 lg:flex">
                <li>
                    <button aria-label="Sign in" title="Log Out" @click="logOut"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-accent-400">
                        Log Out
                    </button>
                </li>
                <li>
                    <a href="/dash"
                        class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up" title="Sign up">
                        Dashboard
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="text-center justify-center flex flex-col items-center h-screen content-center object-center">
        <h1 class="text-[35px] font-bold mb-[30px]">{{ appName }}'s URL Shortener</h1>

        <div class="flex-row flex mx-auto">
            <input type="text"
                class="bg-gray-50 border border-gray-300 outline-none mr-[15px] text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                placeholder="URL" name="url" v-model="url" v-if="isInput" required autocomplete="off" autofocus>
            <div type="text"
                class="bg-gray-50 border pt-[12px] border-gray-300 outline-none mr-[15px] text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                id="urlField" v-if="!isInput">
                {{ currentHref }}{{ url }}</div>
            <button
                class="outline-none transition-all ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-500 dark:highlight-white/20 hover:bg-sky-400"
                type="submit" @click="onShorten" v-if="isInput">Shorten</button>
            <button
                class="outline-none transition-all ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-500 dark:highlight-white/20 hover:bg-sky-400"
                type="submit" @click="onCopy" v-if="!isInput">Copy</button>
        </div>
    </div>
</template>