<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { type PeopleItemType } from "../../../type/PeopleItemType";

const props = defineProps<{ people: PeopleItemType }>();

const store = useStore();

watch(
  () => localStorage.getItem(store.state.people.localStorageKey),
  () => {
    store.dispatch("people/checkLocalStorage", props.people.name);
  }
);

store.dispatch("people/checkLocalStorage", props.people.name);

const isPersonStored = computed(
  () => store.state.people.peopleInLocalStorage[props.people.name]
);
</script>

<template>
  <tr>
    <td>{{ props.people.name }}</td>
    <td>{{ props.people.height }}</td>
    <td>{{ props.people.mass }}</td>
    <td>{{ props.people.hair_color }}</td>
    <td>
      <button
        v-if="!isPersonStored"
        @click="store.dispatch('people/addToLocalStorage', props.people)"
      >
        добавить
      </button>
      <button
        v-if="isPersonStored"
        @click="
          store.dispatch('people/removeFromLocalStorage', props.people.name);
          store.state.favorites.favoritePeople.splice(
            store.state.favorites.favoritePeople.indexOf(props.people),
            1
          );
        "
      >
        удалить
      </button>
    </td>
  </tr>
</template>
