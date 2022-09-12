<template>
  <div class="flex">
      <div class="w-64 fixed">
        <!-- <Sidebar class="w-64" /> -->
        <!-- <Sidebar :user="user_api" /> -->
        <Sidebar :user="user" :tasksorted=tasksorted />
      </div>
      <div class="w-full ml-64 p-3">
        <slot />
      </div>
    </div>
  <!-- <div>
    <Sidebar />
    <slot />
  </div> -->
</template>

<script>
  export default {
    props: {
      user: Object,
      users: Object,
      iatasks: Object,
      tasksorted: Object,
      cf: Object,
      items: Object
    }
  }
  </script>