<script setup lang="ts"></script>

<template>
  <div class="navbar">
    <router-link to="/favorites">Избранное</router-link>
    <router-link to="/people">Список пользователей</router-link>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 0;
  height: 100vh;

  a {
    background-color: rgba(194, 201, 214, 0.14);
    color: #eff2fb;
    padding: 8px 12px;
    border-radius: 24px;
    text-decoration: none;
    font-weight: 100;
    transition: 0.4s;

    &:hover {
      background-color: rgba(194, 201, 214, 0.2);
    }
  }
}
</style>
