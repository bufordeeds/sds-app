function get_meta (title, description,) {

   if (description == null) {
      description = title;
   }

   return {
      title: title,
      metaTags: [
         {
            property: `'og:title`,
            content: title,
         },
         {
            property: 'og:description',
            content: description
         }
      ]
   };
}

export  {
   get_meta
}



