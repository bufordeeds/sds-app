<template>
   <v-btn icon x-small :color="icon_color" @click="on_click">
      <img v-if="sortDir2 === 'ascending'" src="../../assets/images/icons/sort-ascending.svg" alt="Ascending"
         style="width: 18px; height: 18px;" />
      <img v-else-if="sortDir2 === 'descending'" src="../../assets/images/icons/sort-descending.svg" alt="Descending"
         style="width: 18px; height: 18px;" />
      <img v-else src="../../assets/images/icons/sort-unselected.svg" alt="Unselected"
         style="width: 18px; height: 18px;" />
   </v-btn>
</template>

<script>
export default {
   name: "SortIcon",
   props: {
      sortDir: { type: String, default: 'descending' }, // ascending | descending | none.
      disabled: { type: Boolean, default: false }, // controls whether the associated list is sorted at all
   },
   data() {
      return {
         sortDir2: this.sortDir,
      };
   },
   computed: {
      icon_color() {
         return this.sortDir2 === 'none' ? '#b1b1b1' : 'var(--color-btn)';
      },
   },
   watch: {
      sortDir(newVal) {
         if (this.sortDir2 !== newVal) {
            this.sortDir2 = newVal;
         }
      },
      sortDir2(newVal) {
         this.$emit('update:sortDir', newVal);
      },
   },
   methods: {
      on_click() {
         if (this.sortDir2 === 'none') {
            this.sortDir2 = 'ascending';
         } else if (this.sortDir2 === 'ascending') {
            this.sortDir2 = 'descending';
         } else if (this.sortDir2 === 'descending') {
            this.sortDir2 = 'ascending';
         }
         this.$emit('click', this.sortDir2);
      },
   },
};
</script>

<style scoped>
.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
   background-color: transparent !important;
}
</style>
