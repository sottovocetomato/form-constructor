import type { Component } from "@vue/runtime-core";

export interface ComponentsMap {
  BaseInput: Component;
  Header: Component;
}

export interface State {
  [key: string | number]: string | number | string[] | number[] | {};
}
