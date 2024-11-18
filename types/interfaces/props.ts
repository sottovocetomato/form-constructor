type Modify<T, R> = Omit<T, keyof R> & R;

export interface TextInputProps extends HTMLInputElement {
  customWrapClass?: string;
  customClass?: string;
}

export interface DateInputProps
  extends Modify<
    TextInputProps,
    {
      ariaLabel?: "Date" | "Datetime local" | "Month" | "Time";
      type: "date" | "datetime-local" | "month" | "time";
    }
  > {}

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
