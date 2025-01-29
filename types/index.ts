import type { Component } from "@vue/runtime-core";
import createCheckboxFields from "#build/models/settings/checkboxFields";

export interface ComponentsMap {
  [index: string]: Component;
}
export interface ElementsMap {
  [index: string]: () => Field[];
}

export interface FieldsState {
  [key: string | number | symbol]: string | number | string[] | number[] | {};
}

export type onFieldClickFn = (
  fields?: Field[],
  state?: FieldsState[],
  e?: Event
) => void;

export interface Field {
  component?: string;
  displayByField?: { field: string; showValue: boolean };
  id?: string;
  isGroup?: boolean;
  groupFields?: Field[];
  groupName?: string;
  groupType?: string;
  props?: {
    id?: string | number;
    displayName?: string;
    isHidden?: boolean;
    required?: boolean;
    type?: string;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
  };
  sequenceNumber?: number;
  innerText?: string;
  onClick?: onFieldClickFn;
  fieldName?: string;
  stateBlock?: string;
  initialValue?: boolean;
  displayCondition?: boolean;
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
