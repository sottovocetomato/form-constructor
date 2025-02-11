import createCheckboxFields from "./checkboxFields.js";
import type { Field } from "@/types";

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

  ...createCheckboxFields({
    id: 1,
    displayByField: { field: "group", showValue: false },
  }),
  {
    isGroup: true,
    displayByField: { field: "group", showValue: true },
    groupType: "ARRAY",
    groupName: "checkboxGroup",
    groupFields: [
      createCheckboxFields({
        id: 1,
        displayByField: { field: "group", showValue: true },
      }),
    ],
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
    onClick: {
      eventName: "addRowEvent",
      params: {
        groupName: "checkboxGroup",
        modelCreateFn: {
          name: "createCheckboxFields",
          params: {
            displayByField: {
              field: "group",
              showValue: true,
            },
          },
        },
      },
    },
  },

  {
    component: "hr",
    sequenceNumber: 4,
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
