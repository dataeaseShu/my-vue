import Vue from 'vue'
// import App from './vueGridLayout/drag.vue' // coustomDrag
// import App from './vueGridLayout/coustomDrag.vue' // coustomDrag src/customComponent/messages.vue
// import App from './customComponent/confirm.vue' // coustomDrag src/customComponent/messages.vue
// import App from './vueGridLayout'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
