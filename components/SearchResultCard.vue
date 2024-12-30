<template>
    <UCard>

        <template #default>
            <div class="search-result-card">

                <img :src="posterUrl" alt="" class="rounded-l-md">
                <div>
                    <div class="pb-5">
                        <div class="flex items-center">
                            <h2 class="pr-2">{{ title }}</h2>
                            <h3 v-if="title != originalTitle" class="text-gray-500">{{ originalTitle }}</h3>

                        </div>
                        <p>{{ releaseDate }}</p>
                    </div>

                    <p class="three-lines">{{ desc }}</p>
                </div>
            </div>

        </template>

    </UCard>

</template>

<script setup>

const props = defineProps({
    title: String,
    originalTitle: {
        type: String,
        default: null,
        required: false,
    },
    releaseDate: String,
    posterPath: String,
    desc: String
})


const posterUrl = computed(() => {
    return props.posterPath ? `https://image.tmdb.org/t/p/w94_and_h141_bestv2/${props.posterPath}` : `https://placehold.co/94x141?text=No+Image`
})

</script>

<style lang="css" scoped>
.search-result-card {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
    border: 2px solid primary;
}

.search-result-card img {
    width: 94px;
    margin-right: 20px;

}

.three-lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
    line-clamp: 3;
}
</style>