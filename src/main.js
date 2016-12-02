import Vue from 'vue'
import App from 'App'
import store from 'state/store'
import router from 'router'
import { sync } from 'vuex-router-sync'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

sync(store, router)

Vue.use(Element)

/* eslint-disable no-new */
new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
})
