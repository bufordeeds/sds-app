<template>
  <div>
    <div>
      Responses to the following questions will be kept private and only shared with others in annonymized statistical
      form.  You will not be identified.
    </div>

    <v-container>
      <table>
        <tr>
          <td class="q-heading-row">
            Have you, or do you currently, serve in the military?
          </td>
          <td class="ans-col">
            <v-radio-group
              v-model="ans.isMilitary"
              row
              hide-details
            >
              <v-radio
                v-for="item in binary"
                :key="item.txt+'mil'"
                :label="item.txt"
                :value="item.val"
              />
            </v-radio-group>
          </td>
        </tr>
        <tr>
          <td class="q-heading-row">
            Have you, or do you currently, work as a civilian wartime contractor?
          </td>
          <td class="ans-col">
            <v-radio-group
              v-model="ans.isCivilianContractor"
              row
              hide-details
            >
              <v-radio
                v-for="item in binary"
                :key="item.txt+'cc'"
                :label="item.txt"
                :value="item.val"
              />
            </v-radio-group>
          </td>
        </tr>


        <tr>
          <td class="q-heading-row">
            Do you use your Service Dog to help with an injury, which occurred while serving in the military,
            or working as a civilian wartime contractor?
          </td>
          <td class="ans-col">
            <v-radio-group
              v-model="ans.wartimeInjury"
              row
              hide-details
            >
              <v-radio
                v-for="item in binary"
                :key="item.txt+'inj'"
                :label="item.txt"
                :value="item.val"
              />
            </v-radio-group>
          </td>
        </tr>
      </table>

      <!--<v-divider style="margin-top: 20px; margin-bottom: 20px"></v-divider>-->
      <v-row>
        <v-col>
          <span class="q-heading">
            Which best describes your nationality?
          </span>
          <v-radio-group v-model="ans.race">
            <v-radio
              v-for="item in race"
              :key="item"
              :label="item"
              :value="item"
            />
          </v-radio-group>
        </v-col>

        <v-col>
          <span class="q-heading">
            Highest level of education
          </span>
          <v-radio-group v-model="ans.education">
            <v-radio
              v-for="item in education"
              :key="item"
              :label="item"
              :value="item"
            />
          </v-radio-group>
        </v-col>

        <v-col>
          <span class="q-heading">
            Approximate annual income?
          </span>
          <v-radio-group v-model="ans.income">
            <v-radio
              v-for="item in income"
              :key="item"
              :label="item"
              :value="item"
            />
          </v-radio-group>
        </v-col>
      </v-row>






      <v-row style="margin-top: 30px">
        <v-spacer />
        <v-btn
          color="var(--color-primary)"
          @click="submit"
        >
          Submit
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";

export default {
   name: "CensusInfo",
   mixins: [data_getters],
   data(){
      return {
         ans:{
            race: null,
            education: null,
            income: null,
            isMilitary: null,
            isCivilianContractor: null,
            wartimeInjury: null,
         },



         race: [
             'African American/Black',
             'Asian',
             'Caucasian/White',
             'Filipino',
             'Hispanic',
             'Latino',
             'Native American/Alaska Native',
             'Pacific Islander'
         ],

         education:[
             'Grades K-12',
             'High School Diploma/GED',
             'Some College',
             '2 Year/Associates Degree',
             '4 Year Degree',
             'Masters Degree',
             'Doctorate'
         ],

         income:[
             'Less than $20,000',
             '$20,000 - $40,000',
            '$40,000 - $60,000',
            '$60,000 - $80,000',
            '$80,000 - $100,000',
            'Over $100,000',
         ],

         binary:[{txt:'Yes', val: true}, {txt:'No', val: false}],


      }
   },

   methods:{
      submit(){

         let atLeastOne = false;

         let keys = Object.keys(this.ans);
         for (let k of keys){
            if (this.ans[k] !== null){
               atLeastOne = true;
            }
         }

         if (atLeastOne){
            this.$emit('census_submit', this.ans);
         }

      }
   }

}
</script>

<style scoped>

div >>> .v-input--selection-controls{
   padding-top: 5px;
}
.q-heading{
   font-weight: bold;
}
.q-heading-row{
   font-weight: bold;
   padding-right: 5px;
   padding-bottom: 20px;
}

.ans-col{
   padding-bottom: 20px;
   min-width: 150px;
   display: flex;
   justify-content: flex-end;
}
</style>
