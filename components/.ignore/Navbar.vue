<template>
  <nav class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
    <div class="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
      <!-- brand -->
      <a href="#" class="text-white text-sm uppercase hidden lg:inline-block font-semibold" @click="e.preventDefault()">
        Dashboard
      </a>
      <!-- user -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <UserDropdown />
      </ul>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style></style>