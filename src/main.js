import Vue from 'vue'
// import App from './vueGridLayout/drag.vue' // coustomDrag
// import App from './vueGridLayout/coustomDrag.vue' // coustomDrag src/customComponent/messages.vue
// import App from './customComponent/confirm.vue' // coustomDrag src/customComponent/messages.vue
// import App from './vueGridLayout'
// import App from './App'
import App from './gridTable/testCase.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
console.log(1, App)
Vue.use(ElementUI)
Vue.config.productionTip = false
import a from 'file-loader?enforce=pre!./obt.kl'
console.log(2, a);
new Vue({
  render: h => h(App),
}).$mount('#app')
