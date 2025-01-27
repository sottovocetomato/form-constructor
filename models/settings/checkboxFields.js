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
      placeholder: "Type text for checkbox label...",
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
  {
    component: "button",
    props: {
      id: "delete-row",
      "data-index": id,
      displayName: "",
      class: "btn-danger",
      isHidden: false,
      required: false,
      type: "button",
      placeholder: "Delete row",
    },
    displayCondition: id != 1,
    sequenceNumber: 3,
    innerText: "Delete checkbox",
    onClick: (fields, state, e) => {
      if (!fields || !fields.length) return;
      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === "checkboxGroup"
      );
      if (!optionsGroup) return;
      const removeAtIndex = +e.target.dataset.index - 1;
      optionsGroup.groupFields.splice(removeAtIndex, 1);
    },
  },
  {
    component: "hr",
    sequenceNumber: 4,
  },
];

export default createCheckboxFields;
