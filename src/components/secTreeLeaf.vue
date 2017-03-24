<template>
    <div class="device-tree__content">
        <ul v-for="model in models" class="acl-collapse-list">
            <li class="acl-collapse-list--head" :title="model.name_cn + model.name_en" @click="openTree(model)">
                {{model.name_cn}}（{{model.name_en}}）
            </li>
            <li class="acl-collapse-list--content" v-if="!leaf">
                <sec-tree-leaf :model="model.children"></sec-tree-leaf>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        props: {
            models: Array
        },
        data: function() {
            return {
            };
        },
        methods: {
            openTree: function(){

            }
        },
        computed: {
            leaf: function(){
                return this.model && this.model.children && this.model.children.length;
            }
        }
    }
</script>
<style scoped lang="sass">
    @import "../sass/themes/default/style.scss";
</style>