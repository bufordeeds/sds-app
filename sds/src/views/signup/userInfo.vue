<template>
  <div>
    <check-address
      ref="addrCheck"
      :address-new="user.private_info.address"
      :address-old="private_info_address_old"
      @checked-address="on_save({ checked_addr: $event })"
    />

    <my-form ref="form">
      <v-row dense>
        <v-col>
          <my-text-input
            v-model="user.name_first"
            label="First Name*"
            :rules="[isRequired]"
          />
        </v-col>

        <v-col>
          <my-text-input
            v-model="user.name_last"
            label="Last Name*"
            :rules="[isRequired]"
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <my-text-input
            v-model="user.private_info.address.street1"
            label="Address*"
            :rules="[isRequired]"
          />
        </v-col>
      </v-row>


      <v-row dense>
        <v-col cols="6">
          <my-text-input
            v-model="user.private_info.address.city"
            label="City*"
            :rules="[isRequired]"
          />
        </v-col>

        <v-col cols="3">
          <my-text-input
            v-model="user.private_info.address.state"
            label="State*"
            :rules="[isRequired]"
          />
        </v-col>

        <v-col cols="3">
          <my-text-input
            v-model="user.private_info.address.zip"
            label="Zip*"
            :rules="[isRequired, isZip]"
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col>
          <my-text-input
            v-model="user.private_info.phone"
            label="Phone*"
            :rules="[isRequired, isPhone]"
            @change="user.private_info.phone = fmtPhone(user.private_info.phone)"
          />
        </v-col>
      </v-row>
    </my-form>

    <v-row>
      <v-spacer />
      <v-btn
        color="var(--color-primary)"
        :loading="loading_save"
        @click="on_save"
      >
        Save
      </v-btn>

      <v-spacer />
    </v-row>
  </div>
</template>

<script>
import _ from 'lodash';
import validation from "@/mixins/validation";
import data_getters from "@/mixins/data_getters";
import states from "@/data/states";
import CheckAddress from "@/components/CheckAddress";

export default {
  name: "UserInfo",
  components: { CheckAddress },
  mixins: [validation, data_getters],
  data() {
    return {
      states: states,

      user: {
        account_type: null,
        name_first: null,
        name_last: null,
        private_info: {
          address: {
            street1: null,
            street2: null,
            city: null,
            state: null,
            zip: null,
          },
          phone: null
        },
      },

      show_address_confirm: false,
      address_suggestion: null,
      address_err: null,

      private_info_address_old: {},
    }
  }, //methods

  async created() {
    try {
      let user = await this.make_request('/private/getMyProfile', {});
      this.user.account_type = user.account_type;
      this.user.name_first = user.name_first;
      this.user.name_last = user.name_last;

      console.log(user)

    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    // async check_address(){
    //    try{
    //
    //       if (!this.$refs.form.validate()){
    //          return;
    //       }
    //
    //
    //       // this.loading_save = true;
    //
    //
    //       let verify = await this.verify_address(this.user.address);
    //       console.log({verify})
    //
    //       this.address_suggestion = null;
    //
    //       if (verify.success){
    //
    //          this.address_suggestion = verify.suggestion;
    //       }
    //       else{
    //          this.address_err = verify.error_msg;
    //       }
    //       this.show_address_confirm = true;
    //
    //       this.loading_save = false;
    //
    //    }catch (e) {
    //
    //       throw e;
    //    }
    // },

    async on_save({ checked_addr } = {}) {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading_save = true;

      if (checked_addr === undefined) {
        await this.$refs.addrCheck.check_address();
        this.loading_save = false;
        // this.private_info_address_old = _.cloneDeep(this.user.private_info.address);
        return;
      }
      else {
        //value returned from CheckAddress component's event (see component in template)
        this.user.private_info.address = checked_addr;
      }

      let userInput = _.cloneDeep(this.user);

      switch (userInput.account_type) {
        case 'TRAINER':
          userInput.trainer_info = {};
          break;
        case 'HANDLER':
          userInput.handler_info = {};
          break;
        case 'AIDE':
          userInput.aide_info = {};
          break;
        default:
          break;
      }

      let payload = {
        user_id: this.$auth.profile.user_id,
        update: userInput,
      }

      await this.make_request('/private/updateUserProfile', payload);

      this.$emit('user_updated')
      this.loading_save = false;
      this.show_address_confirm = false;
    }
  }
}
</script>

<style scoped>
div>>>.row {
  padding: 5px;
}
</style>
