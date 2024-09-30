import Vue from 'vue';
import router from '../router';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';

// TODO: reintroduce secure token verification while handling the RSA public key

const DEFAULT_REDIRECT_CALLBACK = () =>
	window.history.replaceState({}, document.title, window.location.pathname);

function getCookie(cname) {
	console.log('Searching for cookie:', cname);
	const name = cname + '=';
	const decodedCookie = decodeURIComponent(document.cookie);
	console.log('All cookies:', decodedCookie);
	const ca = decodedCookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim();
		console.log(`Checking cookie ${i}:`, c);
		if (c.indexOf(name) === 0) {
			const value = c.substring(name.length);
			console.log(`Found ${cname} cookie with value:`, value);
			return value;
		}
	}
	console.log(`Cookie ${cname} not found`);
	return null;
}

let instance;

export const getInstance = () => instance;

export const createInstance = ({
	onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
	redirectUri = window.location.origin,
	...options
}) => {
	if (instance) return instance;

	instance = new Vue({
		data() {
			return {
				loading: true,
				authenticated: false,
				profile: {},
				token: null,
				popupOpen: false,
				error: null,
				requested_url: null,
				api_url_well_known: `${process.env.VUE_APP_BASE_URL_API}/auth/well-known/public.rsa`,
				api_url_get_id: `${process.env.VUE_APP_BASE_URL_API}/public/getSdsId`,
				sds_guid: null
			};
		},
		async created() {
			try {
				await this.set_anonymous_id();
				console.log('Auth instance created and anonymous ID set');
			} catch (e) {
				console.error('Error in auth creation:', e);
				this.error = e;
			} finally {
				this.loading = false;
			}
		},
		methods: {
			isAuthenticated() {
				return this.authenticated;
			},

			cache_url(url) {
				console.log('Caching URL:', url);
				this.requested_url = url;
			},

			async save_session_token(token) {
				console.log('Saving session token');
				try {
					const decoded = jwt.decode(token, { complete: true });
					console.log('Decoded token:', decoded);

					if (!decoded) {
						throw new Error('Failed to decode token');
					}

					const currentTimestamp = Math.floor(Date.now() / 1000);
					if (decoded.payload.exp <= currentTimestamp) {
						throw new Error('Token has expired');
					}

					this.authenticated = true;
					this.profile = decoded.payload;
					this.token = token;

					const d = new Date(decoded.payload.exp * 1000);
					const expires = 'expires=' + d.toUTCString();
					document.cookie = `sdsSession=${token}; ${expires}; path=/`;
					console.log('Session cookie set:', document.cookie);

					this.$emit('logged-in', true);

					const t = DateTime.fromJSDate(d)
						.diff(DateTime.local())
						.as('milliseconds');
					setTimeout(() => this.logout(), t);

					return true;
				} catch (e) {
					console.error('Error saving session token:', e);
					console.error('Token:', token);
					return false;
				}
			},

			async check_is_logged_in() {
				const token = getCookie('sdsSession');
				console.log('Retrieved token:', token);

				if (!token) {
					console.log('No session token found');
					this.authenticated = false;
					return false;
				}

				try {
					const pubKey = (await axios.get(this.api_url_well_known))
						.data;
					const decoded = jwt.verify(token, pubKey);
					console.log('Token verified:', decoded);

					this.authenticated = true;
					this.profile = decoded;
					this.token = token;

					const headers = { authorization: `Bearer ${token}` };
					const url = `${process.env.VUE_APP_BASE_URL_API}/auth/validateAndUpdateToken`;
					const {
						data: { token: newToken }
					} = await axios.post(url, {}, { headers });

					await this.save_session_token(newToken);

					this.$emit('logged-in', true);

					if (this.requested_url) {
						await router.push(this.requested_url);
						this.requested_url = null;
					}

					return true;
				} catch (e) {
					console.error('Error verifying token:', e);
					this.authenticated = false;
					return false;
				}
			},

			async login(email, pass) {
				console.log('Attempting login for email:', email);
				try {
					const url_base = process.env.VUE_APP_BASE_URL_API;
					const { data } = await axios.post(
						`${url_base}/auth/login`,
						{ email, password: pass }
					);
					console.log('Login response:', data);

					if (!data.token) {
						throw new Error('No token received from server');
					}

					const savedSuccessfully = await this.save_session_token(
						data.token
					);
					if (!savedSuccessfully) {
						throw new Error('Failed to save session token');
					}

					if (this.requested_url) {
						await router.push(this.requested_url);
						this.requested_url = null;
					}

					this.$emit('logged-in', true);
					return true;
				} catch (e) {
					console.error('Login error:', e);
					if (e.response) {
						console.error('Response data:', e.response.data);
						console.error('Response status:', e.response.status);
						console.error('Response headers:', e.response.headers);
					} else if (e.request) {
						console.error('No response received:', e.request);
					} else {
						console.error('Error details:', e.message);
					}
					this.authenticated = false;
					throw e;
				}
			},

			async logout({ emit = true } = {}) {
				console.log('Logging out');
				document.cookie =
					'sdsSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
				this.authenticated = false;

				try {
					const url_base = process.env.VUE_APP_BASE_URL_API;
					const headers = { authorization: `Bearer ${this.token}` };
					await axios.post(
						`${url_base}/auth/logout`,
						{},
						{ headers }
					);
				} catch (e) {
					console.error('Error during logout:', e);
				}

				this.profile = {};
				this.token = null;
				if (emit) {
					this.$emit('logged-out');
				}
			},

			async set_anonymous_id() {
				try {
					let anonymous_id = getCookie('sdsId');

					if (anonymous_id === null) {
						const response = await axios.post(
							this.api_url_get_id,
							{}
						);
						anonymous_id = response.data;
						document.cookie = `sdsId=${anonymous_id}; path=/`;
						console.log('New anonymous ID set:', anonymous_id);
					} else {
						console.log(
							'Existing anonymous ID found:',
							anonymous_id
						);
					}

					this.sds_guid = anonymous_id;
				} catch (e) {
					console.error('Error setting anonymous ID:', e);
				}
			}
		}
	});

	return instance;
};

export const AuthPlugin = {
	install(Vue) {
		const options = {
			onRedirectCallback: (appState) => {
				router.push(
					appState && appState.targetUrl
						? appState.targetUrl
						: window.location.pathname
				);
			}
		};

		Vue.prototype.$auth = createInstance(options);
	}
};
