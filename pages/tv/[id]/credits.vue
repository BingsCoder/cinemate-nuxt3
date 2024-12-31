<template>
    <div>
        <div class="movie-header">
            <img :src="posterUrl" alt="" class="movie-poster-sm" />
            <div class="header-detail">
                <h1>{{ title }} <span>({{ year }})</span></h1>
                <ULink :to="`/tv/${id}`">
                    <div class="back">
                        <UIcon name="i-ic-baseline-arrow-back" class="size-5" />
                        <h2>返回主界面</h2>
                    </div>
                </ULink>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <h2>演员 <span class="span-text">{{ cast.length }}</span></h2>

                <div class="person-group">
                    <PersonCard v-for="person in cast" :title="person.name" :secondTitle="person.original_name"
                        :image-path="person.profile_path"></PersonCard>
                </div>

            </div>

            <div>
                <h2>工作人员 <span class="span-text">{{ data.credits.crew.length }}</span></h2>

                <div>
                    <div v-for="department in Object.keys(crew)" :key="department">
                        <h3>{{ department }}</h3>
                        <div class="person-group">
                            <PersonCard v-for="person in crew[department]" :title="person.name"
                                :secondTitle="person.job" :image-path="person.profile_path"></PersonCard>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const { id } = useRoute().params

const nuxtApp = useNuxtApp()

// const crew = useState('crew', () => { })


const { data, refresh } = await useFetch(`/tv/${id}`, {
    method: 'get',
    baseURL: runtimeConfig.public.tmdbBaseUrl,
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + runtimeConfig.public.tmdbAccessToken,
    },
    query: {
        'language': 'zh-CN',
        'append_to_response': 'credits'
    },
    getCachedData: key => {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
})

const cast = computed(() => {
    if (data.value) {
        return data.value.credits.cast
    }
})

const crew = computed(() => {
    if (data.value) {
        return groupByDepartment(data.value.credits.crew)
    }
})

const posterUrl = computed(() => {
    if (data.value) {
        return `https://image.tmdb.org/t/p/w440_and_h660_face${data.value.poster_path}`
    }
})

const title = computed(() => {
    if (data.value) {
        return data.value.name
    }
})

const year = computed(() => {
    if (data.value) {
        return data.value.first_air_date.split('-')[0]
    }
})



// const { data: cast, error } = await useFetch(`/movie/${id}/credits`, {
//     method: 'get',
//     baseURL: runtimeConfig.public.tmdbBaseUrl,
//     headers: {
//         'accept': 'application/json',
//         'Authorization': 'Bearer ' + runtimeConfig.public.tmdbAccessToken,
//     },
//     query: {
//         'language': 'zh-CN',
//     },
//     transform: (data) => {
//         crew.value = groupByDepartment(data.crew)
//         return data.cast
//     }
// })

function groupByDepartment(array) {
    return array.reduce((acc, obj) => {
        // Get the department value from the current object
        const dept = obj.department;

        // If the department is not yet a key in the accumulator, add it
        if (!acc[dept]) {
            acc[dept] = [];
        }

        // Push the current object into the array for this department
        acc[dept].push(obj);

        return acc;
    }, {}); // Start with an empty object as the accumulator
}

useSeoMeta({
    title: () => `${data.value.name}演职员表-Cinemate`,
    ogTitle: () => `${data.value.name}演职员表-Cinemate`,
    description: () => `介绍tv剧集《${data.value.name}》所有演职人员。`,
    ogDescription: () => `介绍tv剧集《${data.value.name}》所有演职人员。`,
});


</script>

<style scoped>
.person-group {
    margin-top: 10px;
    /* padding-top: 20px; */
}

.movie-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: antiquewhite;
    max-width: 100%;
}

.movie-header img {
    height: 100px;
    margin: 10px
}

.header-detail {
    color: black;
}

.back {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.span-text {
    color: gray;
    font-size: 16px;
}
</style>