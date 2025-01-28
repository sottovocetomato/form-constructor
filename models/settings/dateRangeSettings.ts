import { Field } from "@/types";

const createDateRangeModel = (): Field[] => [
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
      id: "labelFromInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Date from",
      placeholder: "Label From",
    },
    sequenceNumber: 2,
    fieldName: "labelFrom",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "labelToInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Date to",
      placeholder: "Label To",
    },
    sequenceNumber: 3,
    fieldName: "labelTo",
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
    sequenceNumber: 4,
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
    sequenceNumber: 5,
    fieldName: "disabled",
  },
];

export default createDateRangeModel;
