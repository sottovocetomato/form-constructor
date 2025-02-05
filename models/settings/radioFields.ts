import type { Field, onFieldActionFn, FieldsState } from "@/types";

const createRadioFields = (id: string | number) => [
  {
    isGroup: true,
    groupType: "ARRAY",
    groupName: "optionsLabel",
    props: {
      class: "field-settings__option-label-group",
    },
    groupFields: [
      {
        component: "h6",
        props: {
          innerText: `Radio option ${id}`,
        },
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
        innerText: "Delete radio",
        onClick: {
          eventName: "deleteRowEvent",
          params: {
            groupName: "radioGroup",
          },
        },
      },
    ],
  },
  {
    component: "BaseTextInput",
    props: {
      id: `label-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      label: "Label",
      placeholder: "Type text for radio label...",
    },
    sequenceNumber: 1,
    fieldName: "label",
  },
  {
    component: "BaseTextInput",
    props: {
      id: `value-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Value",
      placeholder: "Type text for radio value...",
    },
    sequenceNumber: 2,
    fieldName: "value",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: `disabled-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 3,
    fieldName: "disabled",
  },

  {
    component: "hr",
    sequenceNumber: 4,
  },
];

export default createRadioFields;
