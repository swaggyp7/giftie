import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import Home from "./Home.vue";
import Edit from "./Edit.vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import VueAwesomeSwiper from "vue-awesome-swiper";
import LuckDraw from "vue-luck-draw";
import "swiper/swiper-bundle.css";

const routes = [
  { path: "/", component: Home },
  { path: "/edit", component: Edit },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

Vue.use(VueRouter);
Vue.use(VueAwesomeSwiper /* { default options with global component } */);
Vue.use(LuckDraw);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
