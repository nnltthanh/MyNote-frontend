<!--this is the navbar component displayed at the top of every page in the application
it will conditionally render links based on if the user is logged in or not
also contains a mobile menu that will conditionally render-->
<template>
    <nav class="bg-brand-darkpurple shadow-lg">
    <!--regular navbar-->
    <div class="mx-auto px-4">
      <div class="flex justify-between">
        <div class="hidden md:flex items-center px-2 py-3">

            <router-link to="/home"
              ><img
                src="../../assets/dailyfaithjournallogowhitetext.png"
                class="logo mr-2"
            /></router-link>
           
          <div
              v-if="isLoggedIn"
              class="navlink py-4 px-2 ">
              <router-link to="/notes">Notes</router-link>
            </div>

          </div>
  

        <div class="hidden md:flex items-center">

          <div
            v-if="isLoggedIn"
            class="block px-2 py-4 hover:text-brand-cream transition duration-300"
          >
            <router-link @click="logoutUser" to="/login">Logout</router-link>
          </div>
        </div>
      </div>
    </div>

    <!--mobile navbar-->
    <div v-if="isLoggedIn">
    <div class="md:hidden flex items-center px-4 py-5">
      <button @click="mobileMenuOpen = !mobileMenuOpen">
        <Icon icon="octicon:three-bars-16" width="32" height="32" class="text-brand-cream mx-3 mb-3" />
      </button>
    </div>
  </div>
  <div v-else>
    <div class="md:hidden flex items-center px-4 py-5">
      <router-link to="/home"
              ><img
                src="../../assets/dailyfaithjournallogowhitetext.png"
                class="logo mr-2"
            /></router-link>
             
    </div>
  </div>
    <div v-if="mobileMenuOpen">
      <ul>
        
        <li class="active">
          <div
            v-if="isLoggedIn"
            class="block text-sm px-2 py-4 ml-3 hover:text-brand-cream transition duration-300"
          >
            <router-link to="/home">Home</router-link>
          </div>
        </li>
        <div class="justify-between">
        <li>
          <div
            v-if="isLoggedIn"
            class="block text-sm px-2 py-4 ml-3 hover:text-brand-cream transition duration-300"
          >
            <router-link to="/notes">Notes</router-link>
          </div>
        </li>
      </div>
        <li>
          <div
            v-if="isLoggedIn"
            class="block text-sm px-2 pt-4 ml-3 pb-6 hover:text-brand-cream transition duration-300"
          >
            <router-link @click="logoutUser" to="/login">Logout</router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <div>

  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
  components: {
    Icon
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.logo {
  width: 80px;
  height: 60px;
}

a:active,
a:hover,
a.router-link-active {

    --tw-text-opacity: 1;
    color: rgb(243 239 224 / var(--tw-text-opacity));
}
</style>
