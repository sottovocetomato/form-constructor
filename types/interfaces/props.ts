// type Modify<T, R> = Omit<T, keyof R> & R;

export interface FormElementProps {
  customWrapClass?: string;
  customClass?: string;
  placeholder?: string;
  label?: string;
  number?: boolean;
  ariaInvalid?: boolean | undefined;
  modelValue?: string | object;
}
export interface CheckboxProps extends FormElementProps {
  type?: "checkbox" | "radio";
}
export interface SelectInputProps extends FormElementProps {
  options?: SelectOptions[];
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
  dateRange?: object;
}

export interface DynamicFormProps {
  fields: DynamicFormFields[];
  data?: {}[];
  mainWrapClass?: string;
  noSubmitBtn?: boolean;
  formId?: number | string | null | undefined;
}

export interface DynamicFormFields {
  component: string;
  props: {
    customClass?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    label?: string;
    storeField?: string;
  };
}

export interface SelectOptions {
  selected?: boolean;
  disabled?: boolean;
  text?: string;
  value?: string;
}
