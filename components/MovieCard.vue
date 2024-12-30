<template>
    <UCard class="movie-card">
        <img :src="posterUrl" />
        <template #footer>
            <h2>{{ title }}</h2>
            <p>{{ secdonaryTitle }}</p>
        </template>
    </UCard>
</template>

<script setup>
const props = defineProps({
    title: String,
    posterPath: String,
    secdonaryTitle: String,
})

const posterUrl = computed(() => {
    if (props.posterPath) {
        return `https://image.tmdb.org/t/p/w440_and_h660_face${props.posterPath}`
    } else {
        return 'https://placehold.co/440x660?text=No+Image'
    }
})

</script>

<style scoped></style>