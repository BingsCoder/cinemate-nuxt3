<template>
    <div class="content">
        <Header />
        <slot />
        <Footer />
    </div>
</template>

<script setup>

</script>

<style scoped>
.content {
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 20px;
    text-align: center;
}
</style>