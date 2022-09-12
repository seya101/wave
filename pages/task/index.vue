<template>
  <div>
    <NuxtLayout :user="user_api" :users="users" :tasksorted="taskSorted">
      <Tasks :user="user_api" :users="users" :iatasks="iatasks" :tasksorted="taskSorted" :nofound="nofound" />
    </NuxtLayout>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from '../../store';
  import { computed } from 'vue';
  import axiosClient from '~~/axios';
  
  export default {
    layout: 'default',
    name: 'UserList',
    data() {
      return {
        users: [],
        iatasks: [],
        taskSorted: [],
        cf: [],
        userDB: this.userDB,
        timer: "",
        nofound: "",
      };
    },
    setup() {
      //db datas
      const user_id = computed(() => store.state.user.id);
      const user_grpId = computed(() => store.state.user.group_id);
      const user_role = computed(() => store.state.user.role);
      const user_brands = computed(() => store.state.user.brands); 
      // const userDB = computed(() => store.state.userDB.data);
      // store.dispatch('getUserinDB');

      //api datas
      const user_api = computed(() => store.state.userAPI.data);
      store.dispatch('getUserData', store.state.user.id);
      // console.log(user_api)
  
      return { user_id, user_grpId, user_role, user_brands, user_api }
    },
    created() {
      this.getUsers();
      this.fetchTasks();
      this.timer = setInterval(this.fetchTasks, 100000);
      console.log(this.user_api)
    },
    computed: {},
    methods: {
      async getUsers() {
        try {
          const res = await axios.get('http://localhost:8000/users');
          this.items = res.data;
        } catch (err) {
          console.log(err);
        }
      },
      fetchTasks() {
        axiosClient.get(`/groups/${this.user_grpId}`).then((r) => {
          // this.grpName = r.data.data.map((t) => t.title).toString();
          const userIds = r.data.data.map((id) => id.memberIds).flat();
          const roleDB = this.items.filter((i) => i.user_id === this.user_id).map((r) => r.role);
          const tl = this.items.filter((i) => i.group_id === this.user_grpId && i.role === 2 ).map((i) => i.user_id)[0];
          
          if(userIds.indexOf(this.user_id) !== -1 && roleDB == 2) { //tl
            userIds.splice(userIds.indexOf(this.user_id), 1)
          } else if (userIds.indexOf(this.user_id) !== -1 && roleDB == 3) {
            userIds.splice(userIds.indexOf(tl), 1)
          }

          const UserArr = [];
          for (let u = 0; u < userIds.length; u++) {
            UserArr.push(axiosClient.get(`/contacts/${userIds[u]}`).then((r) => new Promise((res) => res(r.data.data))));
          }
          Promise.all(UserArr).then((r) => {
            this.users = r.flat();
            console.log(this.users.map((i) => i.id))
            const ids = this.users.map((i) => i.id);
            const today = new Date().toISOString().slice(0, 10);
            const startDate = '2022-09-01'; //yy-mm-dd
            const endDate = today
            axiosClient.get(`tasks?responsibles=[${ids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate={"start":"${startDate}","end":"${endDate}"}&customStatuses=["IEADVMHZJMBRONOY"]`)
            // axiosClient.get(`tasks?responsibles=[${ids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate=${today}&customStatuses=["IEADVMHZJMBRONOY"]`)
              .then((res) => {
                const taskId = res.data.data.map((i) => i.id);
                console.log(res.data.data.map((i) => i.id))

                if(res.data.data.length === 0) {
                  this.nofound = "No task to review."
                } else {
                  axiosClient.get(`tasks/${taskId}`)
                  .then((res) => {
                    const tasks = res.data.data;
                    // this.iatasks = tasks.filter((s) => s.customStatusId === "IEADVMHZJMBRONOY");
                    this.iatasks = res.data.data;
                    // console.log(this.iatasks.map((sp) => sp.superParentIds))

                    const folderIds = this.iatasks.map((sp) => sp.superParentIds);
                    // const folderIdsnull = this.iatasks.filter((sp) => sp.superParentIds == "");
                    const parent = this.iatasks.map((sp) => sp.parentIds);
                    // console.log(folderIds)
                    const FolderArr = [];
                    for (let f = 0; f < folderIds.length; f++) {
                      if(folderIds[f] == "" && parent[f] != "IEADVMHZI7777777") {
                        // console.log(parent[f])
                        FolderArr.push(
                          axiosClient.get(`folders/${parent[f]}`)
                            .then((r) => new Promise((res) => res(r.data.data[0])))
                        )
                      } else {
                        // console.log(folderIds[f])
                        FolderArr.push(
                          axiosClient.get(`folders/${folderIds[f]}`)
                            .then((r) => new Promise((res) => res(r.data.data[0])))
                        )
                      }
                    }
                    Promise.all(FolderArr).then((res) => {
                      this.folders = res.flat();
                      const cf = this.folders.filter(c => c.customFields != ("" || undefined || null));
                      const br = this.user_brands.split(',');
                      const BrandSorted = [];
                      for(let b = 0; b < br.length; b++) {
                        BrandSorted.push(cf.filter(c => c.customFields.some(v => v.value.includes(br[b]))))
                      }
                      Promise.all(BrandSorted).then((res) => {
                        this.taskSorted = res.flat()
                        console.log(this.taskSorted.length)
                        console.log(this.taskSorted)
                      })
                    })
                  })
                }
              })
          });
        });
      },
      cancelAutoUpdate(){
        clearInterval(this.timer);
      },
    },
    beforeUnmount() {
      this.cancelAutoUpdate();
    }
  }
  </script>

<style>

</style>