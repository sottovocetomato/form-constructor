import type { Field } from "@/types";

const createTextInputModel = (): Field[] => [
  {
    component: "BaseTextInput",
    props: {
      id: "labelInput",
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      label: "Label",
      placeholder: "Type text for input label...",
    },
    sequenceNumber: 1,
    fieldName: "label",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "placeholderInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Placeholder",
      placeholder: "Type text for input placeholder...",
    },
    sequenceNumber: 2,
    fieldName: "placeholder",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "nameInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Name",
      placeholder: "Type text for input name (optional)...",
    },
    sequenceNumber: 1,
    fieldName: "name",
  },
  // {
  //   component: "BaseTextInput",
  //   props: {
  //     id: "IdInput",
  //     displayName: "",
  //     isHidden: false,
  //     required: false,
  //     type: "text",
  //     placeholder: "Input Id",
  //   },
  //   sequenceNumber: 2,
  //   fieldName: "id",
  // },
  {
    component: "BaseTextInput",
    props: {
      id: "minLength",
      displayName: "",
      isHidden: false,
      required: false,
      type: "number",
      label: "Min",
      placeholder: "Min char length",
    },
    sequenceNumber: 3,
    fieldName: "minlength",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "maxLength",
      displayName: "",
      isHidden: false,
      required: false,
      type: "number",
      label: "Max",
      placeholder: "Max char length",
    },
    sequenceNumber: 4,
    fieldName: "maxlength",
  },
  {
    component: "hr",
    sequenceNumber: 5,
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "required",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Required",
    },
    sequenceNumber: 6,
    fieldName: "required",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "required",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Numeric",
    },
    sequenceNumber: 7,
    fieldName: "number",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "disabled",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 8,
    fieldName: "disabled",
  },
];

export default createTextInputModel;
