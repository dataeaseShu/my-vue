import Vue from 'vue'
// import App from './vueGridLayout/drag.vue' // coustomDrag
// import App from './vueGridLayout/coustomDrag.vue' // coustomDrag src/customComponent/messages.vue
// import App from './customComponent/drawer.vue' // coustomDrag src/customComponent/messages.vue
import App from './styleTest/index.vue' // coustomDrag src/customComponent/messages.vue
// import App from './vueGridLayout'
// import App from './App'
// import App from './gridTable/testCase.vue'
// import App from './styleTest'
import ElementUI from 'element-ui';
import './assets/elementUi.scss'
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.config.productionTip = false
// import a from 'file-loader?enforce=pre!./obt.kl'
new Vue({
  render: h => h(App),
}).$mount('#app')
