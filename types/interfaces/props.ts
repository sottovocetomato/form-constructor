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
