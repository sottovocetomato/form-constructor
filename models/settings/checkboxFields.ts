import type { Field, FieldsState, onFieldActionFn } from "@/types";
import type { Ref } from "@vue/reactivity";

const createCheckboxFields = (
  id?: string | number,
  displayByField?: { field: string; showValue: boolean }
): Field[] => [
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
    onClick: (fields: Field[], state: FieldsState, e: Event) => {
      if (fields && fields.length) {
        const optionsGroup = fields.find(
          (el) => el?.isGroup && el.groupName === "checkboxGroup"
        );
        const target = e.target as HTMLElement;
        if (optionsGroup && optionsGroup.groupFields && target.dataset.index) {
          const removeAtIndex = +target.dataset.index - 1;
          optionsGroup.groupFields.splice(removeAtIndex, 1);
        }
      }
    },
  },
  {
    component: "hr",
    sequenceNumber: 4,
  },
];

export default createCheckboxFields;
