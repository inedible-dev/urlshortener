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
      <a href="/dash" aria-label="Company" title="Company" class="inline-flex items-center lg:mx-auto">
        <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">URL Shortener</span>
      </a>
      <ul class="flex items-center ml-auto space-x-8 lg:flex">
        <li>
          <button aria-label="Sign in" title="Sign in" @click="logOut"
            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-accent-400">
            Log Out
          </button>
        </li>
        <!-- <li>
            <a
              href="/"
              class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Sign up
            </a>
          </li> -->
      </ul>
    </div>
  </div>
  <section class="py-1 bg-blueGray-50">
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-base text-blueGray-700">Page Visits</h3>
            </div>
            <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <a
                href="/new"
                class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button">Create new</a>
                <a
                href="/dash"
                class="bg-sky-600 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button">Reload</a>
            </div>
          </div>
        </div>

        <div class="block w-full overflow-x-auto">
          <table class="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Page URL
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Visitors
                </th>
              </tr>
            </thead>

            <tbody>
              <!-- <tr>
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  <a href="https://www.youtube.com/">https://www.youtube.com/</a>
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  4,569
                </td>
              </tr> -->
              <tr v-for="url in urls">
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                  <button @click="copy(url.id)">{{ url.url }}</button>
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  {{ url.visits }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
import { getAuth, signOut } from 'firebase/auth';

export default {
    async beforeMount() {
        if (!localStorage.getItem("uid")) {
            await navigateTo("/")
        }
    },
    async mounted() {
      const currentHref = useState<string>("dashHref")
      const href = window.location.href
      if (href.includes("/dash/")) {
        currentHref.value = href.replace("/dash/", "/")
      } else if (href.includes("/dash")) {
        currentHref.value = href.replace("/dash", "/")
      } else {
        currentHref.value = href
      }
      const urls = useState<any>("urlData")
      const url = await $fetch.raw("/api/checkUser", {
          method: "POST",
          body: {
            user_id: `${localStorage.getItem("uid")}`
          }
        })
        if (url.status !== 200) {
          alert("Error")
        } else {
          if (url._data == "not found") {
            alert("No URLs found, try to create new.")
          } else {
            urls.value = url._data
          }
        }
    }
}

</script>
<script setup lang="ts">
const app = useFirebaseApp();
const auth = getAuth();

const urls = useState<any>("urlData")
const currentHref = useState<string>("dashHref")

const logOut = () => {
  console.log("Log Out");
  signOut(auth).then(async () => {
    // success
    localStorage.removeItem("uid")
    console.log("Log out succuss")
    await navigateTo("/signup")
  }).catch((error: any) => {
    // failure
    console.log(error)
  })
}

const copy = (url: string) => {
  navigator.clipboard.writeText(`${currentHref.value}${url}`)
  alert(`Copied ${currentHref.value}${url} to clipboard`)
}
</script>