<template>
  <div>
    <NuxtLayout :users="users" >
      <div class="relative">
        <div class="flex flex-col md:flex-row gap-10 justify-between items-center">
        <div>
            <h1 class="font-bold text-2xl text-gray-700">Quality Assurance</h1>
            <p class="text-gray-800 pt-2">
                Subtitle of Page Title
            </p>
        </div>
        </div>
        <div class="flex justify-end items-center pb-4">

          <Listbox />
          <ComboBox :options="querybrands" :placeholder="`Brands`" @selectedtitle="fetchTasks" class="w-[250px]" />
        </div>
        <Tasks :users="users" :iatasks="iatasks" :tasksorted="tasksorted" :grpName="grpName" :user_brands="user_brands" :nofound="nofound" />
        <div class="text-center p-4 text-base text-gray-500">{{nofound}}</div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from '../../store';
  import { computed } from 'vue';
  import axiosClient from '~~/axios';
  import moment from 'moment';
  
  export default {
    layout: 'default',
    name: 'UserList',
    data() {
      return {
        users: [],
        iatasks: [],
        tasksorted: [],
        cf: [],
        folders: [],
        timer: "",
        nofound: "",
        grpName: "",
        week_start_date: "",
        week_end_date: "",
      };
    },
    props: {
      userdb: Object,
    },
    setup() {
      //db datas
      const user_id = computed(() => store.state.user.id);
      const user_grpId = computed(() => store.state.user.group_id);
      const user_role = computed(() => store.state.user.role);
      const user_brands = computed(() => store.state.user.brands); 

      // const userdb = ref([]);
      // onMounted(async () => {
      //   const res = await axios.get('http://localhost:8000/users');
      //   userdb.value = res.data;
      // });
  
      return { user_id, user_grpId, user_role, user_brands }
    },
    created() {
      // this.getUsers();
      this.thisweek();
      this.fetchTasks();
      this.timer = setInterval(this.fetchTasks, 100000);
    },
    mounted() {},
    computed: {
      querybrands() {
        console.log(this.user_brands.split(','));
        const brand = this.user_brands.split(',');
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
    watch: {},
    methods: {
      selectbrand(id) {
        console.log(this.tasksorted.filter(c => c.customFields.some(v => v.value.includes(id))))
        this.tasksorted = this.tasksorted.filter(c => c.customFields.some(v => v.value.includes(id)))
      },
      thisweek() {
        const today = moment();
        const from_date = today.startOf('week').format('YYYY-MM-DD');
        const to_date = today.endOf('week').format('YYYY-MM-DD');

        const from_month = today.startOf('month').format('YYYY-MM-DD');
        const to_month = today.endOf('month').format('YYYY-MM-DD');

        this.week_start_date = from_date;
        this.week_end_date = to_date;
        console.log({
          from_month: from_month.toString(),
          today: moment().toString(),
          to_month: to_month.toString(),
        });
      },
      fetchTasks(brId) {
        axiosClient.get(`/groups/${this.user_grpId}`).then((r) => {
          this.grpName = r.data.data.map((t) => t.title).toString();
          const userIds = r.data.data.map((id) => id.memberIds).flat();
          const roleDB = this.userdb.filter((i) => i.user_id === this.user_id).map((r) => r.role);
          const teamlead = this.userdb.filter((i) => i.group_id === this.user_grpId && i.role === 2 ).map((i) => i.user_id)[0];
          
          if(userIds.indexOf(this.user_id) !== -1 && roleDB == 2) { //tl
            userIds.splice(userIds.indexOf(this.user_id), 1)
          } else if (userIds.indexOf(this.user_id) !== -1 && roleDB == 3) {
            userIds.splice(userIds.indexOf(teamlead), 1)
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
            const endDate = today;
            console.log('start date ' + this.week_start_date)
            // axiosClient.get(`tasks?responsibles=[${ids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate={"start":"${startDate}","end":"${endDate}"}&customStatuses=["IEADVMHZJMBRONOY"]`)
            axiosClient.get(`tasks?responsibles=[${ids}]&fields=[responsibleIds, parentIds, superParentIds]&scheduledDate=${today}&customStatuses=["IEADVMHZJMBRONOY"]`)
              .then((res) => {
                const taskId = res.data.data.map((i) => i.id);
                console.log(res.data.data)

                if(res.data.data.length === 0) {
                  this.nofound = "No task to review."
                } else {
                  axiosClient.get(`tasks/${taskId}`)
                  .then((res) => {
                    const tasks = res.data.data;
                    // this.iatasks = tasks.filter((s) => s.customStatusId === "IEADVMHZJMBRONOY");
                    this.iatasks = res.data.data;
                    if(this.iatasks.length === 0) {
                      this.nofound = "No task to review."
                    }
                    console.log('iatasks')
                    console.log(this.iatasks)
                    // console.log(this.iatasks.map((sp) => sp.superParentIds))

                    const folderIds = this.iatasks.map((sp) => sp.superParentIds);
                    // const folderIdsnull = this.iatasks.filter((sp) => sp.superParentIds == "");
                    const parent = this.iatasks.map((sp) => sp.parentIds);
                    const FolderArr = [];
                    const sampleArr = [];
                    for (let f = 0; f < folderIds.length; f++) {
                      if(folderIds[f].length == 0 && parent[f] != "IEADVMHZI7777777") {
                        // console.log(parent[f])
                        FolderArr.push(
                          axiosClient.get(`folders/${parent[f]}` || `tasks/${parent[f]}`)
                            .then((r) => new Promise((res) => res(r.data.data[0])))
                        )
                      } else {
                        // console.log(folderIds[f])
                        FolderArr.push(
                          axiosClient.get(`folders/${folderIds[f]}` || `tasks/${folderIds[f]}`)
                            .then((r) => new Promise((res) => res(r.data.data[0])))
                        )
                      }
                    }
                    Promise.all(FolderArr).then((res) => {
                      this.folders = res.flat();
                      const cf = this.folders.filter(c => c.customFields != ("" || undefined || null));
                      // console.log('folders')
                      // console.log(this.folders)
                      // console.log(cf)
                      const br = this.user_brands.split(',');
                      // const br = this.sbrand;
                      const BrandSorted = [];
                      for(let b = 0; b < br.length; b++) {
                        BrandSorted.push(cf.filter(c => c.customFields.some(v => v.value.includes(br[b]))))
                      }
                      Promise.all(BrandSorted).then((res) => {
                        if(brId == ("" || undefined || null)) {
                          this.tasksorted = res.flat();
                          if(this.tasksorted == 0) {
                            this.nofound = "No task to review."
                          } else {
                            this.nofound = ""
                          }
                        } else {
                          this.tasksorted = res.flat().filter(c => c.customFields.some(v => v.value.includes(brId)));
                          if(this.tasksorted == 0) {
                            this.nofound = "No task to review."
                          } else {
                            this.nofound = ""
                          }
                        }
                        console.log('tasksorted')
                        console.log(this.tasksorted)
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