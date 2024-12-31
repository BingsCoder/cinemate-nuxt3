<template>
    <div>
        <NuxtLayout name="movie-page" title="正在热映" apiPath="now_playing">

        </NuxtLayout>
    </div>
</template>

<script setup>
useHead({
    title: '正在上映电影-Cinemate',
    meta: [
        { name: 'description', content: '2025年正在上映的电影' }
    ],
})
</script>