import Vue from 'vue'
import App from './App'
import http from './http/api.js'
import 'public/css/common.less'

Vue.config.productionTip = false; 
  
// Vue.prototype.$API = 'http://192.168.1.110:3000'
Vue.prototype.$API = 'http://192.168.2.157:3000' 
// Vue.prototype.$API = 'http://172.20.10.13:3000'

Vue.prototype.$http = http; 
 
App.mpType = 'app'

const app = new Vue({
    ...App 
})
app.$mount()
 