// type Modify<T, R> = Omit<T, keyof R> & R;

import type { Field, CheckBoxElement, DateRangeModel } from "@/types";
import { FieldsState } from "#build/types";

export interface FormElementProps {
  customWrapClass?: string;
  customClass?: string;
  placeholder?: string;
  label?: string;
  number?: boolean;
  required?: boolean;
  validated?: boolean;
  ariaInvalid?: boolean | undefined;
  modelValue?: string | object;
  name?: string;
}
export interface CheckboxProps extends FormElementProps {
  type?: "checkbox" | "radio";
  group?: boolean;
  checkboxGroup?: CheckBoxElement[];
}
export interface RadioProps extends FormElementProps {
  radioGroup?: CheckBoxElement[];
}
export interface SelectInputProps extends FormElementProps {
  options?: HTMLOptionElement[];
}
export interface DateInputProps extends FormElementProps {
  type?: "date" | "datetime-local" | "month" | "time";
  setToday?: boolean;
}
export interface DateRangeInputProps extends DateInputProps {
  type?: "date" | "datetime-local" | "month" | "time";
  labelFrom?: string;
  labelTo?: string;
  nameTo?: string;
  nameFrom?: string;
  dateRange?: DateRangeModel;
}

export interface DynamicFormProps {
  fields: Field[];
  data?: {}[];
  mainWrapClass?: string;
  noSubmitBtn?: boolean;
  noDeleteBtn?: boolean;
  resetFields?: boolean;
  formId?: number | string | null | undefined;
  loadedState?: FieldsState;
}

// export interface DynamicFormFields {
//   component: string;
//   props: {
//     customClass?: string;
//     id?: string;
//     type?: string;
//     placeholder?: string;
//     label?: string;
//     storeField?: string;
//   };
// }

// export interface SelectOptions {
//   selected?: boolean;
//   disabled?: boolean;
//   text?: string;
//   value?: string;
// }
