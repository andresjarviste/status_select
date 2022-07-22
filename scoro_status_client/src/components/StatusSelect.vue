<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { OrderedStatusElement, Statuses } from "../interfaces/status";

interface Props {
  selectedId: string;
  options: Statuses;
  tabIndex: number;
}

const props = defineProps<Props>();

const placeHolder: OrderedStatusElement = {
  status_id: "loading",
  status_name: "...",
  color: "#fff",
  module: "",
  is_default: 0,
  modified_date: "",
  order: 0,
};

const currentId: Ref<string> = ref(props.selectedId);
const open: Ref<boolean> = ref(false);
const currentOption = computed(() => {
  const currentOption = props.options[props.selectedId];
  if (!currentOption) {
    return placeHolder;
  }
  return currentOption;
});
</script>
<template>
  <div class="status-select" :tabindex="props.tabIndex" @blur="open = false">
    <div
      class="selected"
      @click="open = !open"
      :style="{ 'background-color': currentOption.color }"
    >
      {{ currentOption.status_name }}
    </div>
    <div class="items" :class="{ 'select-hide': !open }">
      <div
        class="items__item"
        :class="{ 'items__item-selected': option.status_id == currentId }"
        v-for="(option, i) of props.options"
        :key="i"
        @click="
          currentId = option.status_id;
          open = false;
          $emit('input', option.status_id);
        "
      >
        <div
          class="item__item-bullet"
          :style="{ 'background-color': option.color }"
        ></div>
        <div class="item__item-name">
          {{ option.status_name }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.status-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 2rem;
  line-height: 2rem;
  width: fit-content;
}

.status-select .selected {
  border-radius: 4px;
  background-color: aqua;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: fit-content;
  color: #fff;
  cursor: pointer;
}

.status-select .items {
  padding: 1rem 0rem 0.5rem 0rem;
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(31, 34, 38, 0.08),
    0px 8px 32px rgba(31, 34, 38, 0.12);
  border-radius: 4px;
}

.status-select .items__item {
  max-height: 2rem;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: 400;
  cursor: pointer;
}

.status-select .select-hide {
  height: 0px;
  padding: 0px;
  overflow: hidden;
}

.status-select .items__item-selected {
  font-weight: 600;
  color: #043159;
  background-color: #ebf5fa;
  border-left-color: #0085e0;
  border-left-style: solid;
}
.status-select .items__item:hover {
  background: #f7f9fd;
}

.status-select .item__item-bullet {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}
</style>
