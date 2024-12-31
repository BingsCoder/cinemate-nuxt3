<template>
    <div>
        <div class="custom-header flex justify-between items-center grid grid-cols-1 md:grid-cols-3 center">
            <ULink to="/">
                <div class="logo col-span-1">
                    <img src="~/assets/images/logo.png" alt="logo" />
                    <h1>Cinemate</h1>
                </div>
            </ULink>
            <UNavigationMenu arrow :items="items" class="items-center col-span-2 hover:z-1">

            </UNavigationMenu>
        </div>
        <div>
            <UInput v-if="isSearching" v-model:model-value="searchText" placeholder="请输入关键词搜索"
                icon="i-ic-baseline-search" class="w-full mb-8" size="lg" :autofocus="true" @keyup.enter="search">
                <template v-if="searchText?.length" #trailing>
                    <UButton color="neutral" variant="link" size="sm" icon="i-lucide-circle-x" aria-label="Clear input"
                        @click="searchText = ''" />
                </template>
            </UInput>
        </div>
    </div>

</template>

<script setup>
const searchIcon = computed(() => {
    if (isSearching.value) {
        return 'ic-baseline-close'
    } else {
        return 'ic-baseline-search'
    }
})

const searchLabel = computed(() => isSearching.value ? '' : '搜索')

const handleSearch = () => {
    if (!isSearching.value) {
        isSearching.value = true
    } else {
        isSearching.value = false
    }
}

const search = async () => {
    const trimText = searchText.value.trim()
    if (trimText.length === 0) {
        searchText.value = null
    } else {
        isSearching.value = false
        searchText.value = null

        const movies = useSearchMovie()
        movies.value = []
        const tvs = useSearchTv()
        tvs.value = []

        await navigateTo({
            path: '/search',
            query: {
                q: trimText,
                page: 1
            }
        })
    }

}

const items = ref([

    [
        {
            label: "首页",
            icon: "ic-baseline-house",
            to: "/",
        },
        {
            label: "电影", icon: "ic-baseline-movie", children: [
                {
                    label: '正在上映',
                    to: '/movie/now-playing',
                    icon: 'ic-baseline-smart-display'
                },
                {
                    label: '热门电影',
                    to: '/movie/hot',
                    icon: 'ic-baseline-whatshot'
                },
                {
                    label: '高分电影',
                    to: '/movie/top-rated',
                    icon: 'ic-baseline-thumb-up'
                },
                {
                    label: '即将上映',
                    to: '/movie/upcoming',
                    icon: 'ic-baseline-rocket-launch'
                }

            ]
        },
        {
            label: "电视剧集", icon: "ic-baseline-tv", children: [
                {
                    label: '正在热播',
                    to: '/tv/on-the-air',
                    icon: 'ic-baseline-smart-display'
                },
                {
                    label: '热门剧集',
                    to: '/tv/hot',
                    icon: 'ic-baseline-whatshot'
                },
                {
                    label: '高分剧集',
                    to: '/tv/top-rated',
                    icon: 'ic-baseline-thumb-up'
                }
            ]
        },
    ],
    [{ icon: searchIcon, onSelect: handleSearch, label: searchLabel }],
]);

const isSearching = ref(false)
const searchText = ref(null)



</script>

<style scoped>
.custom-header {
    margin-bottom: 20px;
    z-index: 1;
}

img {
    height: 40px;
}

.logo {
    display: flex;
    align-items: center;
    margin-right: 20px;
    padding-right: 20px;
}
</style>
