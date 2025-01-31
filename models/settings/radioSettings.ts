import createRadioFields from "./radioFields.js";
import type { Field, onFieldActionFn } from "@/types";

const createRadioModel = (): Field[] => [
  {
    component: "BaseTextInput",
    props: {
      id: "nameInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Name",
      placeholder: "Label for radio group section...",
    },
    sequenceNumber: 1,
    fieldName: "name",
  },
  {
    component: "hr",
    sequenceNumber: 2,
  },
  {
    isGroup: true,
    groupType: "ARRAY",
    groupName: "radioGroup",
    groupFields: [createRadioFields(1)],
    sequenceNumber: 3,
  },
  {
    component: "button",
    props: {
      id: "add-row",
      displayName: "",
      isHidden: false,
      required: false,
      type: "button",
      placeholder: "AddRow",
    },
    sequenceNumber: 4,
    innerText: "Add radio",
    onClick: (fields: Field[]) => {
      if (!fields || !fields.length) return;
      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === "radioGroup"
      );
      if (!optionsGroup || !optionsGroup?.groupFields) return;
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
    sequenceNumber: 5,
    fieldName: "required",
  },
];

export default createRadioModel;
