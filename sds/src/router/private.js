import acceptDog from "@/views/confirmations/accept-dog";
import MyAccountHome from "@/views/mgmHome/MyAccountHome";
import ManageDogs from "@/views/mgmDogs/ManageDogs";
import ManageProfile from "@/views/mgmProfile/ManageProfileContainer";
import TeamProfileEditor from "@/views/profileHandler/TeamProfileEditor";
import Orders from "@/views/mgmOrders/Orders";
import DelegatedAccess from "@/views/mgmProfile/DelegatedAccess";
import profile from "@/views/MemberProfile";
import behaviorStandardsViewer from "@/views/signup/behaviorStandardsViewer";


export default [
   {
      path: '/acceptDog',
      name: 'AcceptDog',
      component: acceptDog,
      // beforeEnter: login_guard,
   },




   {
      path: '/accountHome',
      name: 'MyAccountHome',
      component: MyAccountHome,
      // beforeEnter: login_guard,
   },

   {
      path: '/manageServiceDogs',
      name: 'manageServiceDogs',
      component: ManageDogs,
      // beforeEnter: login_guard,
   },

   {
      path: '/manageProfile',
      name: 'ManageProfile',
      component: ManageProfile,
      // beforeEnter: login_guard,
   },

   {
      path: '/behaviorStandardsViewer',
      name: 'behaviorStandardsViewer',
      component: behaviorStandardsViewer,
      // beforeEnter: login_guard,
   },


   {
      path: '/teamProfileEditor',
      name: 'TeamProfileEditor',
      component: TeamProfileEditor,
      // beforeEnter: login_guard,
   },


   {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      // beforeEnter: login_guard,
   },

   {
      path: '/delegateAccess',
      name: 'DelegatedAccess',
      component: DelegatedAccess,
      // beforeEnter: login_guard,
   },



   {
      path: '/profile',
      name: 'Profile',
      component: profile,
      // beforeEnter: login_guard,
   },

]
