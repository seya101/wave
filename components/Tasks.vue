<template>  
  <div class="relative">
    <div class="flex justify-end items-center pb-4 bg-white">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="table-search-users" class="block p-2 pl-10 w-80 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Search for users">
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-600">
        <tr>
          <!-- <th scope="col" class="p-4">
            <div class="flex items-center">
              <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th> -->
          <th scope="col" class="py-3 px-6">Date</th>
          <th scope="col" class="py-3 px-6">Name</th>
          <th scope="col" class="py-3 px-6">Ticket</th>
          <th scope="col" class="py-3 px-6">Brand</th>
          <th scope="col" class="py-3 px-6">Status</th>
          <th scope="col" class="py-3 px-6">Action</th>
        </tr>
      </thead>
      <tbody 
        v-for="task in tasksorted" :key="task.id"
        ref="root"
      >
        <tr 
          v-for="t in iatasks.filter((i) => i.superParentIds[0] == task.id)" :key="t.id"
          class="bg-white border-b dark:border-gray-200 hover:bg-gray-100 text-gray-500"
        >
          <!-- <td class="p-4 w-4">
            <div class="flex items-center">
              <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td> -->
          <td class="py-4 px-6">
            {{ date(t.dates.start) }}
          </td>
          <th 
            v-for="tr in t.responsibleIds"
            :key="tr"
            scope="row" 
            class="flex items-center p-2 text-gray-700 whitespace-nowrap"
          >
            <span v-for="u in users.filter((i) => i.id === tr)" :key="u.id" class="flex items-center">
              <img class="w-8 h-8 rounded-full" :src="u.avatarUrl" alt="">
              <div class="pl-3">
                <div class="font-semibold">{{u.firstName}} {{u.lastName}}</div>
              </div>
            </span>
          </th>
          <td class="py-4 px-6">
            <a :href="t.permalink" class="has-tooltip">
              <span class="tooltip rounded z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700 -mt-8">{{ task.title }}</span>
              {{ task.permalink.split("/open.htm?id=").slice(-1)[0] }}
            </a>
            <div id="tooltip-default" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Tooltip content
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
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
      </tbody>
      <!-- <div class="paginatio">
        <button type="button" :disabled="currentPage === 1" @click="changePage(-1)">Prev</button>
        <button type="button" :disabled="currentPage === 4" @click="changePage(1)">Next</button>
      </div> -->
    </table>
    <div class="text-center p-4 text-base text-gray-500">{{nofound}}</div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        prePage: 12,
        currentPage: 1,
        timer: "",
      }
    },
    props: {
      users: Object,
      iatasks: Object,
      tasksorted: Object,
      nofound: String,
    },
    created() {
      // this.timer = setInterval(window.document.getElementsByTagName("tbody")[0], 100000);
      // const root = ref();
      // console.log(root.value)
    },
    computed: {
      filteredList() {
        console.log('this.currentPage', this.currentPage)
        this.start = (this.currentPage - 1) * this.prePage
        this.end = this.currentPage * this.prePage
        console.log(this.start, this.end)
        console.log('computed', this.tasksorted)
        console.log('result', this.tasksorted.slice(this.start, this.end))
        const result = this.tasksorted.slice(this.start, this.end)
        return result
      }
    },
    methods: {
      date(datetime) {
        const date = moment(datetime).format("MMM Do YYYY");
        return date;
      },
      changePage(n) {
        console.log('num', n)
        console.log('this.currentPage', this.currentPage)
        this.currentPage = this.currentPage + n
      },
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
.tooltip {
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
}
</style>