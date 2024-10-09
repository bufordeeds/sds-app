<template>
  <div class="fold2-container">
    <div class="fold2">
      <!--- first column with blue search box ------------------------------------>
      <div class="member-lookup-box">
        <div class="fold2-label">
          Membership Lookup
        </div>
        <my-form ref="form1">
          <my-text-input
            v-model="search_num"
            label="Enter 10 digit SDS number"
            :rules="[isRequired,]"
          />
        </my-form>
        <v-btn
          style="width:100%;margin-top:10px;border-radius:36px;"
          color="var(--color-btn)"
          class="white--text"
          @click="search_user"
        >
          Search
        </v-btn>

        <div class="mt-4">
          <v-btn
            text
            class="pr-0"
            style="width:100%;padding:0;border-radius:36px;"
            @click="$emit('show-advanced-search')"
          >
            <div>
              <span style="color:#0066CC;font-size:15px;font-weight:500;line-height:36px;">
                Advanced Search
              </span>
            </div>
          </v-btn>
        </div>

      </div>

    </div>
  </div>
</template>

<script>


import validation from "@/mixins/validation";

export default {
  name: "FoldTwo",
  mixins: [validation],
  props: {
    searchNum: String,
  },

  data() {
    return {
      search_num: this.searchNum,
    }
  },

  watch: {
    search_num(newVal) {
      this.$emit('update:searchNum', newVal);
    },

    searchNum(newVal) {
      if (newVal !== this.search_num) {
        this.search_num = newVal;
      }
    }
  },

  methods: {
    search_user() {

      if (!this.$refs.form1.validate()) {
        return;
      }

      this.$emit('search-user',);
    }
  }


}
</script>

<style scoped>
.fold2-container {
  display: flex;
  /*position: absolute;*/
  /*width: 100%;*/
  justify-content: center;
  margin-top: -50px;
  padding-bottom: 50px;
  padding-left: 20px;
  padding-right: 20px;
}

.fold2 {
  /*max-width: var(--max-width);*/
  /*max-width: 1000px;*/
  background-color: white;
  width: auto;
  min-width: 300px;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 8px;
  border: solid 4px #F6F9FB;
  background-color: #FFF;
  z-index: 1;
}

.member-lookup-box {
  height: 100%;
  width: 100%;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
}

.fold2-label {
  color: #101010;
  font-size: 16pt;
  font-weight: 600;
}
.input-container > input {
  border: solid 1px #A4A4A9 !important;
  border-radius: 4px;
}

.learn-more-btn {
  font-size: 16pt;
  font-weight: 600;
  color: var(--color-headline);
  padding-left: 20px;
  padding-right: 10px;
  letter-spacing: -0.1px;
}

div>>>.v-btn {
  border-radius: 0px;
}

.triangle {
  --width: 5px;
  width: 0;
  height: 0;
  border-top: var(--width) solid transparent;
  border-bottom: var(--width) solid transparent;
  border-left: 7px solid #ffffff;
  margin-top: 2px;
}

.triangle-blue {
  --width: 5px;
  width: 0;
  height: 0;
  border-top: var(--width) solid transparent;
  border-bottom: var(--width) solid transparent;
  border-left: 7px solid #2d76ba;
  margin-top: 2px;
}
</style>
