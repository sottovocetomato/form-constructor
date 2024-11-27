import type { Component } from "@vue/runtime-core";

export enum FieldTypes {
  ARRAY = [],
  OBJECT = {},
  STRING = "",
}

export interface ComponentsMap {
  BaseInput: Component;
  Header: Component;
}
