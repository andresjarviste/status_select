<script setup lang="ts">
import StatusSelect from "@/components/StatusSelect.vue";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { getStatus } from "../controllers/getStatus";
import type { Statuses, OrderedStatusElement } from "../interfaces/status";

const placeHolder: OrderedStatusElement = {
  status_id: "loading",
  status_name: "...",
  color: "#fff",
  module: "",
  is_default: 0,
  modified_date: "",
  order: 0,
};

const tasksStatuses: Ref<Statuses> = ref({});
const projectStatuses: Ref<Statuses> = ref({});
const selectedProjectStatus: Ref<OrderedStatusElement> = ref(placeHolder);

onMounted(async () => {
  const loadingTasksStatuses = getStatus("tasks");
  const loadingProjectStatuses = getStatus("projects");
  let defaultProjectStatus: string | undefined = "future";
  const loadedProjectStatuses = await loadingProjectStatuses;
  if (loadedProjectStatuses) {
    projectStatuses.value = loadedProjectStatuses as Statuses;
    defaultProjectStatus = Object.keys(loadedProjectStatuses).find(
      (status_id) => projectStatuses.value[status_id].is_default
    );
    console.log("defaultProjectStatus", defaultProjectStatus);
    if (defaultProjectStatus) {
      console.log(projectStatuses.value[defaultProjectStatus]);
      selectedProjectStatus.value = {
        ...projectStatuses.value[defaultProjectStatus],
      };
    }
  }
  const loadedTasksStatuses = await loadingTasksStatuses;
  if (loadedTasksStatuses) {
    tasksStatuses.value = loadedTasksStatuses as Statuses;
  }
});

function handleProjectStatusChange(newProjectStatus: string) {
  console.log(newProjectStatus);
  const selected = projectStatuses.value[newProjectStatus];
  console.log(tasksStatuses.value);
  console.log(selected);
  selectedProjectStatus.value = selected;
}
</script>

<template>
  <div class="custom-select">
    <h1>This is a components and test page</h1>
    <div class="statuses">
      <StatusSelect
        :selectedId="selectedProjectStatus.status_id"
        :options="projectStatuses"
        :tabIndex="1"
        @input="handleProjectStatusChange"
      />
      <StatusSelect
        :selectedId="selectedProjectStatus.status_id"
        :options="projectStatuses"
        :tabIndex="2"
        @input="handleProjectStatusChange"
      />
    </div>
  </div>
</template>
<style scoped>
.statuses {
  display: flex;
  justify-content: space-around;
}
</style>
