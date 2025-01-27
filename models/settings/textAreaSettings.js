const createTextAreaModel = () => [
  {
    component: "BaseTextInput",
    props: {
      id: "labelInput",
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      label: "Label",
      placeholder: "Type text for textarea label...",
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
      placeholder: "Type text for textarea placeholder...",
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
      placeholder: "Type text for textarea name...",
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
      label: "Default height",
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
      id: "disabled",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 7,
    fieldName: "disabled",
  },
  {},
];

export default createTextAreaModel;
