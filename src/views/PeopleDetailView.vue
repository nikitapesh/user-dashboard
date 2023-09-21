<script setup lang="ts">
import { onMounted, ref } from "vue";
import { PeopleItemType } from "../type/PeopleItemType";
import TableList from "../components/table/TableList.vue";
import { getPeople } from "../api/index";

const activePeople = ref<PeopleItemType[]>([]);

const pageNumber = ref<number | null>(null);

onMounted(async () => {
  const path = window.location.pathname;
  const match = path.match(/\/people\/(\d+)(\/)?/);

  if (match && match[1]) {
    pageNumber.value = parseInt(match[1], 10);
  }
  console.log(pageNumber.value);
  await getPeople(`https://swapi.dev/api/people/${pageNumber.value}/`).then(
    (data) => {
      activePeople.value = [data as PeopleItemType];
    }
  );
});
</script>

<template>
  <TableList :peopleData="activePeople" />
</template>
