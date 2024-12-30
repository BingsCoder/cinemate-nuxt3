<template>
    <div>
        <h1>{{ title }}</h1>

        <p v-if="movies.length === 0">loading</p>
        <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            <MovieCard v-for="movie in movies" :title="movie.name" :secdonaryTitle="movie.first_air_date"
                :posterPath="movie.poster_path" class="h-auto max-w-full rounded-b-lg" @click="clickMovie(movie.id)" />
        </div>
        <br>

        <UButton v-if="hasMoreData" @click="handleRefresh">加载更多</UButton>
        <p v-else style="text-align: center;">——— 已经到底了 ————</p>



    </div>
</template>

<script setup>

const nuxtApp = useNuxtApp()

const layoutProps = useAttrs()
const title = layoutProps.title
const apiPath = layoutProps.apiPath


const page = useState(`tv-page-${apiPath}`, () => 1)
const movies = useState(`tv-${apiPath}`, () => [])

const maxPage = ref(null)

const hasMoreData = computed(() => {
    if (!maxPage.value) {
        return true
    } else {
        return maxPage.value > page.value
    }

})

const { data, error } = await useFetch('/api/tv/list', {

    query: {
        path: apiPath,
        page: page,

    },
    transform: (data) => {
        movies.value = removeDuplicatesById(movies.value.concat(data.results))
        maxPage.value = data.total_pages
        return data
    },
    getCachedData: key => {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
    watch: [page]
})

// Function to remove duplicates by key
function removeDuplicatesById(arr) {
    const seen = new Set();
    return arr.reduce((acc, obj) => {
        if (obj.poster_path && !seen.has(obj.id)) {
            seen.add(obj.id);
            acc.push(obj);
        }
        return acc;
    }, []);
}

const handleRefresh = async () => {
    if (!maxPage.value || page.value < maxPage.value) {
        page.value++
    }
}

const clickMovie = (id) => {
    navigateTo(`/tv/${id}`)
}

</script>


<style scoped></style>