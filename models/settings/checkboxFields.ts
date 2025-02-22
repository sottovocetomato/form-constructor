import type { Field, FieldsState } from "@/types";
import type { Ref } from "@vue/reactivity";

const createCheckboxFields = ({
  id,
  displayByField,
}: {
  id: string | number;
  displayByField?: { field: string; showValue: boolean };
}) => [
  {
    component: "hr",
    displayByField: displayByField,
    sequenceNumber: 1,
  },
  {
    isGroup: true,
    groupType: "ARRAY",
    groupName: "optionsLabel",
    displayByField: displayByField,
    displayCondition: !!displayByField?.showValue,
    props: {
      class: "field-settings__option-label-group",
    },
    groupFields: [
      {
        component: "h6",
        props: {
          innerText: `Checkbox ${id}`,
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
        innerText: "Delete checkbox",
        onClick: {
          eventName: "deleteRowEvent",
          params: {
            groupName: "checkboxGroup",
          },
        },
      },
    ],
  },
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
    sequenceNumber: 3,
    fieldName: "label",
  },
  {
    component: "BaseTextInput",
    displayByField: displayByField,
    displayCondition: !!displayByField?.showValue,
    props: {
      id: `value-input-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      label: "Value",
      placeholder: "Type text for checkbox value...",
    },
    sequenceNumber: 4,
    fieldName: "value",
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
    sequenceNumber: 5,
    fieldName: "disabled",
  },
];

export default createCheckboxFields;
