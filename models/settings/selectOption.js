const selectOptionModel = [
  {
    component: "BaseTextInput",
    props: {
      id: `option-name`,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Option Name",
      selected: false,
    },
    sequenceNumber: 1,
    isGroup: true,
    fieldName: "text",
  },
  {
    component: "BaseTextInput",
    props: {
      id: `option-value`,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Option Value",
      selected: false,
    },
    sequenceNumber: 2,
    isGroup: true,
    fieldName: "value",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "option-required-checkbox",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Required",
    },
    sequenceNumber: 3,
    fieldName: "selected",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "option-disabled-checkbox",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 4,
    fieldName: "disabled",
  },
];

export default selectOptionModel;
