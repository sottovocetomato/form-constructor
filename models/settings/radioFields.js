const createRadioFields = (id) => [
  {
    component: "BaseTextInput",
    props: {
      id: `label-input-${id}`,
      "data-index": id,
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
      id: `value-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Value",
    },
    sequenceNumber: 2,
    fieldName: "value",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: `disabled-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 3,
    fieldName: "disabled",
  },
];

export default createRadioFields;
