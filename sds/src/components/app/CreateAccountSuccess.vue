<template>
    <div style="padding: 60px 20px 60px 20px; text-align: left; ">
        <h3 class="subheading-txt">
            Please check your email
        </h3>

        <p class="pt-6">
            A verification email has been sent to {{ email }}.
        </p>

        <p>
            If you did not receive an email, please check your mail filter or use a different email.
        </p>
    </div>
</template>

<script>
export default {
    name: 'CreateAccountSuccess',
    props: {
        email: { type: String, required: true },
    },
}
</script>

<style>
</style>