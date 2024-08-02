<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';

const newColorScheme = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    newColorScheme.value = event.matches ? "dark" : "light";
});

const { $toast } = useNuxtApp()

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
        $toast.error("Not a valid URL")
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
                $toast.error(err.message)
            }
            isInput.value = false
            url.value = `${urlString}`
            break;
        }
    }
}

const onCopy = () => {
    navigator.clipboard.writeText(`${currentHref.value}${url.value}`)
    $toast.success(`Copied ${currentHref.value}${url.value} to clipboard.`)
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
        $toast.error("An error has occured. See log for more info")
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
    <Toaster position="top-center" richColors :theme="newColorScheme" />
    <div class="dark:bg-gray-900 min-h-screen dark:text-gray-200">
        <!-- Header -->
        <header class="dark:bg-gray-900 dark:text-white border-b dark:border-none">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <a href="/" class="text-xl font-bold">URL Shortener</a>
                    <nav>
                        <ul class="flex space-x-4 items-center">
                            <li>
                                <button @click="logOut"
                                    class="text-sm hover:text-gray-300 transition-colors duration-200">
                                    Log Out
                                </button>
                            </li>
                            <li>
                                <a href="/dash"
                                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 class="text-3xl font-bold text-center mb-8 dark:text-white">{{ appName }}'s URL Shortener</h1>

            <div class="flex space-x-4">
                <input v-if="isInput" type="text"
                    class="flex-grow px-3 outline-none py-2 dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                    placeholder="Enter URL to shorten" v-model="url" required autocomplete="off" autofocus>
                <div v-else
                    class="flex-grow px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white">
                    {{ currentHref }}{{ url }}
                </div>
                <button v-if="isInput" @click="onShorten"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Shorten
                </button>
                <button v-else @click="onCopy"
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Copy
                </button>
            </div>
        </main>
    </div>
</template>