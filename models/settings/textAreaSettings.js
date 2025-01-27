const createTextAreaModel = () => [
  {
    component: "BaseTextInput",
    props: {
      id: "labelInput",
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      placeholder: "Label",
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
      placeholder: "Placeholder",
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
      placeholder: "Name (optional)",
    },
    sequenceNumber: 1,
    fieldName: "name",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "placeholderInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Textarea height in rows",
    },
    sequenceNumber: 2,
    fieldName: "rows",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "maxLength",
      displayName: "",
      isHidden: false,
      required: false,
      type: "number",
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

export default createTextAreaModel;
