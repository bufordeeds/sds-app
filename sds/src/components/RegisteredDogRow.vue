<script>
import Avatar from './app/avatar.vue';

export default {
    name: "RegisteredDogRow",
    props: {
        ...Avatar,
    }
}
</script>

<template>
    <div>
        <Avatar />
    </div>
</template>

<style scoped>
</style>
