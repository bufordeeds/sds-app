<template>
   <div class="body">
      <div class="page-title" style="text-align: center" >

         Terms of Service

      </div>

      <div class="content-container-bg">
         <div class="content-container-sm">

            <sds-terms/>

         </div>
      </div>
   </div>

</template>

<script>
import SdsTerms from "@/components/SdsTerms";
export default {
   name: "TermsAndConditions",
   components: {SdsTerms},
   props:{
      showHeading: {type:Boolean, default: true}
   }
}
</script>

<style scoped>
.heading {
   font-size: 14pt;
   font-weight: 600;
   margin-top: 13px;

   color: var(--color-txt-grey1);
}

/* numbering headings */
body {
   counter-reset: H1;
}

/* Create the counter for H1 */

h1:before {
   content: counter(H1) ". "; /* Print the H1 number */
}

h1 {
   counter-reset: H2;
   counter-increment: H1; /* Add 1 to next H1 */

   color: var(--color-txt-grey1);
   font-weight: 600;
   font-size: 18pt;
   margin-top: 15px;
}

h2:before {
   content: counter(H1) "." counter(H2) " ";
   counter-increment: H2;
}

h2 {
   counter-reset: H3;
}

h3:before {
   content: counter(H1) "." counter(H2) "." counter(H3) " ";
   counter-increment: H3;
}
</style>