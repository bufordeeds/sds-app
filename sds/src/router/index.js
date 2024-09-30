import Vue from 'vue';
import VueRouter from 'vue-router';
import { getInstance } from '@/plugins/auth';
Vue.use(VueRouter);

// add guard
async function login_guard(to, from, next) {
	const auth = getInstance();

	let isAuthenticated = await auth.isAuthenticated();

	console.log('route guard');

	// return next();

	// If the user is authenticated,
	if (isAuthenticated || to.fullPath === '/login') {
		//
		//    //check if the account is active, i.e. behavior agreement is accepted/up to date
		//    if (auth.profile.acct_active || to.fullPath === '/accountHome'){
		//       next();
		//    }
		//    else{
		//       //has the account even been confirmed, i.e. has user gone through the signup process
		//       if (auth.profile.acct_confirmed){
		//          next({ path: '/accountHome' });
		//       }
		//       else{
		//          next({ path: '/signup' });
		//       }
		//    }

		if (auth.profile.acct_confirmed && auth.profile.acct_active) {
			next();
		} else {
			if (!auth.profile.acct_confirmed) {
				next({ path: '/signup' });
			} else if (!auth.profile.acct_active) {
				if (
					['/accountHome', '/behaviorStandardsViewer'].includes(
						to.path
					)
				) {
					next();
				} else {
					next({ path: '/accountHome' });
				}
			}
		}
	} else {
		// Otherwise, log in
		auth.cache_url(to.fullPath);
		next({ name: 'Login' });
		// router.push('login');
	}
}

/**
 * guards against non-admin uses navigating to admin only routes
 * @param to
 * @param from
 * @param next
 * @returns {Promise<*>}
 */
async function admin_guard(to, from, next) {
	const auth = getInstance();
	let isAuthenticated = await auth.isAuthenticated();
	if (isAuthenticated) {
		if (auth.profile.acct_type === 'SDS-ADMIN') {
			next();
		} else {
			next(Error('Not Authorized'));
		}
	} else if (to.fullPath === '/login') {
		next();
	} else {
		auth.cache_url(to.fullPath);
		next({ name: 'Login' });
	}
}

/**
 * updates the title and meta tags on page based on route
 * @param to
 * @param from
 * @param next
 * @return {*}
 *
 * https://www.digitalocean.com/community/tutorials/vuejs-vue-router-modify-head
 */
function update_page_meta_tags(to, from, next) {
	// This goes through the matched routes from last to first, finding the closest route with a title.
	// e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
	// `/nested`'s will be chosen.
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.title);

	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	// const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

	// // If a route with a title was found, set the document (page) title to that value.
	// if (nearestWithTitle) {
	//    document.title = nearestWithTitle.meta.title;
	// } else if (previousNearestWithMeta) {
	//    document.title = previousNearestWithMeta.meta.title;
	// }

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) {
		document.title = nearestWithTitle.meta.title;
	} else {
		document.title = 'Service Dog Standards';
	}

	// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
		(el) => el.parentNode.removeChild(el)
	);

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next();

	// Turn the meta tag definitions into actual elements in the head.
	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag = document.createElement('meta');

			Object.keys(tagDef).forEach((key) => {
				tag.setAttribute(key, tagDef[key]);
			});

			// We use this to track which meta tags we create so we don't interfere with other ones.
			tag.setAttribute('data-vue-router-controlled', '');

			return tag;
		})
		// Add the meta tags to the document head.
		.forEach((tag) => document.head.appendChild(tag));

	next();
}

import routes_public from './public';
import routes_private from './private';
import routes_admin from './admin';

let routes = routes_public;

for (let r of routes_private) {
	r.beforeEnter = login_guard;
	routes.push(r);
}

for (let r of routes_admin) {
	r.beforeEnter = admin_guard;
	routes.push(r);
}

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	}
});

router.beforeEach((to, from, next) => {
	update_page_meta_tags(to, from, next);
});

// protect all routes with login
// router.beforeEach( (to, from, next) => {
//    login_guard(to, from, next);
// });

export default router;
