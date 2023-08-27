// import AdminHome from "@/views/admin_sds/AdminHome";
import AdminOrders from "@/views/admin_sds/orders/AdminOrders";
import AdminUsers from "@/views/admin_sds/users/AdminUsers";
import AdminFlags from "@/views/admin_sds/flags/AdminFlags";

export default [
   // {
   //    path: '/admin/home',
   //    name: 'adminHome',
   //    component: AdminHome,
   //    beforeEnter: admin_guard,
   // },


   {
      path: '/admin/orders',
      name: 'adminHome',
      component: AdminOrders,
      // beforeEnter: admin_guard,
   },


   {
      path: '/admin/users',
      name: 'adminUsers',
      component: AdminUsers,
      // beforeEnter: admin_guard,
   },

   {
      path: '/admin/flagReports',
      name: 'AdminFlags',
      component: AdminFlags,
      // beforeEnter: admin_guard,
   },

]