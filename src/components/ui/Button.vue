<script setup lang="ts">
type Props = {
  type: "favorite" | "delete" | "default";
};

const props = defineProps<Props>();

const emit = defineEmits(["buttonClick"]);

function buttonClick() {
  emit("buttonClick");
}
</script>

<template>
  <button :class="`button button-${type}`" @click="buttonClick">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  color: #ffffff;
  border: none;
  border-radius: 24px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &.button-default {
    background-color: #1c1e21;

    &:hover {
      background-color: #2c2e31;
    }
  }

  &.button-favorite {
    background-color: #7dd25c;

    &:hover {
      background-color: #91d476;
    }
  }

  &.button-delete {
    background-color: #e74c3c;

    &:hover {
      background-color: #ea6153;
    }
  }
}
</style>
