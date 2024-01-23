<template>
  <div>
    <flag-user-dialog
      v-if="show_flag_user"
      v-model="show_flag_user"
      :user_id="user._id"
    />

    <div
      v-if="user._id == null"
      class="content-container-bg"
      style="min-height: calc(100vh - 284px)"
    >
      No trainer profile found
    </div>

    <div
      v-if="user._id != null"
      class="content-container-bg"
      style="min-height: calc(100vh - 284px)"
    >
      <div
        v-if="edit_mode"
        class="mb-4 centered-flex-column"
        style="background-color: inherit"
      >
        <router-link
          :to="'/trainer/' + trainer_url"
          target="_blank"
        >
          View as public
        </router-link>

        <div v-if="user.account_visibility !== 'Public'">
          Warning Profile is private
        </div>
      </div>

      <div
        class="profile-container"
        style="background-color: white"
      >
        <!---------------------- top header box ------------------------------------------------------------------->
        <div class="header-container">
          <div
            v-if="edit_mode"
            class="edit-box"
          >
            <v-btn
              v-if="edit_mode"
              color="var(--color-headline)"
              text
              @click="$emit('edit-basic')"
            >
              <i class="material-icons">create</i>
              Edit
            </v-btn>
          </div>

          <div class="mr-2">
            <v-avatar size="100">
              <img
                v-if="!user.profile_image"
                src="../../assets/images/content/user-no-image.png"
                width="75px"
              >
              <img
                v-else
                :src="user.profile_image.Location"
                width="75px"
              >
            </v-avatar>

            <div
              v-if="edit_mode"
              style="
								text-align: center;
								color: var(--color-subheading);
								font-size: 10pt;
							"
              class="mt-1"
              @click="$emit('edit-profile-pic')"
            >
              <v-btn
                v-if="edit_mode"
                text
                small
                color="var(--color-subheading)"
                style="margin-top: -10px"
              >
                <i class="material-icons section-edit-icon">create</i>
                Change
              </v-btn>
            </div>
          </div>

          <div class="trainer-info">
            <div style="margin-top: -10px; margin-bottom: -5px">
              <img
                src="../../assets/images/content/SDSTrainerLogo.svg"
                height="16"
              >
            </div>

            <div>
              <span
                style="
									color: var(--color-headline);
									font-size: 14pt;
									font-weight: 500;
								"
                class="mb-1"
              >
                {{ user.name_first }} {{ user.name_last }}
              </span>
              Trainer
            </div>
            <div
              style="
								font-size: 20pt;
								color: var(--color-headline);
								font-weight: 700;
								line-height: 1.2;
							"
            >
              {{ trainer_info.business_name }}
            </div>
            <div
              style="
								font-size: 14pt;
								color: var(--color-headline);
								font-weight: 600;
								line-height: 1.2;
							"
            >
              {{ trainer_info.tagline }}
            </div>

            <div
              v-if="$vuetify.breakpoint.width <= 900"
              class="city-state"
            >
              {{ addr_city_state }}
            </div>
          </div>

          <v-spacer />
          <div
            v-if="$vuetify.breakpoint.width > 900"
            class="city-state"
          >
            {{ addr_city_state }}
          </div>
        </div>

        <!---------------------- banner photo ------------------------------------------------------------------->

        <div
          class="banner-photo"
          :style="banner_style"
        >
          <div
            v-if="edit_mode"
            class="banner-photo-controls"
          >
            <v-btn
              text
              class="white--text mr-4"
              @click="$emit('upload-banner')"
            >
              <img
                src="../../assets/images/icons/camera-white.png"
                height="20px"
                class="pr-1"
              >
              Customize Photo
            </v-btn>
          </div>

          <img
            v-if="banner_src"
            :src="banner_src"
            style="max-height: 400px; width: 100%; display: block"
          >
        </div>

        <!---------------------- box containing basic contact info ------------------------------------------------>
        <div class="contact-container">
          <!--               <div class="edit-box" >-->
          <!--                  <v-btn icon color="var(&#45;&#45;color-headline)" v-if="edit_mode">-->
          <!--                     <v-icon>create</v-icon>-->
          <!--                  </v-btn>-->
          <!--               </div>-->

          <div class="contact-column">
            <template v-if="show_biz_address">
              <div class="contact-header">
                Location
              </div>
              <div style="font-weight: 500">
                <a
                  :href="google_link"
                  style="color: var(--color-headline)"
                  target="_blank"
                >
                  {{ address.street1 }}
                  <br v-if="address.street1">
                  <!--{{address.city}}, {{address.state}}, {{address.zip}}-->
                  {{ addr_city_state_zip }}
                </a>
              </div>
            </template>

            <template v-if="user.trainer_info.hours_str != null">
              <div class="contact-header mt-2">
                Hours
              </div>
              <div class="">
                {{ user.trainer_info.hours_str }}
              </div>
            </template>

            <div
              v-if="
                user.trainer_info.will_travel ||
                  user.trainer_info.will_transport ||
                  user.trainer_info.have_facility
              "
              class="mt-4"
            >
              <div v-if="user.trainer_info.have_facility">
                <img
                  src="../../assets/images/icons/checked_box.svg"
                  height="16"
                >
                I have a training facility
              </div>

              <div v-if="user.trainer_info.will_travel">
                <img
                  src="../../assets/images/icons/checked_box.svg"
                  height="16"
                >
                I'm willing to travel
                <template
                  v-if="
                    isFinite(
                      user.trainer_info.max_travel_miles
                    )
                  "
                >
                  up to
                  {{
                    Math.round(
                      user.trainer_info.max_travel_miles
                    )
                  }}
                  miles
                </template>
              </div>

              <div v-if="user.trainer_info.will_transport">
                <img
                  src="../../assets/images/icons/checked_box.svg"
                  height="16"
                >
                I can transport dogs
              </div>
            </div>
          </div>

          <div
            class="contact-column"
            :style="{
              'margin-top': $vuetify.breakpoint.xs ? '10px' : '0'
            }"
          >
            <template />

            <div
              v-if="
                user.trainer_info.phone != null ||
                  user.email != null ||
                  user.trainer_info.website != null
              "
              class="contact-header"
            >
              Contact
            </div>

            <div
              v-if="user.trainer_info.phone != null"
              class="mt-1"
            >
              <a
                :href="'tel:' + user.trainer_info.phone"
                class="click-to-call"
              >
                <span style="color: var(--color-heading-grey)">Phone:
                </span>
                <span class="contact-value">
                  {{ user.trainer_info.phone }}
                </span>
              </a>
            </div>

            <div
              v-if="user.email != null"
              class="mt-2"
            >
              Email:
              <a :href="'mailto:' + user.email">
                <span class="contact-value">
                  {{ user.email }}</span>
              </a>
              <br>
            </div>

            <div
              v-if="user.trainer_info.website"
              class="mt-1"
            >
              Web:
              <a
                :href="cleaned_url(user.trainer_info.website)"
                target="_blank"
              >
                <span class="contact-value">{{
                  user.trainer_info.website
                }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-3" />

      <!----------------------------two column layout for sub sections---------------------------------------------->
      <div
        v-if="show_two_col"
        class="profile-container"
        style="display: flex"
      >
        <!--  two column layout-->

        <!----------------------------column one------------------------------------->
        <div class="column">
          <template v-for="section in sections.col1">
            <info-section
              :key="section.label"
              class="mt-3"
              :user="user"
              :color="section.color"
              :icon-url="section.icon"
              :label="section.label"
              :items="section.list"
            >
              <template
                v-if="section.content || section.heading"
                #content
              >
                <div
                  v-if="section.heading"
                  class="section-header"
                >
                  {{ section.heading }}
                </div>

                <div
                  v-if="section.content"
                  style="white-space: pre-line"
                >
                  {{ section.content }}
                </div>
              </template>
            </info-section>

            <div
              v-if="edit_mode"
              :key="section.label + 'edit'"
              class="section-edit-container"
            >
              <v-spacer />

              <div
                style="
									display: flex;
									flex-direction: column;
									align-items: flex-end;
								"
              >
                <v-btn
                  text
                  small
                  color="blue"
                  @click="
                    $emit(
                      'edit-section',
                      section.edit_event
                    )
                  "
                >
                  <i class="material-icons section-edit-icon">create</i>
                  Edit
                </v-btn>

                <!------- skip section check -------------->
                <div
                  v-if="showNA(section)"
                  style="margin-top: -10px"
                >
                  <!--<label class="check-container">-->
                  <!--   <div>Section is N/A</div>-->

                  <!--   <input type="checkbox" v-model="section.skip" @change="on_section_check(section.edit_event, section.skip)">-->
                  <!--   <span class="checkmark"></span>-->
                  <!--</label>-->

                  <v-checkbox
                    v-model="section.skip"
                    color="#ff7c1a"
                    class="reverse-label-checkbox"
                    label="Section is N/A"
                    hide-details
                    dense
                    @change="
                      on_section_check(
                        section.edit_event,
                        section.skip
                      )
                    "
                  />
                </div>
              </div>
            </div>
          </template>

          <!--flag as inappropriate-->
          <div
            class=""
            style="margin-top: 20px; margin-bottom: 0px"
          >
            <v-btn
              text
              :disabled="edit_mode"
              color="var(--color-btn)"
              @click="show_flag_user = true"
            >
              <v-icon>flag</v-icon>
              Flag this listing
            </v-btn>
          </div>
        </div>

        <!-- spacer between cols-->
        <div class="pl-5" />

        <!----------------------------column two----------------------------------->
        <div class="column">
          <!------------gallery section ---------------->
          <gallery
            class="mt-3"
            :user_id="user._id"
            :edit_mode="edit_mode"
            :caption="user.trainer_info.gallery_caption"
          />

          <div
            v-if="edit_mode"
            class="section-edit-container"
          >
            <v-btn
              text
              small
              color="blue"
              @click="$emit('edit-section', 'caption')"
            >
              <i class="material-icons section-edit-icon">create</i>
              Edit Caption
            </v-btn>
            <v-spacer />
            <v-btn
              text
              small
              color="blue"
              @click="$emit('edit-gallery')"
            >
              <i class="material-icons section-edit-icon">create</i>
              Add Images
            </v-btn>
          </div>

          <template v-for="section in sections.col2">
            <info-section
              :key="section.label"
              class="mt-3"
              :user="user"
              :color="section.color"
              :icon-url="section.icon"
              :label="section.label"
              :items="section.list"
            >
              <template
                v-if="section.content || section.heading"
                #content
              >
                <div
                  v-if="section.heading"
                  class="section-header"
                >
                  {{ section.heading }}
                </div>

                <div
                  v-if="section.content"
                  style="white-space: pre-line"
                >
                  {{ section.content }}
                </div>
              </template>
            </info-section>

            <div
              v-if="edit_mode"
              :key="section.label + 'edit'"
              class="section-edit-container"
            >
              <v-spacer />
              <!--<v-btn text small color="blue" @click="$emit('edit-section', section.edit_event)">-->
              <!--   <i class="material-icons section-edit-icon">create</i>-->
              <!--   Edit-->
              <!--</v-btn>-->

              <div style="display: flex; flex-direction: column">
                <v-btn
                  text
                  small
                  color="blue"
                  @click="
                    $emit(
                      'edit-section',
                      section.edit_event
                    )
                  "
                >
                  <i class="material-icons section-edit-icon">create</i>
                  Edit
                </v-btn>

                <!------- skip section check -------------->
                <!--<div style="margin-top: 10px;" v-if="showNA(section)">-->
                <!--   <label class="check-container">N/A-->
                <!--      <input type="checkbox" v-model="section.skip" @change="on_section_check(section.edit_event, section.skip)">-->
                <!--      <span class="checkmark"></span>-->
                <!--   </label>-->
                <!--</div>-->

                <div
                  v-if="showNA(section)"
                  style="margin-top: -10px"
                >
                  <v-checkbox
                    v-model="section.skip"
                    color="#ff7c1a"
                    class="reverse-label-checkbox"
                    label="Section is N/A"
                    hide-details
                    dense
                    @change="
                      on_section_check(
                        section.edit_event,
                        section.skip
                      )
                    "
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!----------------------------One column layout for sub sections---------------------------------------------->
      <div
        v-else
        class="profile-container"
        style="display: flex"
      >
        <!-- if part is the two column layout-->

        <!----------------------------column one------------------------------------->
        <div class="single-column">
          <!------------gallery section ---------------->
          <gallery
            class="mt-3"
            :user_id="user._id"
            :edit_mode="edit_mode"
          />

          <div
            v-if="edit_mode"
            class="section-edit-container"
          >
            <v-spacer />
            <v-btn
              text
              small
              color="blue"
              @click="$emit('edit-gallery')"
            >
              <i class="material-icons section-edit-icon">create</i>
              Add Images
            </v-btn>
          </div>

          <template v-for="section in sections.col1">
            <info-section
              :key="section.label"
              class="mt-3"
              :user="user"
              :color="section.color"
              :icon-url="section.icon"
              :label="section.label"
              :items="section.list"
            >
              <template
                v-if="section.content || section.heading"
                #content
              >
                <div
                  v-if="section.heading"
                  class="section-header"
                >
                  {{ section.heading }}
                </div>

                <div
                  v-if="section.content"
                  style="white-space: pre-line"
                >
                  {{ section.content }}
                </div>
              </template>
            </info-section>

            <div
              v-if="edit_mode"
              :key="section.label + 'edit'"
              class="section-edit-container"
              style="width: 100%"
            >
              <v-spacer />
              <!--<v-btn text small color="blue" @click="$emit('edit-section', section.edit_event)">-->
              <!--   <i class="material-icons section-edit-icon">create</i>-->
              <!--   Edit-->
              <!--</v-btn>-->

              <div style="display: flex; flex-direction: column">
                <v-btn
                  text
                  small
                  color="blue"
                  @click="
                    $emit(
                      'edit-section',
                      section.edit_event
                    )
                  "
                >
                  <i class="material-icons section-edit-icon">create</i>
                  Edit
                </v-btn>

                <!------- skip section check -------------->
                <!--<div style="margin-top: 10px;" >-->
                <!--   <label class="check-container">N/A-->
                <!--      <input type="checkbox" v-model="section.skip" @change="on_section_check(section.edit_event, section.skip)">-->
                <!--      <span class="checkmark"></span>-->
                <!--   </label>-->
                <!--</div>-->

                <div
                  v-if="showNA(section)"
                  style="margin-top: -10px"
                >
                  <v-checkbox
                    v-model="section.skip"
                    color="#ff7c1a"
                    class="reverse-label-checkbox"
                    label="Section is N/A"
                    hide-details
                    dense
                    @change="
                      on_section_check(
                        section.edit_event,
                        section.skip
                      )
                    "
                  />
                </div>
              </div>
            </div>
          </template>

          <!--flag as inappropriate-->
          <div
            class=""
            style="margin-top: 20px; margin-bottom: 0px"
          >
            <v-btn
              text
              :disabled="edit_mode"
              color="var(--color-btn)"
              @click="show_flag_user = true"
            >
              <v-icon>flag</v-icon>
              Flag this listing
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data_getters from '@/mixins/data_getters';
import infoSection from '@/views/profileTrainer/infoSection';
import Gallery from '@/components/images/Gallery2';
import FlagUserDialog from '@/components/FlagUserDialog';

import _ from 'lodash';

export default {
	name: 'TrainerProfile',
	components: { infoSection, Gallery, FlagUserDialog },
	mixins: [data_getters],
	props: {
		user_id: String,
		user_obj: {
			type: Object,
			default: () => {
				return { address: {}, trainer_info: { address: {} } };
			}
		}
	},
	data() {
		return {
			user: this.user_obj,

			show_flag_user: false
		};
	},

	computed: {
		trainer_url() {
			if (!this.user) {
				return '';
			}

			let url = _.get(this.user, 'trainer_info.custom_trainer_url', null);
			if (url !== null) {
				return url;
			} else {
				return this.user._id;
			}
		},

		show_biz_address() {
			let ans = false;

			if (this.address.street1) ans = true;
			if (this.address.city) ans = true;
			if (this.address.state) ans = true;
			if (this.address.zip) ans = true;

			return ans;
		},

		addr_city_state() {
			let ans = '';

			if (this.address.city) ans += this.address.city;
			if (this.address.state) {
				if (ans !== '') ans += ', ';
				ans += this.address.state;
			}

			return ans;
		},

		addr_city_state_zip() {
			let ans = '';

			if (this.address.city) ans += this.address.city;
			if (this.address.state) {
				if (ans !== '') ans += ', ';
				ans += this.address.state;
			}

			if (this.address.zip) {
				if (ans !== '') ans += ', ';
				ans += this.address.zip;
			}
			return ans;
		},

		sections() {
			let sections = [];

			if (
				(this.trainer_info.about != null &&
					this.trainer_info.about != '') ||
				this.edit_mode
			) {
				sections.push({
					label: 'About',
					color: '#8dc63f',
					content: this.trainer_info.about,
					icon: require('../../assets/images/icons/About.svg'),
					edit_event: 'about',
					skip: _.get(
						this.trainer_info,
						'section_skip_checks.about',
						false
					)
				});
			}

			if (this.list_services.length > 0 || this.edit_mode) {
				sections.push({
					label: 'Services',
					color: '#bf1e2e',
					list: this.list_services,
					icon: require('../../assets/images/icons/Services.svg'),
					heading: 'Types of Service Dogs we Train',
					edit_event: 'services',
					skip: _.get(
						this.trainer_info,
						'section_skip_checks.services',
						false
					)
				});
			}

			if (this.list_certs.length > 0 || this.edit_mode) {
				sections.push({
					label: 'Certifications',
					color: '#5fafe1',
					list: this.list_certs,
					icon: require('../../assets/images/icons/Certifications.svg'),
					edit_event: 'certifications',
					skip: _.get(
						this.trainer_info,
						'section_skip_checks.certifications',
						false
					)
				});
			}

			if (this.list_awards.length > 0 || this.edit_mode) {
				sections.push({
					label: 'Honors',
					color: '#fcb040',
					list: this.list_awards,
					icon: require('../../assets/images/icons/Awards.svg'),
					edit_event: 'awards',
					skip: _.get(
						this.trainer_info,
						'section_skip_checks.awards',
						false
					)
				});
			}

			// if (this.list_services.length > 0 || this.edit_mode){
			//   sections.push();
			// }

			//getting rid of this section per marc's request

			// if (this.list_breeds.length > 0 || this.edit_mode){
			//   sections.push( {
			//     label: 'Breeds', color: '#9c867a', list: this.list_breeds,
			//     icon: require('../../assets/images/icons/paw.png'),
			//     edit_event: 'breeds'
			//   });
			// }

			if (this.list_groups.length > 0 || this.edit_mode) {
				sections.push({
					label: 'Memberships',
					color: '#f05fa3',
					list: this.list_groups,
					icon: require('../../assets/images/icons/FollowUs.svg'),
					edit_event: 'groups',
					skip: _.get(
						this.trainer_info,
						'section_skip_checks.groups',
						false
					)
				});
			}

			if (this.list_social.length > 0 || this.edit_mode) {
				sections.push({
					label: 'Follow Us',
					color: '#662d91',
					list: this.list_social,
					icon: require('../../assets/images/icons/group.png'),
					heading: 'Friend, find, or follow us!',
					edit_event: 'social',
					skip: _.get(
						this.trainer_info,
						'section_skip_checks.social',
						false
					)
				});
			}

			let col1 = [];
			let col2 = [];
			if (sections.length <= 5 || !this.show_two_col) {
				col1 = sections;
			} else {
				col1 = sections.slice(0, 5);
				col2 = sections.slice(5);
			}

			return { col1, col2 };
		},

		show_two_col() {
			return this.$vuetify.breakpoint.width > 800;
		},

		trainer_info() {
			return _.get(this.user, 'trainer_info', { address: {} });
		},

		address() {
			// if (_.get(this.user, 'trainer_info.address.street1', null) !== null){
			//    return this.user.trainer_info.address;
			// }

			return this.user.trainer_info.address;
			// return this.user.address;
		},

		google_link() {
			let link = 'https://www.google.com/maps/place/';

			// let addr = `${this.address.street1}, ${this.address.city}, ${this.address.state} ${this.address.zip}`;
			// addr = addr.replace(/ /g, '+');

			let addr = '';

			if (this.address.street1) addr += this.address.street1;

			if (this.address.city) {
				if (addr !== '') addr += ', ';
				addr += this.address.city;
			}

			if (this.address.state) {
				if (addr !== '') addr += ', ';
				addr += this.address.state;
			}

			if (this.address.zip) {
				if (addr !== '') addr += ', ';
				addr += this.address.zip;
			}

			return link + addr;
		},

		list_services() {
			return _.get(this.user, 'trainer_info.services', []);
		},

		list_certs() {
			return _.get(this.user, 'trainer_info.certifications', []);
		},

		list_awards() {
			return _.get(this.user, 'trainer_info.awards', []);
		},

		list_breeds() {
			return _.get(this.user, 'trainer_info.breeds', []);
		},

		list_groups() {
			return _.get(this.user, 'trainer_info.groups', []);
		},

		list_social() {
			return _.get(this.user, 'trainer_info.social', []);
		},

		edit_mode() {
			let ans = false;

			if (
				this.$auth.isAuthenticated() &&
				this.$auth.profile.user_id === this.user._id &&
				this.$route.name === 'ManageProfile'
			) {
				ans = true;
			}

			return ans;
		},

		banner_src() {
			let ans = null;
			if (this.user) {
				let source = _.get(
					this.user,
					'trainer_info.banner_image.Location',
					null
				);
				if (source) {
					// ans = 'background-image:'+ `url(${source})`
					ans = source;
				}
			}
			return ans;
		},

		banner_style() {
			let ans = 'height: 200px';
			if (this.user) {
				let source = _.get(
					this.user,
					'trainer_info.banner_image.Location',
					null
				);
				if (source) {
					ans = `height: 100%`;
				}
			}
			return ans;
		}
	},

	watch: {
		user_id(newVal, oldVal) {
			console.log('test');
			if (newVal != null) {
				this.user = this.user_obj;
				this.get_profile();
			}
		}
	},
	created() {
		this.get_profile();
	},

	methods: {
		//returns a cleaned version of trainer_info.website
		cleaned_url(url) {
			// let ans = this.user.trainer_info.website;

			let ans = url;
			if (typeof ans === 'string') {
				ans = ans.toLowerCase();
				if (!ans.includes('http://') && !ans.includes('https://')) {
					ans = 'http://' + ans;
				}
			}
			return ans;
		},

		on_section_check(section, value) {
			let key = 'trainer_info.section_skip_checks.' + section;

			let payload = {
				user_id: this.user._id,
				nestedUpdate: {
					[key]: value
				}
			};
			this.make_request('/private/updateUserProfile', payload);
		},

		showNA(section) {
			let ans = true;
			if (section.content != null && section.content != '') {
				ans = false;
			}

			if (section.list != null && section.list.length > 0) {
				ans = false;
			}

			return ans;
		},

		async get_profile() {
			try {
				if (
					this.$auth.isAuthenticated() &&
					this.$auth.profile.user_id === this.user_id &&
					this.$route.name === 'ManageProfile'
				) {
					this.user = await this.make_request(
						'/private/getMyProfile',
						{}
					);
				} else {
					let user_id;

					console.log('debug');
					if (this.$route.params.user_id) {
						user_id = this.$route.params.user_id;
					} else {
						user_id = this.user_id;
					}

					if (user_id == null) {
						return;
					}

					this.user = await this.make_request(
						'/public/getTrainerProfile',
						{ user_id }
					);
					console.log(user_id);
				}
			} catch (e) {
				throw e;
			}
		}
	}
};
</script>

<style scoped>
@import url('./profile_common.css');

/*main container*/

.profile-container {
	width: 100%;
	max-width: 1000px;
}

/********** user header box ********************/
.header-container {
	display: flex;
	padding: 30px 20px 20px 20px;
	flex-wrap: wrap;
}

.trainer-info {
	/*margin-left: 10px;*/
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.city-state {
	/*margin-left: 30px;*/
	font-size: 12pt;
	color: var(--color-headline);
	font-weight: 500;

	display: flex;
	align-items: center;
}

/*edit button container*/
.edit-box {
	width: 100%;
	text-align: right;
}

/* ************* banner photo **********************/
.banner-photo {
	position: relative;
	height: 100%;
	background-image: linear-gradient(to top right, #71be47, #60b0df);

	/*background-size: contain;*/
	/*background-position: center;*/

	min-height: 100px;
}

.banner-photo-controls {
	color: white;
	width: 100%;
	padding: 15px;
	position: absolute;

	display: flex;
	justify-content: flex-end;
	align-items: center;
}

/* ************* contact info box **********************/
.contact-container {
	display: flex;
	padding: 20px 20px 20px 20px;
	justify-content: stretch;
	flex-wrap: wrap;
}

.contact-column {
	flex-grow: 1;
}

.contact-header {
	color: var(--color-heading-grey);
	font-size: 14pt;
	font-weight: 500;
}
.contact-value {
	color: var(--color-headline);
	font-weight: 500;
}

.click-to-call {
	padding: 5px 10px 5px 10px;
	border: solid 1px #b3b3b3;
	border-radius: 5px !important;
	color: var(--color-heading-grey);
}

/* **********************two column section *******************/

/*  related to edit row below sections*/
.section-edit-container {
	margin-top: -30px;
	margin-bottom: 10px;
	display: flex;
	justify-content: flex-end;
}

.section-edit-icon {
	font-size: 10pt;
	margin-right: 3px;
}

/* column container stuff*/

.column {
	display: flex;
	flex-direction: column;

	width: 50%;
}

.single-column {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.col-heading {
	text-align: center;
}

/*related to individual sections*/

.section-header {
	font-size: 14pt;
	font-weight: 500;
	padding-bottom: 10px;
	color: var(--color-heading-grey);
}

/*.none-check{*/
/*    width: 10px;*/
/*    height: 10px;*/
/*    appearance: none;*/
/*    !*background-color: #34495E;*!*/
/*    border: 1px solid #ababab;*/
/*    border-radius: 1px;*/
/*}*/

/*input.none-check:checked {*/
/*    !*border: 1px solid #41B883;*!*/
/*    background-color: #ff7c1a;*/
/*}*/

/*input.none-check:checked  + span::before {*/
/*    content: '\2713';*/
/*    display: block;*/
/*    text-align: center;*/
/*    color: #41B883;*/
/*    position: absolute;*/
/*    left: 0.7rem;*/
/*    top: 0.2rem;*/
/*}*/

/*.none-label{*/
/*    font-size: 10pt;*/
/*    color: #ff7c1a;*/

/*}*/

/*custom checkbox*/
/*taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_checkbox*/
/* The container */
.check-container {
	display: block;
	position: relative;
	padding-left: 20px;
	/*margin-bottom: 15px;*/
	cursor: pointer;
	font-size: 10pt;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	color: #ff7c1a;
}

/* Hide the browser's default checkbox */
.check-container input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

/* Create a custom checkbox */
.checkmark {
	position: absolute;
	top: 2px;
	left: 0;
	height: 15px;
	width: 15px;
	/*background-color: #eee;*/
	border: 1px solid #b0afaf;
}

/* On mouse-over, add a grey background color */
.check-container:hover input ~ .checkmark {
	background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.check-container input:checked ~ .checkmark {
	background-color: #ff7c1a;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
	content: '';
	position: absolute;
	display: none;
}

/* Show the checkmark when checked */
.check-container input:checked ~ .checkmark:after {
	display: block;
}

/* Style the checkmark/indicator */
.check-container .checkmark:after {
	left: 5px;
	top: 2px;
	width: 5px;
	height: 8px;
	border: solid white;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}

div >>> .reverse-label-checkbox .v-input__slot {
	flex-direction: row-reverse;
	justify-content: flex-end;
}

div >>> .reverse-label-checkbox .v-label {
	font-size: 10pt;
}

div.my-tester >>> .v-input--selection-controls__input {
	margin-left: 10px;
}
</style>
