<template>
  <Toaster position="top-center" richColors theme="dark" />
  <div class="bg-gray-900 min-h-screen text-gray-200">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <a href="/dash" class="text-xl font-bold text-white">URL Shortener</a>
          <nav>
            <ul class="flex space-x-4 items-center">
              <li>
                <button @click="logOut" class="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div class="px-4 py-5 border-b border-gray-700 sm:px-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-white">Page Visits</h3>
            
            <a href="/new"
              class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create new
            </a>
          </div>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-700">
              <thead class="bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Page URL
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Visitors
                  </th>
                </tr>
              </thead>
              <tbody class="bg-gray-800 divide-y divide-gray-700">
                <tr v-for="url in urls" :key="url.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button @click="copy(url.id)" class="text-blue-400 hover:text-blue-300">{{ url.url }}</button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {{ url.visits }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script lang="ts">
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

export default {
  async beforeMount() {
    const app = useFirebaseApp();
    const auth = getAuth();
    const useUID = useState < string | undefined > ("uid");
    onAuthStateChanged(auth, async (user) => {
      if (!(user?.uid)) {
        await navigateTo("/signup");
      } else {
        useUID.value = user.uid;
        const currentHref = useState < string > ("dashHref")
        const href = window.location.href
        if (href.includes("/dash/")) {
          currentHref.value = href.replace("/dash/", "/")
        } else if (href.includes("/dash")) {
          currentHref.value = href.replace("/dash", "/")
        } else {
          currentHref.value = href
        }
        const urls = useState < any > ("urlData")
        const url = await $fetch.raw("/api/checkUser", {
          method: "POST",
          body: {
            user_id: `${useUID.value}`
          }
        })
        if (url.status !== 200) {
          $toast.error("Error")
        } else {
          if (url._data == "not found") {
            $toast.error("No URLs found, try to create new.")
          } else {
            urls.value = url._data
          }
        }
      }
    })
  }
}

</script>
<script setup lang="ts">
const { $toast } = useNuxtApp()
const app = useFirebaseApp();
const auth = getAuth();

const urls = useState<any>("urlData")
const currentHref = useState<string>("dashHref")
const useUID = useState<string | undefined>("uid")

const logOut = () => {
  console.log("Log Out");
  signOut(auth).then(async () => {
    // success
    // localStorage.removeItem("uid")
    useUID.value = undefined
    console.log("Log out succuss")
    await navigateTo("/signup")
  }).catch((error: any) => {
    // failure
    console.log(error)
  })
}

const copy = (url: string) => {
  navigator.clipboard.writeText(`${currentHref.value}${url}`)
  $toast.success(`Copied ${currentHref.value}${url} to clipboard`)
}
</script>