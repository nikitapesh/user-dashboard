<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import TableUserItem from "./item/TableUserItem.vue";
import { getPeople } from "../../api/index";
import { type PeopleListType } from "../../type/PeopleListType";
import { type PeopleItemType } from "../../type/PeopleItemType";
import { useStore } from "vuex";

const peopleList = ref<PeopleListType>({
  results: [],
  count: 0,
});
const store = useStore();
const isLoading = ref<boolean>(true);

const props = defineProps({
  peopleData: Array as () => PeopleItemType[],
});

const loadPeople = async (url: string = "https://swapi.dev/api/people") => {
  try {
    peopleList.value = await getPeople(url);
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => props.peopleData,
  (newVal) => {
    if (!!newVal && newVal.length >= 1) {
      peopleList.value = {
        count: newVal.length,
        results: newVal,
      };
      isLoading.value = false;
    }
  }
);

onMounted(async () => {
  if (!props.peopleData) await loadPeople();
});

watch(peopleList, () => {
  if ("results" in peopleList.value) {
    store.dispatch(
      "people/checkMultipleInLocalStorage",
      peopleList.value.results
    );
  }
});
</script>

<template>
  <table class="table">
    <tbody>
      <tr class="tableHeader">
        <td>Имя</td>
        <td>Высота</td>
        <td>Вес</td>
        <td>Цвет волос</td>
        <td>В избранное/Удалить</td>
      </tr>
      <tr v-if="isLoading">
        <td colspan="5">Загрузка...</td>
      </tr>
      <TableUserItem
        v-for="(people, index) in peopleList.results || []"
        :key="index"
        :people="people"
        v-if="!isLoading"
      />
    </tbody>
  </table>
  <div class="pagination">
    <button
      v-if="peopleList?.previous"
      @click="
        loadPeople(peopleList.previous);
        isLoading = true;
      "
    >
      Назад
    </button>
    <button
      v-if="peopleList?.next"
      @click="
        loadPeople(peopleList.next);
        isLoading = true;
      "
    >
      Вперед
    </button>
  </div>
</template>

<style lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  height: auto;
  border-radius: 16px;
  background-color: #1c1e21;
  margin-top: 15px;

  .tableHeader {
    background-color: rgba(194, 201, 214, 0.08);
  }

  .item {
    cursor: pointer;
  }

  tr {
    &:not(:first-child) {
      &:not(:last-child) {
        border-bottom: 1px solid rgba(194, 201, 214, 0.08);
      }
    }
  }

  td {
    width: 30px;
    height: 35px;
    padding: 8px 16px;
    font-weight: 600 !important;
    vertical-align: middle;
    color: rgba(239, 242, 251, 0.9);

    &:not(:last-child) {
      border-right: 1px solid rgba(194, 201, 214, 0.08);
    }
  }
}
</style>
