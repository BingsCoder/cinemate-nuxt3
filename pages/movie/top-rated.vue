<template>
    <div>
        <LazyNuxtLayout name="movie-page" title="高分电影" apiPath="top_rated">

        </LazyNuxtLayout>
    </div>
</template>

<script setup>
useHead({
    title: '高分电影-Cinemate',
    meta: [
        { name: 'description', content: '全球历史评分最高的电影列表' }
    ],
})
</script>