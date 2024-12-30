<template>
    <div class="person-card">
        <img :src="imageUrl || 'https://placehold.co/60x60?text=No+Image'" alt="">
        <div>
            <h2>{{ title }}</h2>
            <p>{{ secondTitle }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    secondTitle: String,
    imagePath: String
})

const imageUrl = computed(() => {
    if (props.imagePath) {
        return `https://image.tmdb.org/t/p/w132_and_h132_face${props.imagePath}`
    }
})

</script>

<style scoped>
.person-card {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

img {
    width: 60px;
    height: 60px;
    border-radius: 10%;
    margin-right: 10px;
}
</style>