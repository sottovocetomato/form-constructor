const createTextInputModel = () => [
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
    sequenceNumber: 1,
    fieldName: "placeholder",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "IdInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Input Id",
    },
    sequenceNumber: 2,
    fieldName: "id",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "minLength",
      displayName: "",
      isHidden: false,
      required: false,
      type: "number",
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
      placeholder: "Max char length",
    },
    sequenceNumber: 4,
    fieldName: "maxlength",
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
    sequenceNumber: 5,
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
    sequenceNumber: 6,
    fieldName: "disabled",
  },
];

export default createTextInputModel;
