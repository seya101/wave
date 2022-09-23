<template>
  <NuxtLayout>
    <div class="flex flex-col md:flex-row gap-10 p-7 justify-between items-center">
        <div>
            <h1 class="font-bold text-5xl text-gray-700">Dashboard</h1>
            <p class="text-gray-800 pt-2">
                Subtitle of Page Title
            </p>
        </div>
    </div>
  </NuxtLayout>
</template>

<script>
  export default {
    head: {
      title: 'KPI | Dashboard',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ],
    }
  }
  </script>