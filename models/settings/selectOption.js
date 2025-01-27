const createSelectOption = (id) => [
  {
    component: "BaseTextInput",
    props: {
      id: `option-name-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      label: "Option text",
      placeholder: "Type text for current option...",
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
      required: true,
      type: "text",
      label: "Option value",
      placeholder: "Value, that will be sent to the server...",
      selected: false,
    },
    sequenceNumber: 2,
    isGroup: true,
    fieldName: "value",
    notNullable: true,
  },
  // {
  //   component: "BaseCheckbox",
  //   props: {
  //     id: `option-selected-checkbox-${id}`,
  //     "data-index": id,
  //     displayName: "",
  //     isHidden: false,
  //     required: false,
  //     label: "Selected",
  //   },
  //   onInput: (fields, state, e) => {
  //     const selectIndex = e.target.dataset.index - 1;
  //     state.options.forEach((opt, ind) => {
  //       if (ind !== selectIndex) {
  //         opt.selected = null;
  //       }
  //     });
  //   },
  //   sequenceNumber: 3,
  //   fieldName: "selected",
  // },
  {
    component: "BaseCheckbox",
    props: {
      id: `option-hidden-checkbox-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      label: "Hidden",
    },
    sequenceNumber: 3,
    fieldName: "hidden",
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
  {
    component: "button",
    props: {
      id: "delete-row",
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      type: "button",
      placeholder: "Delete row",
    },
    sequenceNumber: 3,
    innerText: "Delete option",
    onClick: (fields, state, e) => {
      if (!fields || !fields.length) return;
      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === "options"
      );
      if (!optionsGroup) return;
      const removeAtIndex = +e.target.dataset.index - 1;
      optionsGroup.groupFields.splice(removeAtIndex, 1);
    },
  },
  {
    component: "hr",
    sequenceNumber: 5,
  },
];

export default createSelectOption;
