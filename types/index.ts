import type { Component } from "@vue/runtime-core";

export interface ComponentsMap {
  [index: string]: Component;
}
export interface ElementsMap {
  [index: string]: (id?: string | number) => Field[];
}

export type FieldsState = Record<string, any>;

export type onFieldActionFn = (
  fields: Field[],
  state: FieldsState,
  e: Event
) => void;

export interface Field {
  component?: string;
  displayByField?: { field: string; showValue: boolean };
  id?: string;
  isGroup?: boolean;
  groupFields?: Field[] | Field[][];
  groupName?: string;
  groupType?: string;
  props?: {
    id?: string | number;
    "data-index"?: string | number;
    displayName?: string;
    isHidden?: boolean;
    required?: boolean;
    class?: string;
    type?: string;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
    selected?: boolean;
  };
  sequenceNumber?: number;
  innerText?: string;
  onClick?: onFieldActionFn;
  onInput?: onFieldActionFn;
  fieldName?: string;
  stateBlock?: string;
  initialValue?: boolean | string | number | object | string[] | number[];
  refreshFieldState?: boolean;
  displayCondition?: boolean;
  notNullable?: boolean;
}
export interface CheckBoxElement {
  label: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
}
export type DateRangeModel = { dateStart: string; dateEnd: string };

export function needStateField(field: Field): field is Field {
  return (field as Field).fieldName !== undefined;
}
