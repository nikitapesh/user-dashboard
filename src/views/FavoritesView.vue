<script setup lang="ts">
import { computed } from "vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import TableList from "../components/table/TableList.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch("loadFavoritePeopleFromLocalStorage");
});

const favoritePeople = computed(() => store.state.favorites.favoritePeople);
</script>

<template>
  <TableList :peopleData="favoritePeople" />
  <p v-if="favoritePeople.length === 0" class="favoritesLink">
    Ни одного пользователя не было добавлено.
    <RouterLink to="/people">Добавьте первого!</RouterLink>
  </p>
</template>

<style lang="scss">
.favoritesLink {
  text-align: center;
  margin-top: 20px;
  color: rgba(239, 242, 251, 0.9);
}
</style>
