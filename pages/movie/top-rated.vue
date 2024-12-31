<template>
    <div>
        <NuxtLayout name="movie-page" title="高分电影" apiPath="top_rated">

        </NuxtLayout>
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