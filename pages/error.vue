<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})
</script>

<template>
    <div>
        <h1>{{ error.statusCode }}</h1>
        <h1>找不到你要的页面</h1>
        <p>请检查下是不是id输错了</p>
        <NuxtLink to="/">Go back home</NuxtLink>
    </div>
</template>