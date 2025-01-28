import createCheckboxFields from "./checkboxFields.js";
import { Field } from "#build/types";

const createCheckboxModel = (): Field[] => [
  {
    component: "BaseCheckbox",
    props: {
      id: "required",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Group",
    },
    sequenceNumber: 2,
    fieldName: "group",
    refreshFieldState: true,
    initialValue: false,
  },
  {
    component: "hr",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "nameInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Section label",
      placeholder: "Label for checkbox section...",
    },
    sequenceNumber: 1,
    fieldName: "name",
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
      type: "button",
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
];

export default createCheckboxModel;
