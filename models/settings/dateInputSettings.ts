import type { Field } from "@/types";

const createDateInputModel = (): Field[] => [
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
      id: "nameInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Name",
      placeholder: "Type text for input name (optional)...",
    },
    sequenceNumber: 2,
    fieldName: "name",
  },
  {
    component: "BaseDateInput",
    props: {
      id: "minDate",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Min date",
      placeholder: "Min date",
    },
    sequenceNumber: 3,
    fieldName: "min",
  },
  {
    component: "BaseDateInput",
    props: {
      id: "maxDate",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Max date",
      placeholder: "Max date",
    },
    sequenceNumber: 4,
    fieldName: "max",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "required",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Set at today's date",
    },
    sequenceNumber: 5,
    fieldName: "setToday",
    initialValue: true,
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
      id: "disabled",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 7,
    fieldName: "disabled",
  },
];

export default createDateInputModel;
