<template>
<body id="main">
    <sec-header></sec-header>
    <div>
    </div>
    <sec-footer></sec-footer>
</body>
</template>
<script>
    import SecHeader from '../../components/secHeader.vue';
    import SecFooter from '../../components/secFooter.vue';

    export default {
        name: 'main',
        data: function() {
            return {
            }
        },
        components: {
            SecHeader,
            SecFooter
        }
    }
</script>
<style lang="sass">
    @import "../../sass/themes/default/style.scss";
</style>