const createSelectOption = (id) => [
  {
    component: "BaseTextInput",
    props: {
      id: `option-name-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Option Text",
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
      id: `option-selected-checkbox-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      label: "Selected",
    },
    onInput: (fields, state, e) => {
      const selectIndex = e.target.dataset.index - 1;
      state.options.forEach((opt, ind) => {
        if (ind !== selectIndex) {
          opt.selected = null;
        }
      });
    },
    sequenceNumber: 3,
    fieldName: "selected",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: `option-disabled-checkbox-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 4,
    fieldName: "disabled",
  },
];

export default createSelectOption;
