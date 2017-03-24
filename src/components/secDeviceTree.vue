<template>
    <sec-device-tree class="device-tree">
        <i class="fa-icon js-open-close" title="收折"></i>
        <div class="filter-type">
            分类查看：
            <span v-for="mod in modes" :class="{ on: enabledMod == mod.id }" @click="changeMod(mod.id)">{{mod.name}}</span>
        </div>

        <div class="device-tree__search">
            <input type="text" class="form-control" @keyup="searchDevice()" v-model="search" :placeholder="placeholder" />
            <i class="fa-search text-primary" @click="searchDevice()"></i>
            <ul class="device-tree__search--result" v-if="search">
                <li v-for="device in deviceFilter" :title="device.alias+device.ip">
                    <i class="fa-desktop" v-show="getDeviceType(device) == 'vps'"></i>
                    <i :class="'fa-'+ getDeviceType(device)" v-show="getDeviceType(device) != 'vps'"></i>
                    {{device.alias}}（{{device.ip}}）
                </li>
                <li v-if="searchDevice.length == 0">没有结果</li>
            </ul>
        </div>

        <div class="device-tree-scroll-wrap">
            <sec-tree-leaf :models="idcs"></sec-tree-leaf>
        </div>
    </sec-device-tree>
</template>

<script>
    import helper from '../utils/helper.js';
    import SecTreeLeaf from './secTreeLeaf.vue';
    import idc from '../json/idc.json';

    export default {
        props: {
            devices: Array
        },
        data: function() {
            idc.data.forEach(d => d.children = [] );
            return {
                enabledMod: 'byIdc',
                search: '',
                idcs: idc.data,
                deviceFilter: [],
                modes: [{
                    id: 'byIdc',
                    name: '机房',
                    placeholder: '搜索 机房/设备'
                }, {
                    id: 'byType',
                    name: '类型',
                    placeholder: '搜索 设备类型/设备'
                }, {
                    id: 'byBrand',
                    name: '品牌',
                    placeholder: '搜索 品牌/设备'
                }],
                deviceTypeMapping: {
                    '路由器': 'router',
                    '交换机': 'switch',
                    '防火墙': 'firewall',
                    '主机': 'vps'
                }
            };
        },
        methods: {
            changeMod: function(id){
                this.enabledMod = id;
            },
            searchDevice: helper.debounce(function(){
                this.deviceFilter = this.devices.filter(d =>d.ip.indexOf(this.search) != -1);
            }, 500, true),
            getDeviceType: function(dev){
                return this.deviceTypeMapping[dev.type];
            }
        },
        computed: {
            placeholder: function(){
                return this.modes.filter(m => m.id == this.enabledMod)[0].placeholder;
            }
        },
        components: {
            SecTreeLeaf
        }
    }
</script>
<style scoped lang="sass">
    @import "../sass/themes/default/style.scss";
</style>