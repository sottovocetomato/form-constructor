const createCheckboxFields = (id, displayByField = {}) => [
  {
    component: "BaseTextInput",
    displayByField: displayByField,
    props: {
      id: `label-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Label",
    },
    sequenceNumber: 1,
    fieldName: "label",
  },
  {
    component: "BaseTextInput",
    displayByField: displayByField,
    props: {
      id: `name-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Name (optional)",
    },
    sequenceNumber: 2,
    fieldName: "name",
  },
];

export default createCheckboxFields;
