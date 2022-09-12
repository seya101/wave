<template>
  <div>
    <!-- <NuxtLink to="/user/add" class="button is-success mt-5">Add New</NuxtLink> -->
    <NuxtLayout :items="items" :role="role">
      <Modal :items="items" :message="message" :group="group" :role="role" :brands="brands" :users="users" @cbTeam="grpId" @submit="save" />
      <UserList :items="items" :name="userdata" :group="groupdata" :role="role" />
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
    };
  },
  setup() {
    // const store = useStore();
    const group = computed(() => store.state.group.data);
    store.dispatch('getGroupsData');

    const role = store.state.role.data;
    const brands = store.state.brands.data;
    console.log(brands)

    return { group, role, brands }
  },
  created() {
    this.getUsers();
  },
  methods: {
    //all users
    async getUsers() {
      try {
        const res = await axios.get('http://localhost:8000/users');
        //users from db
        this.items = res.data;
        // console.log(res.data.map((i)=>i.group_id))
        this.id = res.data.map((i)=>i.user_id);
        const grpid = res.data.map((i)=>i.group_id);
        const Arr = [];
        const grpArr = [];
        for (let i = 0; i<res.data.length; i++) {
          Arr.push(
            axiosClient.get(`/contacts/${this.id[i]}`).then((r) => new Promise((res) => res(r.data.data)))
          );
          grpArr.push(
            axiosClient.get(`/groups/${grpid[i]}`).then((s) => new Promise((res) => res(s.data.data)))
          );
        }
        //all users from api via group_id
        Promise.all(Arr).then((r) => {
          this.userdata = r.flat();
          // console.log(this.userdata)
        })
        //all groups
        Promise.all(grpArr).then((s) => {
          this.groupdata = s.flat();
          // console.log(this.groupdata)
        })
      } catch (err) {
        console.log(err);
      }
    },
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
      console.log(id);
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
    async save(d) {
      const userId = d.map((i) => i.user_id);
      const groupId = d.map((i) => i.group_id);
      const brands = d.map((i) => i.brands);
      const role = d.map((r) => r.role);
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
        router.push('/user');
      } catch (err) {
        console.log(err)
      }
      console.log(userId, brands)
    }
  }
}
</script>

<style></style>