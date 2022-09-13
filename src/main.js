import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "@/assets/styles/common.css";
import "@/assets/styles/icon/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
