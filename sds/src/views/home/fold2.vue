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
          style="width:100%; margin-top: 10px"
          color="var(--color-btn)"
          class="white--text"
          @click="search_user"
        >
          Search
        </v-btn>



        <div style="justify-content: flex-end; font-size:12pt; margin-top: 10px; display: flex; align-items: center">
          <v-btn
            text
            class="white--text pr-0"
            @click="$emit('show-advanced-search')"
          >
            <div style="justify-content: flex-start;  display: flex; align-items: center">
              <div style="font-size:12pt; font-weight: 400">
                Advanced Search
              </div>
              <div class=" ml-1 triangle" />
            </div>
          </v-btn>
        </div>
      </div>


      <!--- 2nd  column with buttons/fold2 content ------------------------------------>
      <div style="width: 100%; display: flex; flex-direction: column">
        <!----- 1st row with learn/join buttons ------>
        <div>
          <v-row class="ma-0">
            <v-col>
              <v-btn
                text
                class="learn-more-btn"
                to="/learn-more/mission"
              >
                Learn More
              </v-btn>
            </v-col>
            <v-col style="background-color: #3ab54a; color: white">
              <v-btn
                text
                class="learn-more-btn"
                color="white"
                to="/signup"
              >
                Join for Free
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <div style="height: 100%">
          <v-row
            class="ma-0"
            align="center"
            style="height: calc(100% )"
          >
            <v-col style="font-weight: 600; font-size: 14pt; color: #054e85; padding-left: 30px; padding-right: 30px ">
              <div style="display: flex; justify-content: center; align-items: center">
                <div>
                  Free and voluntary training and behavior standards and team management solutions for
                  Service Dog Trainers and Handlers.
                </div>
              </div>

              <div class="learn-more-btn-container">
                <a
                  href="/learn-more/mission"
                  class="learn-more-txt"
                >
                  <div
                    style="justify-content: flex-start; color:#054e85; font-size:12pt; display: flex; align-items: center"
                  >
                    Learn More
                    <div class="triangle-blue ml-1 " />
                  </div>
                </a>
              </div>
            </v-col>
          </v-row>
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
  width: 100%;
  justify-content: center;
  margin-top: -50px;
  padding-bottom: 50px;
  padding-left: 20px;
  padding-right: 20px;



}

.fold2 {
  /*max-width: var(--max-width);*/
  max-width: 1000px;
  background-color: white;
  width: 100%;
  min-height: 200px;
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  z-index: 1;

}


.member-lookup-box {
  height: 100%;
  width: 500px;
  padding: 15px;
  background-image: linear-gradient(to bottom, #60aee0, #2567b0);
}

.fold2-label {
  color: white;
  /*font-size: 14pt;*/

  font-size: 16pt;
  font-weight: 600;
  /*padding-left: 20px;*/
  /*padding-right: 10px;*/
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
