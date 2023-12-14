<template>
  <v-dialog
    v-model="value2"
    max-width="500"
    persistent
  >
    <v-card class="pa-3">
      <div
        class="dialog-heading"
        style="
					display: flex;
					color: var(--color-headline);
					font-size: 18pt;
				"
      >
        Flag this profile

        <v-spacer />
        <v-btn
          icon
          @click="value2 = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </div>

      <my-form
        v-if="loading !== false"
        ref="form"
      >
        Thank you for helping keep our resources up-to-date! Please fill
        out this form to flag this listing.

        <v-row
          dense
          class="ma-0"
        >
          <v-col cols="12">
            <my-text-input
              v-model="flag_info.name"
              label="Your Name"
              :rules="[isRequired]"
            />
          </v-col>

          <v-col cols="12">
            <my-text-input
              v-model="flag_info.email"
              label="Your Email"
              :rules="[isRequired, isEmail]"
            />
          </v-col>
        </v-row>

        <my-text-area
          v-model="flag_info.message"
          class="mt-2"
          label="Tell us why you're flagging this profile"
          :rules="[isRequired]"
        />

        <div
          class="dialog-heading mt-3"
          style="display: flex"
        >
          <v-spacer />
          <v-btn
            :loading="loading"
            @click="submit_flag_request"
          >
            Flag it!
          </v-btn>
        </div>
      </my-form>

      <div v-else>
        Your flag request was successfully submitted.
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import MyTextArea from '@/components/inputs/MyTextArea';
import validation from '@/mixins/validation';
import data_getters from '@/mixins/data_getters';

export default {
	name: 'FlagUserDialog',
	components: { MyTextArea },
	mixins: [validation, data_getters],
	props: {
		value: Boolean,

		user_id: String,
		dog_id: { type: String, default: null },
		sds_num: { type: String, default: null }
	},
	data() {
		return {
			loading: null,

			flag_info: {
				name: null,
				message: null,
				email: null
			}
		};
	},
	computed: {
		value2: {
			get() {
				return this.value;
			},

			set(newVal) {
				this.$emit('input', newVal);
			}
		}
	},

	watch: {
		value(newVal) {
			if (newVal === false) {
				this.loading = null;
				this.flag_info = {
					name: null,
					message: null,
					email: null
				};
			}
		}
	},

	methods: {
		async submit_flag_request() {
			if (!this.$refs.form.validate()) {
				return;
			}

			try {
				this.loading = true;
				let payload = {
					flagged_user_id: this.user_id,
					dog_id: this.dog_id,
					dog_num: this.sds_num,
					api_key: process.env.VUE_APP_API_KEY,
					message: this.flag_info
				};
				await this.make_request('/public/submitFlagRequest', payload);

				this.loading = false;

				this.flag_info = {
					name: null,
					message: null,
					email: null
				};
				setTimeout(() => {
					this.value2 = false;
				}, 3000);
			} catch (e) {
				console.error(e);
			}
		}
	}
};
</script>

<style scoped></style>
