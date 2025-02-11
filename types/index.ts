import type { Component } from "@vue/runtime-core";

export interface ComponentsMap {
  [index: string]: Component;
}
export interface ElementsMap {
  [index: string]: () => Field[];
}

export type FieldsState = Record<string, any>;
export interface FieldModelsFnMap {
  [index: string]: ({
    id,
    displayByField,
  }: {
    id: string | number;
    displayByField?: { field: string; showValue: boolean };
  }) => Field[];
}

export type FieldStateData =
  | boolean
  | string
  | number
  | object
  | string[]
  | number[]
  | undefined
  | null;

export interface FieldEvent {
  eventName: string;
  params: {
    groupName: string;
    modelCreateFn?: { name: string; params: Record<string, any> };
  };
}

export interface FieldEventArgs {
  fields: Field[];
  groupName: string;
  fieldsState: {
    state: FieldsState;
    setStateField: (fieldName: string, data: FieldStateData) => void;
  };
  e?: Event;
  modelCreateFn: { name: string; params: Record<string, any> };
}

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
  children?: Field[];
  sequenceNumber?: number;
  innerText?: string;
  onClick?: FieldEvent;
  onInput?: FieldEvent;
  fieldName?: string;
  stateBlock?: string;
  initialValue?: FieldStateData;
  refreshFieldState?: boolean;
  displayCondition?: boolean;
  notNullable?: boolean;
  settingsFields?: [];
}
export interface CheckBoxElement {
  label: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export interface SavedForm {
  id: string | number;
  name: string;
  form: Field[];
}

export type DateRangeModel = { dateStart: string; dateEnd: string };

export function needStateField(field: Field): field is Field {
  return (field as Field).fieldName !== undefined;
}
