import Home from "@/views/home/Home";
import tester from "@/views/tester";
import login from "@/views/login";
import Logout from "@/views/LoggedOut";
import PrivacyCookiePolicy from "@/views/PrivacyCookiePolicy";
import TermsAccessUse from "@/views/TermsAccessUse";
import TermsConditions from "@/views/TermsConditions";
import ContactUs from "@/views/ContactUs";
import FAQ from "@/views/learnMore/FAQ";
import LearnMore from "@/views/learnMore/LearnMore";
import confirmEmail from "@/views/confirmations/setup-confirm-email";
import confirmEmailChange from "@/views/confirmations/confirm-email-change";
import requestPassReset from "@/views/PassResetRequest";
import ResetPassword from "@/views/confirmations/ResetPassword";
import setup_h from "@/views/signup/SetupAccount_h";
import ProfileViewer from "@/views/profileHandler/ProfileViewer";
import TeamProfile from "@/views/profileHandler/TeamProfile";
import FindTrainers from "@/views/FindTrainers";
import trainerProfile from "@/views/profileTrainer/TrainerProfile";
import Store from "@/views/shop/Store";
import Checkout from "@/views/shop/Checkout";
import ShoppingCartContainer from "@/views/shop/ShoppingCartContainer";
import DonatePage from "@/views/shop/donate/DonatePage";
import DonateSuccessRedirect from "@/views/shop/donate/DonateSuccessRedirect";
import PmtSuccessRedirect from "@/views/shop/PmtSuccessRedirect";




import {get_meta} from '@/router/helper';









export default [
   {
      path: '/',
      name: 'Home',
      component: Home,
      meta: get_meta(
          'Service Dog Standards',
          'Free and voluntary training and behavior standards and team management solutions for Service Dog Trainers and Handlers.'
      ),
   },

   {
      path: '/tester',
      name: 'tester',
      component: tester,
   },


   {
      path: '/login',
      name: 'Login',
      component: login,
      meta: get_meta(
          'Service Dog Standards Login',
      ),
   },

   {
      path: '/logout',
      name: 'Logout',
      component: Logout
   },

   {
      path: '/privacy',
      name: 'Privacy',
      component: PrivacyCookiePolicy,
      meta: get_meta(
          'SDS Privacy Policy',
          'Free and voluntary training and behavior standards and team management solutions for Service Dog Trainers and Handlers.'
      ),
   },


   {
      path: '/terms-access-use',
      name: 'TermsAccessUse',
      component: TermsAccessUse
   },


   {
      path: '/terms-and-conditions',
      name: 'TermsAndConditions',
      component: TermsConditions
   },

   {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUs
   },

   {
      path: '/faq',
      name: 'FAQ1',
      component: FAQ,
      meta: get_meta(
          'Service Dog Standards FAQ',
          'Frequently asked questions about service dogs'
      ),

   },

   {
      path: '/faq/:section',
      name: 'FAQ',
      component: FAQ,
      meta: get_meta(
          'Service Dog Standards FAQ',
          'Frequently asked questions about service dogs'
      ),
   },

   {
      path: '/learn-more/:page',
      name: 'LearnMore',
      component: LearnMore
   },



   //*********** confirmations ******************

   {
      path: '/confirm',
      name: 'confirm',
      component: confirmEmail
   },


   {
      path: '/confirmEmailChange',
      name: 'confirmEmailChange',
      component: confirmEmailChange
   },

   {
      path: '/requestResetPassword',
      name: 'requestPassReset',
      component: requestPassReset
   },

   {
      path: '/resetPassword',
      name: 'ResetPassword',
      component: ResetPassword
   },






   {
      path: '/signup',
      name: 'Setup_h',
      component: setup_h,

   },




   // {
   //    path: '/setup-v',
   //    name: 'Setup_v',
   //    component: setup_v,
   // },

   {
      path: '/profile/:user_id',
      name: 'ProfileViewer',
      component: ProfileViewer,
   },

   {
      path: '/team/:dog_num',
      name: 'TeamProfile',
      component: TeamProfile,
   },

   {
      path: '/findTrainers',
      name: 'FindTrainers',
      component: FindTrainers,
      meta: get_meta(
          'Service Dog Standards Trainer Search',
      ),
   },

   {
      path: '/trainer/:user_id',
      name: 'TrainerProfile',
      component: trainerProfile,
   },


   {
      path: '/store',
      name: 'Store',
      component: Store,
      meta: get_meta(
          'Service Dog Standards Shop & Support',
      ),
   },


   {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
      meta: get_meta(
          'Service Dog Standards Checkout',
      ),
      // beforeEnter: login_guard,
   },


   {
      path: '/cart',
      name: 'Cart',
      component: ShoppingCartContainer,
      meta: get_meta(
          'Service Dog Standards Cart',
      ),
   },


   {
      path: '/donate',
      name: 'Donate',
      component: DonatePage,
      // beforeEnter: login_guard,
      meta: get_meta(
          'Service Dog Standards Donate',
      ),
   },

   {
      path: '/donate/success',
      name: 'DonateSuccessRedirect',
      component: DonateSuccessRedirect,
      // beforeEnter: login_guard,
   },

   {
      path: '/checkout/success',
      name: 'pmtSuccessRedirect',
      component: PmtSuccessRedirect,
      // beforeEnter: login_guard,
   },
]
