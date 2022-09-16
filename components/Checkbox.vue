<template>
  <div class="relative mt-3">
    <Listbox>
      <ListboxLabel 
        class="block text-sm font-medium text-gray-700"
      > 
        {{ props.header }} 
      </ListboxLabel>
    </Listbox>
    <div class="grid grid-2">
      <div 
        v-for="(option, optionIdx) in props.options" 
        :key="option.id" 
        class="inline-flex items-center"
      >
        <input 
          :id="`filter-mobile-${option.id}-${optionIdx}`" 
          :name="`${option.id}`" 
          :value="option.title" 
          type="checkbox" 
          :checked="option.checked" 
          @change="checkBox" 
          class="h-4 w-4 border-gray-300 rounded text-teal-600 focus:ring-teal-500" 
        />
        <label 
          :for="`filter-mobile-${option.id}-${optionIdx}`" 
          class="text-gray-600 text-sm rg-lbl"
        >
            &nbsp;{{ option.title }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/data.json'
import {
  Listbox,
  ListboxLabel
} from '@headlessui/vue'

const props = defineProps({
  options: { type: Object, },
  header: { type: String },
})
// console.log(api.assets)
const task = reactive({
  title: [],
})
const emit = defineEmits(['selected'])
const cbAsset = (value) => {
  emit('selected', value)
}
const checkBox = (e) => {
  if(task.title.includes(e.target.value)) {
    const index = task.title.indexOf(e.target.value);
    task.title.splice(index, 1);
  } else {
    task.title.push(e.target.value)
  }
  // console.log(task.title)
  emit('selected', task.title)
}
watch(() => task.title, () => {});
</script>

<style scoped>
.grid.grid-2 {
  display: grid;
  grid-template: auto / auto auto;
}
/* label {
  font-size: 15px;
} */
</style>