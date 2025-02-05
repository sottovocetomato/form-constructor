import createSelectOption from "./selectOption.js";
import createSelectPlaceholder from "./selectPlaceholder.js";
import type { Field } from "@/types";

const createSelectModel = (): Field[] => [
  {
    component: "BaseTextInput",
    props: {
      id: "labelSelect",
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      label: "Label",
      placeholder: "Type text for label...",
    },
    sequenceNumber: 1,
    fieldName: "label",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "nameInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Name",
      placeholder: "Type text for name...",
    },
    sequenceNumber: 1,
    fieldName: "name",
  },
  {
    component: "hr",
    sequenceNumber: 5,
  },
  {
    isGroup: true,
    groupType: "ARRAY",
    groupName: "options",
    groupFields: [createSelectPlaceholder(1), createSelectOption(2)],
    sequenceNumber: 2,
  },
  {
    component: "button",
    props: {
      id: "add-row",
      type: "button",
      displayName: "",
      isHidden: false,
      required: false,
      placeholder: "AddRow",
    },
    sequenceNumber: 3,
    innerText: "Add option",
    onClick: {
      eventName: "addRowEvent",
      params: {
        groupName: "options",
        modelCreateFn: { name: "createSelectOption", params: {} },
      },
    },
  },
];

export default createSelectModel;
