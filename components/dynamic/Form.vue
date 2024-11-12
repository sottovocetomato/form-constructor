<template>
  <div :class="mainWrapClass">
    <div
      class=""
      v-for="(field, index) in fields"
      :key="`${field}-${index}`"
      :data-index="index"
    >
      <component
        v-if="field?.component"
        :is="componentsMap[field?.component] || field?.component"
        v-bind="field.props"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DynamicFormProps } from "@/types/interfaces/props";
import BaseInput from "../base/forms/BaseInput.vue";
import Header from "../base/Header.vue";

import { ComponentsMap } from "@/types";

const componentsMap: ComponentsMap = {
  BaseInput: BaseInput,
  Header: Header,
};

const {
  fields = [],
  data = [],
  mainWrapClass = "",
} = defineProps<DynamicFormProps>();
</script>

<style scoped></style>
