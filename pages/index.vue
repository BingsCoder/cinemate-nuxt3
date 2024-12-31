<template>
    <div>
        <UCarousel v-if="popularMovies && popularTvs" v-slot="{ item }" dots arrows loop :autoplay="{ delay: 3000 }"
            :items="items" class="w-full mx-auto" :ui="{ item: 'basis-1/1' }">
            <div class="image-container" @click="navigateTo(item.to)">
                <img :src="item.image" class="rounded-lg">
                <div class="caption">
                    <h2>{{ item.name }}</h2>
                    <p>{{ item.overview }}</p>
                </div>
            </div>

        </UCarousel>

        <div class="section" v-if="trendingMovies">
            <h1>人气飙升电影</h1>
            <div class="flex nowrap overflow-x-auto gap-4 pb-2">
                <MovieCard class="movie-card" v-for="movie in trendingMovies.slice(0, 10)" :title="movie.title"
                    :secdonary-title="movie.release_date" :poster-path="movie.poster_path"
                    @click="clickMovie(movie.id)" />
            </div>
        </div>


        <div class="section" v-if="trendingTvs">
            <h1>人气飙升剧集</h1>
            <div class="flex nowrap overflow-x-auto gap-4 pb-2">
                <MovieCard class="movie-card" v-for="movie in trendingTvs.slice(0, 10)" :title="movie.name"
                    :secdonary-title="movie.first_air_date" :poster-path="movie.poster_path"
                    @click="clickTv(movie.id)" />
            </div>
        </div>

        <div class="section" v-if="popularMovies">
            <h1>热门电影</h1>
            <div class="flex nowrap overflow-x-auto gap-4 pb-2">
                <MovieCard class="movie-card" v-for="movie in popularMovies.slice(0, 10)" :title="movie.title"
                    :secdonary-title="movie.release_date" :poster-path="movie.poster_path"
                    @click="clickMovie(movie.id)" />
            </div>
        </div>
        <div class="section" v-if="popularTvs">
            <h1>热门剧集</h1>
            <div class="flex nowrap overflow-x-auto gap-4 pb-2">
                <MovieCard class="movie-card" v-for="movie in popularTvs.slice(0, 10)" :title="movie.name"
                    :secdonary-title="movie.first_air_date" :poster-path="movie.poster_path"
                    @click="clickTv(movie.id)" />
            </div>
        </div>

    </div>

</template>

<script setup>
const { data: popularMovies } = await useFetch('/api/movie/list', {
    query: {
        path: 'popular'
    },
    transform: (data) => data.results
})

const { data: trendingMovies } = await useFetch('/api/movie/trending', {
    transform: (data) => data.results
})

const { data: trendingTvs } = await useFetch('/api/tv/trending', {
    transform: (data) => data.results
})

const { data: popularTvs } = await useFetch('/api/tv/list', {
    query: {
        path: 'popular'
    },
    transform: (data) => data.results
})

const items = computed(() => {
    let carouselItems = []

    for (let movie of popularMovies.value.slice(0, 2)) {
        const newItem = {
            name: movie.title,
            to: `/movie/${movie.id}`,
            image: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`,
            overview: movie.overview
        }
        carouselItems.push(newItem)
    }

    for (let tv of popularTvs.value.slice(0, 2)) {
        const newItem = {
            name: tv.name,
            to: `/tv/${tv.id}`,
            image: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${tv.poster_path}`,
            overview: tv.overview

        }
        carouselItems.push(newItem)
    }

    return carouselItems
});

useSeoMeta({
    title: 'Cinemate - Discover movies and tv shows',
    ogTitle: 'Cinemate - Discover movies and tv shows',
    description: 'Discover trending, hot or top-rated movies and tv shows. Data is provided by themoviedb.',
    ogDescription: 'Discover trending, hot or top-rated movies and tv shows. Data is provided by themoviedb.',
})


</script>

<style scoped>
.movie-card {
    min-width: 150px;
}

.section {
    margin-top: 20px;
}

.image-container {
    position: relative;
    display: inline-block;
}

.image-container img {
    display: block;
    width: 100%;
    height: auto;
}

.caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    text-align: center;
    padding: 10px;
}

.caption h2 {
    margin: 5px 0;
}
</style>