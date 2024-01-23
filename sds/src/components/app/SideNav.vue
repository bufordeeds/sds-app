<template>
  <v-navigation-drawer
    permanent
    class="nav-drawer"
    absolute
    width="300px"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Membership Center
        </v-list-item-title>
        <!--               <v-list-item-subtitle>-->
        <!--                  subtext-->
        <!--               </v-list-item-subtitle>-->
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.path"
        class="menu-item"
        active-class="active-link"
      >
        <v-list-item-icon>
          <v-icon v-if="item.icon">
            {{ item.icon }}
          </v-icon>
          <template v-if="item.image">
            <img
              v-if="$route.path === item.path"
              :src="item.image_active"
              width="24px"
            >
            <img
              v-else
              :src="item.image"
              width="24px"
            >
          </template>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideNav",
   props: {
     value: Boolean,
   },

  data () {
    return {
       show: this.value,
      right: null,
    }
  },

  computed:{
    items(){

      let ans =[];

       if (this.$auth.authenticated){
          if (this.$auth.profile.acct_type === 'SDS-ADMIN'){
             ans = [
                // { title: 'Admin Home', icon: 'home', path: '/admin/home'},
                { title: 'Manage Orders', icon: 'home', path: '/admin/orders'},
                { title: 'Manage Users', icon: 'account_circle', path: '/admin/users'},
                { title: 'Flag Reports', icon: 'flag', path: '/admin/flagReports'},

             ] ;
          }
          else if (this.$auth.profile.acct_type === 'TRAINER'){
             ans = [
                { title: 'Account Home', icon: 'home', path: '/accountHome'  },
                { title: 'My Info', icon: 'account_circle', path: '/manageProfile'},

                { title: 'Manage Clients & Dogs', path: '/manageServiceDogs', image: require('../../assets/images/icons/dog-face.png'),
                   image_active: require('../../assets/images/icons/dog-face-white.png')  },

                { title: 'My Orders', icon: 'shopping_cart', path: '/orders'  },
                { title: 'Delegated Access', icon: 'account_circle', path: '/delegateAccess'  },
             ] ;
          }

          else if (this.$auth.profile.acct_type === 'HANDLER'){
             ans = [
                { title: 'Account Home', icon: 'home', path: '/accountHome'  },
                { title: 'My Info', icon: 'account_circle', path: '/manageProfile'  },


                { title: 'Manage Service Dogs', path: '/manageServiceDogs',
                   image: require('../../assets/images/icons/dog-face.png'),
                   image_active: require('../../assets/images/icons/dog-face-white.png')  },

                { title: 'Edit Profile Page', path: '/teamProfileEditor',
                   image: require('../../assets/images/icons/man-and-dog.png') ,
                   image_active: require('../../assets/images/icons/man-and-dog-white.png')},

                { title: 'My Orders', icon: 'shopping_cart', path: '/orders'  },
                { title: 'Delegated Access', icon: 'account_circle', path: '/delegateAccess'  },
             ] ;
          }
       }

      return ans;
    }
  }
}
</script>

<style scoped>
.active-link{
  background-color: var(--color-btn);
  color: white;
}

div.menu-item:hover {
  background-color: var(--color-btn);
}
.menu-item{
  /*background-color: #0066ff;*/
}
</style>
