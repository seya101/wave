<template>
  <div>
    <button class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal" v-on:click="toggleModal()">
      Add User
    </button>
    <div v-if="showModal" id="authentication-modal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div class="relative bg-white rounded-lg shadow">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" v-on:click="toggleModal()">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="py-6 px-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-black">Add</h3>
              <div v-if="message">
                <div class="mt-1 py-3 px-5 flex justify-between bg-red-500 text-white rounded">
                  {{ message }}
                  <span 
                    @click="message = ''" 
                    class="w-6 h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
                  >
                    <svg 
                      class="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <form class="space-y-6">
                <ComboBox :options="group" :placeholder="`Group`" :header="`Group`" :value="cbTeam" @selected="cbTeam" />
                <ComboBoxUsers :userdb="userdb" :options="users" :placeholder="`User`" :header="`User`" @selected="cbName" />
                <ComboBox :options="role" :placeholder="`Role`" :header="`Role`" @selected="cbRole" />
                <Checkbox :options="querybrands" :placeholder="`Brands`" :header="`Brands`" @selected="cbBrands" />
                <div class="flex justify-between">
                  <div class="flex items-start">
                    <button type="submit" class="text-white bg-red-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" v-on:click="toggleModal()">Cancel</button>
                  </div>
                  <button @click.prevent="saveUser" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "large-modal",
    data() {
      return {
        showModal: false,
      }
    },
    props: {
      group: Object,
      users: Object,
      role: Object,
      brands: Object,
      userdb: Object,
      message: String,
    },
    computed: {
      querybrands() {
        const brand = this.brands;
        const brandArr = [];
        for(let i = 0; i < brand.length; i++) {
          const obj = {
            id: i,
            title: brand[i]
          };
          brandArr.push(obj)
        }
        console.log(brandArr)
        return brandArr
      },
    },
    methods: {
      toggleModal(){
        this.showModal = !this.showModal;
        console.log(this.brands)
      },
      cbTeam(id) {
        this.$emit('cbTeam', id)
        this.cbTeam = id
      },
      cbName(id) {
        // this.$emit('cbName', id)
        console.log(id)
        this.cbName = id
      },
      cbRole(id) {
        // this.$emit('cbRole', id)
        console.log(id)
        this.cbRole = id
      },
      cbBrands(values) {
        this.cbBrands = values
        console.log(values)
      },
      async saveUser() {
        // this.$emit(
        //   'submit', 
        //   [{
        //     "group_id": this.cbTeam, 
        //     "user_id": this.cbName, 
        //     "brands": this.cbBrands, 
        //     "role": this.cbRole
        //   }]
        // )
        const userId = this.cbName;
        const groupId = this.cbTeam;
        const brands = this.cbBrands;
        const role = this.cbRole;
        const router = useRouter();

        try {
          await axios.post('http://localhost:8000/users', {
            user_id: userId,
            group_id: groupId,
            brands: brands.toString(),
            role: role
          });
          // userId = '';
          // groupId = '';
          // role = '';
          router.push('/user', this.toggleModal());
        } catch (err) {
          console.log(err)
        }
        console.log(userId, brands)
      }
    }
  }
</script>