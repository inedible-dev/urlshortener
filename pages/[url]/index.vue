<script>
export default {
    async beforeMount () {
        const route = useRoute()
        const data = await $fetch.raw("/api/checkUrl", {
            method: "POST",
            body: {
                id: route.params.url
            }
        })
        if (data._data == "not found") {
            document.querySelector("body").innerHTML = `URL Not Found`
        } else {
            window.location.replace(data._data.url)
        }
    }
}
</script>