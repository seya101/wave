<template>
  <div class="flex">
      <div class="w-64 fixed">
        <!-- <Sidebar class="w-64" /> -->
        <!-- <Sidebar :user="user_api" /> -->
        <Sidebar />
      </div>
      <div class="w-full ml-20 p-3">
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
    }
  }
  </script>