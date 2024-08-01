import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"

export default defineNuxtRouteMiddleware(async (to, from) => {
    // if (to.path === "/") {
    //     return navigateTo('/signup')
    // }
    const allowPath = ["/", "/login", "/nof", "/signup", "/dash", "/api/checkUrl", "/api/newUrl", "/api/addUser", "/new", "/fog", "/_nuxt/env.ts"]
    if (!(allowPath.includes(to.path))) {
        let path = to.path
        path = path.substring(1)
        const data = await $fetch("/api/checkUrl", {
            method: "POST",
            body: {
                id: path
            }
        })
        // console.log(data)
        if (data == "not found") {
            return navigateTo('/nof')
        } else {
            return navigateTo(data.url, { external: true })
        }
    }
})