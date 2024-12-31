<template>
    <div>
        <div class="grid grid-cols-4 gap-4">
            <div class="bg-red col-span-1">
                <h2>搜索结果</h2>
                <br>
                <UNavigationMenu :items="items" orientation="vertial" variant="pill">
                    <template #movie-trailing>
                        <UBadge :label="movies?.length" variant="subtle" size="sm" />
                    </template>
                    <template #tv-trailing>
                        <UBadge :label="tvs ? tvs.length : 0" variant="subtle" size="sm" />
                    </template>
                </UNavigationMenu>
            </div>


            <div v-if="isMovieSelected" class="movie-results col-span-3">
                <SearchResultCard v-for="movie in movies" :title="movie.title" :originalTitle="movie.original_title"
                    :posterPath="movie.poster_path" :desc="movie.overview" :releaseDate="movie.release_date"
                    @click="clickMovie(movie.id)" />
            </div>
            <div v-else class="movie-results col-span-3">
                <SearchResultCard v-for="movie in tvs" :title="movie.name" :originalTitle="movie.original_name"
                    :posterPath="movie.poster_path" :desc="movie.overview" :releaseDate="movie.first_air_date"
                    @click="clickTv(movie.id)" />
            </div>
        </div>
        <UButton v-if="hasMoreData" @click="handleRefresh">加载更多</UButton>
        <p v-else style="text-align: center;">——— 已经到底了 ————</p>


    </div>
</template>

<script setup>
const route = useRoute()
const isMovieSelected = ref(true)

const items = computed(() => ([
    {
        label: '电影',
        icon: 'ic-baseline-movie',
        slot: 'movie',
        active: isMovieSelected.value,
        onSelect: () => {
            isMovieSelected.value = true
        }
    },
    {
        label: '剧集',
        icon: 'ic-baseline-tv',
        slot: 'tv',
        active: !isMovieSelected.value,
        onSelect: () => {
            isMovieSelected.value = false
        }
    },
]))


const q = computed(() => route.query.q)
const page = useState(`search-page`, () => 1)

const movies = useSearchMovie()
const tvs = useSearchTv()
const maxPage = ref()

await useFetch('/api/search', {
    server: false,
    query: {
        q: q,
        page: page
    },
    transform: (data) => {
        movies.value = removeDuplicatesById(movies.value.concat(data.movie))

        tvs.value = removeDuplicatesById(tvs.value.concat(data.tv))

        maxPage.value = data.total
    },
    watch: [q, page]
})

const handleRefresh = async () => {
    if (!maxPage.value || page.value < maxPage.value) {
        page.value++
    }
}

const hasMoreData = computed(() => {
    console.log('has more data:', maxPage.value, page.value)
    if (!maxPage.value) {
        return true
    } else {
        return maxPage.value > page.value
    }

})

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

useSeoMeta({
    title: '搜索-Cinemate',
    ogTitle: '搜索-Cinemate',
    description: '输入名称搜索电影和剧集',
    ogDescription: '输入名称搜索电影和剧集',
})

</script>

<style lang="scss" scoped>
// .result {
//     display: flex;
//     justify-content: space-between;
// }</style>