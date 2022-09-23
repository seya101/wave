<template>
  <aside aria-label="Sidebar" :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="overflow-y-auto bg-gray-50 dark:bg-gray-800 h-screen">
      <!-- Burger Menu -->
      <div class="menu-toggle-wrap p-2"> 
        <button 
          class="menu-toggle text-slate-500 hover:text-fuchsia-500"
          @click="ToggleMenu"
        >
          <svg class="w-7 h-7" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
			  </button>
		  </div>
      <!-- Logo -->
      <div class="logo">
			  <img :src="logoURL" alt="Vue" /> 
		  </div>
      <ul class="space-y-2">
        <!--dashboard-->
        <li>
          <NuxtLink  to="/" 
          class="flex 
              items-center 
              p-2 
              text-base 
              font-normal 
              text-gray-900
              dark:text-white 
              hover:bg-gray-100 
              dark:hover:bg-gray-700"
            >
            <span>
            <svg class="w-7 h-7" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
            </svg>
            </span>
            <span class="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
          </NuxtLink>
        </li>
        <!--qa-->
        <li>
          <NuxtLink to="/task" 
            class="flex 
              items-center 
              p-2 
              text-base 
              font-normal 
              text-gray-900
              dark:text-white 
              hover:bg-gray-100 
              dark:hover:bg-gray-700"
          >
          <span>
            <svg class="w-7 h-7" viewBox="0 0 24 24">
                <path fill="currentColor" d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
            </svg>
          </span>
            <span class="flex-1 ml-3 whitespace-nowrap">Quality Assurance</span>
          </NuxtLink>
        </li>
        <!--users-->
        <!-- <li v-if="role === 3"> -->
        <li>
          <NuxtLink to="/user" 
            class="flex 
              items-center 
              p-2 
              text-base 
              font-normal 
              text-gray-900
              dark:text-white 
              hover:bg-gray-100 
              dark:hover:bg-gray-700"
          >
          <span>
            <svg class="w-7 h-7" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
            </svg>
          </span>
            <span class="flex-1 ml-3 whitespace-nowrap">Users</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <!--user profile-->
    <div v-for="u in user_api" 
      :key="u.id" 
      class="inset-x-0 
        bottom-8 
        h-16 w-48
        sticky 
        mx-auto 
        p-2
        space-y-2
        
        "
      >

      <hr 
        class="
        border-slate-300 
        border-solid
        dark:border-gray-700 
        border-t
        length
        "
      />
      <div class="flex items center">
          <!-- User Avatar -->
          <div class="flex 
          max-w-xs 
          items-center 
          rounded-full 
          bg-gray-800 
          text-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-white 
          focus:ring-offset-2 
          focus:ring-offset-gray-800"
        >
          <img :src="u.avatarUrl"
            class="h-9 w-9 rounded-full" 
            alt="" 
          />
        </div>
        <!-- User Name -->
        <div class="flex 
          items-center 
          p-2 
          text-base 
          font-normal 
          text-gray-900 
          rounded-lg 
          dark:text-white 
          hover:bg-gray-100 
          dark:hover:bg-gray-700
          "
        >
        <span class="text">
          {{u.firstName}} {{u.lastName}}  {{u.role}}
        </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
  import store from '~~/store';
  import logoURL from '~~/assets/img/logo.png';

  import { ref } from 'vue'
  export default {
    props: {},
    setup() {
      const role = store.state.user.role;
      const user_api = computed(() => store.state.userAPI.data);
      store.dispatch('getUserData', store.state.user.id);
      
      const is_expanded = ref(false);

      const ToggleMenu = () => {
        is_expanded.value = !is_expanded.value
      }

      return { user_api, role , logoURL, is_expanded, ToggleMenu}
    },
    created() {}
  }
</script>

<style lang="scss" scoped>
  aside {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
  
    color: var(--dark-alt);
    background-color: white;

    width: calc(3rem + 32px);
    padding: 1rem;

	  transition: 0.2s ease-in-out;

    .logo {
		margin-bottom: 1rem;

      img {
        width: 15rem;
      }
	  }

    hr.length {
        width: 20%;
    }
   span.text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	  }

    a {
        display: flex;
        align-items: center;
        text-decoration: none;

        &.router-link-exact-active {
          background-color: var(--light);
          border-right: 5px solid var(--primary);
  
          path {
            color: var(--primary);
          }
        }
    }

    &.is-expanded {
		width: var(--sidebar-width);

     span.text {
        opacity: 1;
      }

      .logo img {
        opacity: 1;
      }

      hr.length {
        width: 100%;
      }
	  }

    .menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

      .menu-toggle {
        transition: 0.2s ease-in-out;
      }
	  } 
  }
  </style>
