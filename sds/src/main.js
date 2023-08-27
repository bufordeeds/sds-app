import 'process/browser';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import avatar from '@/components/app/avatar';
import MyForm from '@/components/inputs/MyForm';
import TextInput from '@/components/inputs/TextInput';

import ShowError from './components/showError';
Vue.component('my-show-error', ShowError);
Vue.component('avatar', avatar);
Vue.component('my-form', MyForm);
Vue.component('my-text-input', TextInput);

Vue.config.productionTip = false;

// import VueGtag from "vue-gtag";

// Vue.use(VueGtag, {
//    config: { id: "UA-110055531-1" }
// }, router);

import { AuthPlugin, getInstance } from './plugins/auth.js';

async function create_app() {
	Vue.use(AuthPlugin, {});

	let auth = getInstance();
	await auth.check_is_logged_in();

	// let origin = window.location.origin;
	// let origin2 = origin.split(':')
	//
	// if (origin.includes('ngrok')){
	//    Vue.prototype.$baseUrlApi =   process.env.VUE_APP_BASE_API_NGROK;
	// }
	// else{
	//    Vue.prototype.$baseUrlApi = origin2.slice(0,2).join(':') + ':'+ process.env.VUE_APP_API_PORT;
	// }

	window.app = new Vue({
		router,
		store,
		vuetify,
		render: function (h) {
			return h(App);
		}
	}).$mount('#app');

	// console.log('base api', origin, origin2, Vue.$baseUrlApi);
	// console.log('base api', window.app.$baseUrlApi)
}

create_app();
