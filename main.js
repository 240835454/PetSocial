import Vue from 'vue'
import App from './App'
import http from './http/api.js'
import 'public/css/common.less'

Vue.config.productionTip = false; 

Vue.prototype.$http = http;
 
App.mpType = 'app'

const app = new Vue({
    ...App 
})
app.$mount()
 