export interface InputProps {
  type: string;
  name?: string;
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
  ariaInvalid?: boolean | null;
  customWrapClass?: string;
  customClass?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
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
