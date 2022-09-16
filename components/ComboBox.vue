<template>
  <Combobox 
    as="div" 
    v-model="selected" 
    @update:modelValue="check"
  >
    <!-- <Combobox v-model="selected"> -->
      <div class="relative mt-3">
        <Listbox>
          <ListboxLabel 
            class="block 
              text-sm 
              font-medium 
              text-gray-700"
            > 
              {{ props.header }} 
            </ListboxLabel>
        </Listbox>
        <div
          class="relative 
            w-full 
            cursor-default 
            overflow-hidden 
            rounded-lg 
            bg-white 
            text-left 
            shadow-md 
            focus:outline-none 
            focus-visible:ring-2 
            focus-visible:ring-white 
            focus-visible:ring-opacity-75 
            focus-visible:ring-offset-2 
            focus-visible:ring-offset-teal-300 
            sm:text-sm"
        >
          <ComboboxInput
            :displayValue="(o) => o.title"
            @input="query = $event.target.value"
            :placeholder="props.placeholder"
            class="w-full 
              border-none 
              py-2 
              pl-3 
              pr-10 
              text-sm 
              leading-5 
              text-gray-900 
              focus:ring-0 
              focus:outline-none"
          />
          <!-- {{ selected.id }} -->
          <ComboboxButton
            class="absolute 
              inset-y-0 right-0 
              flex 
              items-center 
              pr-2"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="cb-op 
              absolute 
              mt-1 
              max-h-60 
              w-full 
              overflow-auto 
              rounded-md 
              bg-white 
              py-1 
              text-base 
              shadow-lg 
              ring-1 
              ring-black 
              ring-opacity-5 
              focus:outline-none 
              sm:text-sm"
          >
            <div
              v-if="filteredGroup.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="o in filteredGroup"
              as="template"
              :key="o.id"
              :value="o"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium selected': selected, 'font-normal': !selected }"
                >
                  {{ o.title }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
        <!-- {{selected}} -->
      </div>
    </Combobox>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    ComboboxLabel,
    ComboboxButton,
    TransitionRoot,
    Listbox,
    ListboxLabel
  } from '@headlessui/vue'
  import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

  const props = defineProps({
    options: { type: Object },
    header: { type: String },
    placeholder: { type: String },
    // modelValue: {
    //   type: String,
    //   default: ''
    // }
  })

  // const group = props.options
  const selected = ref(props.options)
  const query = ref('')
  // const check = ref('')

  watch(() => props.options, () => {});

  const filteredGroup = computed(() =>
    query.value === ''
      ? props.options
      : props.options.filter((o) => 
        o.title
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
    )

  const emit = defineEmits(['selectedid', 'selectedtitle'])
  const check = () => {
    console.log(
      selected.value.title
    )
    emit('selectedid', selected.value.id);
    emit('selectedtitle', selected.value.title);
  }
</script>

<style scoped>
  .cb-op {
    z-index: 1;
  }
</style>