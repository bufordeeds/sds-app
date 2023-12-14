<template>
  <div>
    <div
      class="page-title"
      style="text-align: center"
    >
      Contact Us
    </div>

    <div class="content-container-bg">
      <div
        v-if="sent !== true"
        class="content-container-sm"
      >
        <my-form ref="form">
          <v-row dense>
            <v-col
              cols="12"
              sm="6"
            >
              <my-text-input
                v-model="msg.first_name"
                label="First Name*"
                :rules="[isRequired]"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <my-text-input
                v-model="msg.last_name"
                label="Last Name*"
                :rules="[isRequired]"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <my-text-input
                v-model="msg.email"
                label="Email*"
                :rules="[isRequired, isEmail]"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <my-text-input
                v-model="msg.phone"
                label="Phone"
                :rules="[isPhone]"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <my-text-input
                v-model="msg.company"
                label="Company (if any)"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <my-drop-down
                v-model="msg.type"
                label="Which best describes you?"
                :list="type_list"
                item-value="val"
                item-text="txt"
                :rules="[isRequired]"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col>
              <!--                      <textarea-->
              <!--                          class="pa-2"-->
              <!--                          v-model="message"-->
              <!--                          style="background-color: white; width: 100%; min-height: 400px;  "-->
              <!--                          placeholder="Message"-->
              <!--                      ></textarea>-->

              <my-text-area
                v-model="msg.message"
                label="Message"
                :rules="[isRequired]"
              />
            </v-col>
          </v-row>

          <v-row class="ma-0">
            <div
              v-if="err_msg"
              style="color: red"
            >
              {{ err_msg }}
            </div>
            <v-spacer />
            <v-btn
              :loading="loading"
              @click="on_submit"
            >
              Submit
            </v-btn>
          </v-row>
        </my-form>
      </div>

      <div
        v-if="sent === true"
        class="content-container-sm"
        style="text-align: center; font-size: 14pt; padding-top: 20px"
      >
        Thanks! Your message was sent.
      </div>
    </div>
  </div>
</template>

<script>
import MyDropDown from '@/components/inputs/MyDropDown';
import MyTextArea from '@/components/inputs/MyTextArea';
import data_getters from '@/mixins/data_getters';
import utilities from '@/mixins/utilities';
import validation from '@/mixins/validation';

export default {
	name: 'ContactUs',
	components: { MyDropDown, MyTextArea },
	mixins: [data_getters, validation],
	data() {
		return {
			msg: {
				first_name: null,
				last_name: null,
				email: null,
				phone: null,
				company: null,
				type: null,
				message: null
			},

			loading: false,
			sent: null,
			err_msg: null,

			type_list: [
				{ txt: 'Service Dog Owner', val: 'Service Dog Owner' },
				{
					txt: 'Friend/Family of Service Dog Owner',
					val: 'Friend of Service Dog Owner'
				},
				{
					txt: 'Breeder/Trainer/Shelter',
					val: 'Breeder/Trainer/Shelter'
				},
				{ txt: 'Press', val: 'Press' },
				{ txt: 'Other', val: 'Other' }
			]
		};
	},

	created() {
		this.$store.commit('set_show_side_nav', false);
	},

	methods: {
		async on_submit() {
			try {
				if (!this.$refs.form.validate()) {
					return;
				}

				console.log('debug');
				this.loading = true;
				await this.make_request('/public/sendContactUs', {
					message: this.msg,
					api_key: process.env.VUE_APP_API_KEY
				});
				this.loading = false;
				this.sent = true;
			} catch (e) {
				this.sent = false;
				this.loading = false;
				this.err_msg = 'Sorry there was an error sending your message';
				console.error(e);
			}
		}
	}
};
</script>

<style scoped>
.heading {
	font-size: 16pt;
	font-weight: 600;
	margin-top: 15px;
}
</style>
