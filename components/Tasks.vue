<template>  
  <div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-600">
        <tr>
          <th scope="col" class="py-3 px-6">Date</th>
          <th scope="col" class="py-3 px-6">{{ grpName }}</th>
          <th scope="col" class="py-3 px-6">Ticket</th>
          <th scope="col" class="py-3 px-6">Brand</th>
          <th scope="col" class="py-3 px-6">Status</th>
          <th scope="col" class="py-3 px-6">Action</th>
        </tr>
      </thead>
      <tbody>
        <template 
          v-for="t in iatasks" 
          :key="t.id"
          ref="root"
        >
          <tr 
            v-for="task in filteredtask.filter((i) => i.id == t.parentIds || i.id == t.superParentIds)" :key="task.id"
            class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 text-gray-500"
          >
            <td class="py-4 px-6">
              {{ date(t.dates.start) }}
            </td>
            <th 
              v-for="tr in t.responsibleIds"
              :key="tr"
              scope="row" 
              class="flex items-center py-4 px-6 text-gray-700 whitespace-nowrap"
            >
              <span v-for="u in users.filter((i) => i.id === tr)" :key="u.id" class="flex items-center">
                <img class="w-8 h-8 rounded-full" :src="u.avatarUrl" alt="" />
                <div class="pl-3">
                  <div class="font-semibold">{{u.firstName}} {{u.lastName}}</div>
                </div>
              </span>
            </th>
            <td class="py-4 px-6">
              <a :href="t.permalink" class="has-tooltip hover:text-purple-600 hover:dark:text-purple-500">
                <!-- <span class="tooltip rounded z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700 -mt-8">{{ task.title }}</span> -->
                <!-- {{ task.permalink.split("/open.htm?id=").slice(-1)[0] }} -->
                {{ task.permalink.split("/open.htm?id=").slice(-1)[0] }} - {{ t.title }}
              </a>
              <!-- <div id="tooltip-default" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                  Tooltip content
                  <div class="tooltip-arrow" data-popper-arrow></div>
              </div> -->
            </td>
            <td class="py-4 px-6">
              {{ task.customFields.filter((id) => id.id === 'IEADVMHZJUABUJGM').map((v) => v.value)[0]}}
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center">
                <div class="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div> Internal Review
              </div>
            </td>
            <td class="py-4 px-6">
              <a href="#" class="font-medium text-purple-600 dark:text-purple-500 hover:underline">Review</a>
            </td>
          </tr>
        </template>
      </tbody>
      <!-- <div class="paginatio">
        <button type="button" :disabled="currentPage === 1" @click="changePage(-1)">Prev</button>
        <button type="button" :disabled="currentPage === 4" @click="changePage(1)">Next</button>
      </div> -->
    </table>
    <!-- <div class="text-center p-4 text-base text-gray-500">{{nofound}}</div> -->
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        timer: "",
      }
    },
    props: {
      users: Object,
      iatasks: Object,
      tasksorted: Object,
      querybrands: Object,
      nofound: String,
      grpName: String,
    },
    created() {
      // this.timer = setInterval(window.document.getElementsByTagName("tbody")[0], 100000);
      // const root = ref();
      // console.log(root.value)
    },
    computed: {
      filteredtask() {
        const taskid = this.tasksorted.reduce((p, c) => {
          p[c.id] = c;
          return p;
        }, {});
        return Object.values(taskid).sort((a, b) => a.id.localeCompare(b.id));
      },
    },
    methods: {
      date(datetime) {
        const date = moment(datetime).format("MMM Do YYYY");
        return date;
      },
      selectedbrand(title) {
        // console.log(title)
        this.$emit('selectedbr', title)
        // this.sbrand = title
      }
      // cancelAutoUpdate(){
      //   clearInterval(this.timer);
      // },
    },
    // beforeUnmount() {
    //   this.cancelAutoUpdate();
    // }
  }
</script>

<style>
/* .tooltip {
  visibility: hidden;
  position: absolute;
}
.has-tooltip:hover .tooltip {
  visibility: visible;
  z-index: 50;
}
.tooltip-arrow {
  position: absolute; left: 0px; transform: translate(59px, 0px);
  bottom: 15px;
} */
</style>