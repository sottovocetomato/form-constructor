const createSelectPlaceholder = (id) => [
  {
    component: "BaseTextInput",
    props: {
      id: `option-name-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Placeholder",
      placeholder: "Text that will be shown in select field by default...",
      selected: false,
    },
    sequenceNumber: 1,
    isGroup: true,
    fieldName: "text",
  },
  {
    component: "BaseTextInput",
    props: {
      id: `option-value-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: true,
      required: false,
      type: "text",
      placeholder: "Option Value",
      selected: false,
    },
    sequenceNumber: 2,
    isGroup: true,
    fieldName: "value",
    notNullable: true,
    initialValue: "",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: `option-disabled-checkbox-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: true,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 3,
    fieldName: "disabled",
    initialValue: true,
  },
];

export default createSelectPlaceholder;
