<script setup lang="ts">
import { ref, watch } from "vue";
import { getFilteredPeople } from "../api/index";
import { type PeopleListType } from "../type/PeopleListType";
import TableList from "../components/table/TableList.vue";

const peopleListFiltered = ref<PeopleListType>();
const textFilter = ref<string>("");
const requestQueue = ref(Promise.resolve());

watch(
  () => textFilter.value,
  async () => {
    console.log(textFilter.value);

    requestQueue.value = requestQueue.value.then(async () => {
      peopleListFiltered.value = await getFilteredPeople(textFilter.value);
    });

    await requestQueue.value;
  }
);
function addToLocalStorage(peopleUrl: string) {
  const path = peopleUrl;
  const match = path.match(/\/people\/(\d+)(\/)?/);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
}
</script>

<template>
  <div class="inputDropdown">
    <input
      type="text"
      v-model="textFilter"
      placeholder="Введите имя пользователя"
    />
    <div class="dropdown">
      <div
        class="dropdownItem"
        v-for="(people, index) in peopleListFiltered?.results"
        :key="index"
      >
        <RouterLink
          class="dropdownLink"
          :to="`/people/${addToLocalStorage(people.url)}`"
          >{{ people?.name }}</RouterLink
        >
      </div>
    </div>
  </div>
  <TableList />
</template>

<style lang="scss">
.inputDropdown {
  input {
    margin-top: 15px;
    border: 1px solid rgba(194, 201, 214, 0.08);
    outline: none;
    padding: 8px 15px;
    border-radius: 24px;
    min-width: 250px;
    background-color: rgba(194, 201, 214, 0.08);
    color: rgba(239, 242, 251, 0.9);

    &:placeholder {
      color: rgba(239, 242, 251, 0.9);
    }
  }

  .dropdownLink {
    color: rgba(239, 242, 251, 0.9);
  }
}
</style>
