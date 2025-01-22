import createCheckboxFields from "./checkboxFields.js";

const createCheckboxModel = () => [
  {
    component: "BaseCheckbox",
    props: {
      id: "required",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Group",
    },
    sequenceNumber: 5,
    fieldName: "group",
    refreshFieldState: true,
    initialValue: false,
  },
  ...createCheckboxFields(1, { field: "group", showValue: false }),
  {
    isGroup: true,
    displayByField: { field: "group", showValue: true },
    groupType: "ARRAY",
    groupName: "checkboxGroup",
    groupFields: [createCheckboxFields(1)],
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
        (el) => el?.isGroup && el.groupName === "checkboxGroup"
      );
      if (!optionsGroup) return;
      optionsGroup.groupFields.push(
        createCheckboxFields(optionsGroup.groupFields.length + 1)
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
    sequenceNumber: 5,
    fieldName: "required",
  },

  {
    component: "BaseCheckbox",
    props: {
      id: "disabled",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 7,
    fieldName: "disabled",
  },
];

export default createCheckboxModel;
