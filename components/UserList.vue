<template>
  <div class="overflow-x-auto relative px-7">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-700 border-b dark:border-gray-500">
        <tr>
          <th scope="col" class="py-3 px-6">Name</th>
          <th scope="col" class="py-3 px-6">Group</th>
          <th scope="col" class="py-3 px-6">Brands</th>
          <th scope="col" class="py-3 px-6">Role</th>
          <th scope="col" class="py-3 px-6">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in userdb"
          :key="i"
          class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 text-gray-500"
        >
          <td class="py-4 px-6 flex items-center">
            <img class="w-8 h-8 rounded-full mr-1" :src="user_img[i]" alt="" /> {{ fname[i] }} {{ lname[i] }}
          </td>
          <td class="py-4 px-6">
            {{ grp[i] }}
          </td>
          <td class="py-4 px-6">
            {{ item.brands.split(',').join(', ') }}
          </td>
          <td class="py-4 px-6">
            {{ role.filter((i)=> i.id === item.role).map((t) => t.title).toString() }}
          </td>
          <td class="py-4 px-6 text-right">
            <!-- <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> -->
            <!-- <EditUser :id="item.user_id" /> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'UserList',
    data() {
      return {
        userdata: [],
        num: 0,
      }
    },
    props: {
      userdb: Object,
      user_img: Object,
      fname: Object,
      lname: Object,
      grp: Object,
      role: Object
    },
    setup() {},
    created() {},
    mounted() {},
    computed: {},
    methods: {},
    mounted() {}
  }
</script>