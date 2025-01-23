import createRadioFields from "./radioFields.js";

const createRadioModel = () => [
  {
    component: "BaseTextInput",
    props: {
      id: "nameInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Name",
    },
    sequenceNumber: 1,
    fieldName: "name",
  },
  {
    isGroup: true,
    displayByField: { field: "group", showValue: true },
    groupType: "ARRAY",
    groupName: "checkboxGroup",
    groupFields: [createRadioFields(1)],
    sequenceNumber: 2,
  },
  {
    component: "button",
    displayByField: { field: "group", showValue: true },
    props: {
      id: "add-row",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "AddRow",
    },
    sequenceNumber: 3,
    innerText: "Add checkbox",
    onClick: (fields) => {
      if (!fields || !fields.length) return;
      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === "radioGroup"
      );
      if (!optionsGroup) return;
      optionsGroup.groupFields.push(
        createRadioFields(optionsGroup.groupFields.length + 1)
      );
    },
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
    sequenceNumber: 4,
    fieldName: "required",
  },
];

export default createRadioModel;
