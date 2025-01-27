const createCheckboxFields = (id, displayByField = {}) => [
  {
    component: "BaseTextInput",
    displayByField: displayByField,
    props: {
      id: `label-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      label: "Label",
      placeholder: "Type label for checkbox",
    },
    sequenceNumber: 1,
    fieldName: "label",
  },
  {
    component: "BaseCheckbox",
    displayByField: displayByField,
    props: {
      id: `disabled-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 2,
    fieldName: "disabled",
  },
];

export default createCheckboxFields;
