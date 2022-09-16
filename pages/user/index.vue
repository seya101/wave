<template>
  <div>
    <!-- <NuxtLink to="/user/add" class="button is-success mt-5">Add New</NuxtLink> -->
    <NuxtLayout>
      <Modal :showModal="showModal" :userdb="userdb" :message="message" :group="group" :role="role" :brands="brands" :users="users" @cbTeam="grpId" />
      <!-- <UserList :items="items" :name="userdata" :group="groupdata" :role="role" /> -->
      <UserList :userdb="userdb" :user_img="user_img" :fname="fname" :lname="lname" :grp="grp" :role="role" />
    </NuxtLayout>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../../store';
import { computed } from 'vue';
import axiosClient from '~~/axios';
// import { useStore } from 'vuex';

export default {
  name: 'UserList',
  data() {
    return {
      items: [],
      users: [],
      userdata: [],
      groupdata: [],
      message: '',
      showModal: false,
    };
  },
  props: {
    userdb: Object,
  },
  setup(props) {
    // from wrike
    const group = computed(() => store.state.group.data);
    store.dispatch('getGroupsData');
    const role = store.state.role.data;
    const brands = computed(() => store.state.brands.data);
    store.dispatch('getBrands');

    // from db
    // const userdb = ref([]);
    const userapi = ref([]);
    const groupapi = ref([]);

    onMounted(async () => {
      // const res = await axios.get('http://localhost:8000/users');
      // userdb.value = res.data;
      // const user = res.data.map((i)=>i.user_id);
      // const g = res.data.map((i)=>i.group_id);
      const user = props.userdb.map((i)=>i.user_id);
      const g = props.userdb.map((i)=>i.group_id);
      const UserArr = [];
      const GroupArr = [];

      for(let u = 0; u < props.userdb.length; u++) {
        UserArr.push(
          axiosClient.get(`/contacts/${user[u]}`).then((r) => new Promise((res) => res(r.data.data)))
        );
        GroupArr.push(
          axiosClient.get(`/groups/${g[u]}`).then((s) => new Promise((res) => res(s.data.data)))
        );
      }
      //all users from api via group_id
      Promise.all(UserArr).then((r) => {
          userapi.value = r.flat();
        })
        //all groups
        Promise.all(GroupArr).then((s) => {
          groupapi.value = s.flat();
        })
    })

    return { 
      group, 
      role, 
      brands,
      userapi, 
      groupapi,
    } 
  },
  created() {},
  mounted() {},
  computed: {
    fname() {
      console.log(this.userdb)
      return this.userapi.map((f) => f.firstName)
    },
    lname() {
      return this.userapi.map((l) => l.lastName)
    },
    user_img() {
      return this.userapi.map((i) => i.avatarUrl)
    },
    grp() {
      return this.groupapi.map((t) => t.title)
    },
  },
  methods: {
    // delete user
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:8000/users/${id}`);
        this.getUsers();
      } catch (err) {
        console.log(err);
      }
    },
    grpId(id) {
      console.log(this.userdb)
      this.grpId = id;
      axiosClient.get(`/groups/${id}`).then((r) => {
        // this.grpName = r.data.data.map((t) => t.title).toString();
        var userIds = r.data.data.map((id) => id.memberIds);
        const UserArr = [];
        for (let u = 0; u < userIds.length; u++) {
          UserArr.push(axiosClient.get(`/contacts/${userIds[u]}`).then((r) => new Promise((res) => res(r.data.data))));
        }
        Promise.all(UserArr).then((r) => {
          this.users = r.flat();
          // console.log(this.users);
        });
      });
    },
    roleId(id) {
      this.roleId = id;
      // console.log(this.roleId)
    },
    userId(id) {
      this.userId = id;
      // console.log(this.userId)
    },
  },
}
</script>

<style></style>