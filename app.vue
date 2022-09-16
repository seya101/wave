<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtPage :userdb="userdb" />
  </div>
</template>

<script>
  import axios from 'axios';
  import store from './store';
  
  export default {
    data() {
      return {}
    },
    setup () {
      const userdb = ref([]);
      onMounted(async () => {
        const res = await axios.get('http://localhost:8000/users');
        userdb.value = res.data;
      });

      return { userdb }
    },
    created() {},
    computed: {},
    watch: {},
    methods: {}
  }
</script>