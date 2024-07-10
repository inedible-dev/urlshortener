<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Inedible.dev's URL Shortener",
  meta: [
    { name: 'description', content: 'URL Shortener' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
  ]
})
</script>
