<template>
  <div>
    <ComboBox :options="group" :placeholder="`Select Group`" :header="`Group`" :value="cbTeam" @selected="cbTeam" />
    <!-- <ComboBoxUsers :options="model.users" :placeholder="`Select User`" :header="`User`" @selected="cbName" /> -->
    <ComboBox :options="role" :placeholder="`Select Role`" :header="`Role`" @selected="cbRole" />
  </div>
</template>

<script>
import store from '../../store'
import { computed } from 'vue';
import axiosClient from '~~/axios';
import api from '@/data.json';
import { useStore } from 'vuex';

export default {
  name: 'Add',
  data() {
    return {}
  },
  setup() {
    // const store = useStore();
    const group = computed(() => store.state.group.data);
    store.dispatch('getGroupsData');

    const role = store.state.role.data;
    // console.log(cbTeam, cbRole)

    return { group, role }
  },
  methods: {
    cbTeam(id) {
      console.log(id);
            this.grpId = id;
            axiosClient.get(`/groups/${id}`).then((r) => {
                this.grpName = r.map((t) => t.title).toString();
                var userIds = r.map((id) => id.memberIds);
                const UserArr = [];
                for (let u = 0; u < userIds.length; u++) {
                    UserArr.push(mixin.getUsers(userIds[u]).then((r) => new Promise((res) => res(r))));
                }
                Promise.all(UserArr).then((r) => {
                    this.users = r.flat();
                    console.log(this.users);
                });
            });
    }
  }
}

// const store = useStore();
// const group = computed(() => store.state.group.data);
// store.dispatch('getGroupsData');

// const role = api.role;

// let model = ref({
//   users: [],
//   cbName: ''
// });

// const user = {
//   user_id: '',
//   group_id: '',
//   role: '',
// }

// const cbTeam = (id) => {
//   console.log(id)
//   axiosClient.get(`/groups/${id}`)
//     .then((r) => {
//       // console.log(r.data.data.map((id) => id.memberIds)[0].length)
//       var ids = r.data.data.map((id) => id.memberIds)[0];
//       const UserArr = [];
//       for (let i = 0; i < ids.length; i++) {
//         UserArr.push(axiosClient.get(`/contacts/${ids[i]}`).then((r) => new Promise((res) => res(r))));
//       }
//       Promise.all(UserArr).then((r) => {
//         model.value.users = r.map((d) => d.data.data).flat();
//         // console.log(r.map((d) => d.data.data).flat())
//         // return users;
//       });
//     });
//     return id
// }
// // const cbTeam = (id) => {
// //   console.log(id)
// //   return id
// // }
// const cbName = (id) => {
//   // console.log(id)
//   model.value.cbName = id
// }
// console.log(model.value.cbName)
// const cbRole = (id) => {
//   console.log(id)
//   return id
// }
// watch(() => model.value.users, () => {});
</script>

<style>
:focus-visible {
  outline: -webkit-focus-ring-color auto 0px;
}
</style>