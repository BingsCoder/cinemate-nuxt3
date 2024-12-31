<template>
    <div>
        <NuxtLayout name="movie-page" title="热门电影" apiPath="popular">

        </NuxtLayout>
    </div>
</template>

<script setup>
useHead({
    title: '热门电影-Cinemate',
    meta: [
        { name: 'description', content: '2025年近期热门电影' }
    ],
})
</script>