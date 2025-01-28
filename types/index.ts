import type { Component } from "@vue/runtime-core";
import createCheckboxFields from "#build/models/settings/checkboxFields";

export interface ComponentsMap {
  BaseInput: Component;
  Header: Component;
  BaseTextInput: Component;
  BaseTextarea: Component;
  BaseSelect: Component;
  BaseDateInput: Component;
  BaseCheckbox: Component;
  BaseDateRange: Component;
  BaseRadio: Component;
}

export interface FieldsState {
  [key: string | number]: string | number | string[] | number[] | {};
}

export type onFieldClickFn = (
  fields?: Field[],
  state?: FieldsState[],
  e?: Event
) => void;

export interface Field {
  component?: string;
  displayByField?: { field: string; showValue: boolean };
  props?: {
    id?: string | number;
    displayName?: string;
    isHidden?: boolean;
    required?: boolean;
    type?: string;
    placeholder?: string;
  };
  sequenceNumber?: number;
  innerText?: string;
  onClick?: onFieldClickFn;
  fieldName?: string;
  initialValue?: boolean;
  displayCondition?: boolean;
}

export function needStateField(field: Field): field is Field {
  return (field as Field).fieldName !== undefined;
}
