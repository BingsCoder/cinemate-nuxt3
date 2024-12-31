<template>
    <div>
        <div class="movie-info bg-blend-overlay" :style="backgroundStyle">

            <img :src="posterUrl" alt="" class="movie-poster" />
            <div class="movie-detail" v-if="!shouldShow">
                <h1>{{ data.title }} <span>({{ year }})</span></h1>
                <p>{{ data.release_date }} {{ genres }} {{ duration }}</p>
                <p>IMDB链接：<ULink :to="`https://imdb.com/title/${data.imdb_id}`" target="_blank">{{ data.imdb_id }}
                    </ULink>
                </p>
                <br>
                <h2>剧情简介</h2>
                <p>{{ data.overview }}
                </p>
                <br>
                <h2>主创人员</h2>
                <div class="movie-creators">
                    <div class="creator" v-for="creator in creators" :key="creator.id">
                        <h3>{{ creator.name }}</h3>

                        <p>{{ jobMap[creator.job] }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="movie-detail-sm" v-if="shouldShow">
            <h1>{{ data.title }} <span>({{ year }})</span></h1>
            <p>{{ data.release_date }} {{ genres }} {{ duration }}</p>
            <p>IMDB链接：<ULink :to="`https://imdb.com/title/${data.imdb_id}`" target="_blank">{{ data.imdb_id }}
                </ULink>
            </p>
            <br>
            <h2>剧情简介</h2>
            <p>{{ data.overview }}
            </p>
            <br>
            <h2>主创人员</h2>
            <div class="movie-creators">
                <div class="creator" v-for="creator in creators" :key="creator.id">
                    <h3>{{ creator.name }}</h3>

                    <p>{{ jobMap[creator.job] }}</p>
                </div>
            </div>
        </div>
        <div class="movie-cast">
            <h2>主演</h2>
            <div class="actors">
                <MovieCard v-for="actor in data.credits.cast.slice(0, 9)" :key="actor.id" :title="actor.name"
                    :posterPath="actor.profile_path" :secdonaryTitle="actor.character"
                    class="rounded-b-lg actor-card" />

                <div class="actor-card actor-card-more">
                    <h2>
                        <ULink :to="`/movie/${id}/credits`">查看更多-></ULink>
                    </h2>

                </div>


            </div>

        </div>
        <br>
    </div>
</template>

<script setup>

const { isMobile } = useDevice()

const { id } = useRoute().params

const runtimeConfig = useRuntimeConfig()
const nuxtApp = useNuxtApp()

const { data, error, refresh } = await useFetch(`/api/movie/id`, {
    query: {
        'id': id,
    },
    getCachedData: key => {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
})

if (error.value) {
    throw createError('请求失败')
}

const posterUrl = 'https://image.tmdb.org/t/p/w440_and_h660_face' + data.value.poster_path
const year = new Date(data.value.release_date).getFullYear()
const genres = data.value.genres.map(genre => genre.name).join(' / ')
const duration = computed(() => {
    const hours = Math.floor(data.value.runtime / 60)
    const minutes = data.value.runtime % 60
    return `${hours}小时${minutes}分钟`
})

const imageUrl = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + data.value.backdrop_path

const backgroundStyle = computed(() => ({
    // position: 'relative',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '30% top',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',    // height: '400px', // Set the height of the div
}));

const creators = data.value.credits.crew.filter(crew => crew.job === 'Director' || crew.job === 'Screenplay').sort((a, b) => a.job.localeCompare(b.job))
const jobMap = {
    'Director': '导演',
    'Screenplay': '编剧'
}

const shouldShow = useState('shouldShow', () => {
    if (import.meta.env.SSR) {
        return isMobile
    } else {
        return window.innerWidth <= 576;
    }
})

const checkScreenSize = () => {
    shouldShow.value = window.innerWidth <= 576
};

const throttledCheckScreenSize = useThrottle(checkScreenSize, 1000)

onBeforeMount(() => {
    checkScreenSize();
    window.addEventListener('resize', throttledCheckScreenSize);
});


onBeforeUnmount(() => {
    window.removeEventListener('resize', throttledCheckScreenSize);
});

useHead({
    title: `${data.value.title}详情-Cinemate`,
    meta: [
        { name: 'description', content: `电影《${data.value.title}》简介：${data.value.overview || ''}` }
    ],
});

</script>

<style scoped>
.movie-info {
    display: flex;
    justify-content: left;
    /* position: relative; */
}


.movie-poster {
    /* position: relative; */
    width: 30%;
    height: fit-content;
    /* z-index: 1; */
    margin: 0;


}


.movie-detail {
    /* position: relative; */
    /* z-index: 1; */
    color: white;
    margin: 20px;
}

.movie-detail-sm {
    margin: 20px;
}

.movie-creators {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
}

.movie-cast {
    margin-top: 20px;
}

.actors {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 20px;
    margin-top: 10px;
    padding: 10px;
}

.actor-card {
    display: inline-block;
    min-width: 120px;
}

.actor-card-more {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>