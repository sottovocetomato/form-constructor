const textInputSettingsModel = [
  {
    component: "BaseTextInput",
    props: {
      id: "placeholderInput",
      displayName: "",
      sequenceNumber: 1,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Placeholder",
    },
    editField: "placeholder",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "IdInput",
      displayName: "",
      sequenceNumber: 2,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Input Id",
    },
    editField: "id",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "minLength",
      displayName: "",
      sequenceNumber: 3,
      isHidden: false,
      required: false,
      type: "number",
      placeholder: "Min char length",
    },
    editField: "min",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "maxLength",
      displayName: "",
      sequenceNumber: 4,
      isHidden: false,
      required: false,
      type: "number",
      placeholder: "Max char length",
    },
    editField: "max",
  },

  {
    component: "BaseCheckbox",
    props: {
      id: "required",
      displayName: "",
      sequenceNumber: 5,
      isHidden: false,
      required: false,
      label: "Required",
    },
    editField: "required",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "disabled",
      displayName: "",
      sequenceNumber: 6,
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    editField: "disabled",
  },
];

export default textInputSettingsModel;
