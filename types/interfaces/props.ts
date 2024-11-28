// type Modify<T, R> = Omit<T, keyof R> & R;

export interface FormElementProps {
  customWrapClass?: string;
  customClass?: string;
  placeholder?: string;
  label?: string;
  options?: [];
  ariaInvalid?: boolean | undefined;
}
export interface CheckboxProps extends FormElementProps {
  type?: "checkbox" | "radio";
}
export interface DateInputProps extends FormElementProps {
  type?: "date" | "datetime-local" | "month" | "time";
}

export interface DynamicFormProps {
  fields: DynamicFormFields[];
  data?: {}[];
  mainWrapClass?: string;
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
