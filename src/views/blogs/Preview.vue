<template>
    <div>
        <editor v-bind:content="detail" editor-height="600"></editor>
    </div>
</template>

<script>
    import editor from '../common/Editor'
    export default {
        name: "preview",
        components: {editor},
        methods: {
            // getDetail: function() {
            //     return this.$router.params.detail;
            // }
        },
        data() {
            return {
                detail: this.$route.params.detail
            }
        }
    }
</script>

<style scoped>

</style>