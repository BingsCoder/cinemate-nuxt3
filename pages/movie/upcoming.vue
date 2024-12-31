<template>
    <div>
        <NuxtLayout name="movie-page" title="即将上映" apiPath="upcoming">

        </NuxtLayout>
    </div>
</template>

<script setup>
useHead({
    title: '即将上映电影-Cinemate',
    meta: [
        { name: 'description', content: '2025年即将上映的电影列表' }
    ],
})
</script>