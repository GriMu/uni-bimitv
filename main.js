import Vue from 'vue'
import App from './App'
import store from './store'

import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$ak = 'l2V|gfZp{8`;jzR~6Y1_';
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

 



