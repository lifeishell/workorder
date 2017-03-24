import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Index from "../modules/index/index.vue";

Vue.use(VueRouter);
Vue.use(Vuex);

var vm = new Vue({
    el: "#main",
    render: x => x(Index)
})