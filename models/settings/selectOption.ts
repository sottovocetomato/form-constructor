import type { Field, FieldsState } from "@/types";

const createSelectOption = ({ id }: { id: string | number }): Field[] => [
  {
    component: "hr",
    displayCondition: id === 2,
  },
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
          innerText: `Option ${+id - 1}`,
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
        displayCondition: id != 2,
        sequenceNumber: 3,
        innerText: "Delete option",

        // onClick: (fields: Field[], state: FieldsState, e: Event) => {
        //   if (!fields || !fields.length) return;
        //   const optionsGroup = fields.find(
        //     (el) => el?.isGroup && el.groupName === "options"
        //   );
        //   const target = e.target as HTMLElement;
        //   if (
        //     !optionsGroup ||
        //     !optionsGroup.groupFields ||
        //     !target.dataset.index
        //   )
        //     return;
        //   const removeAtIndex = +target.dataset.index - 1;
        //   optionsGroup.groupFields.splice(removeAtIndex, 1);
        // },
        onClick: {
          eventName: "deleteRowEvent",
          params: {
            groupName: "options",
          },
        },
      },
    ],
  } as Field,
  {
    component: "BaseTextInput",
    props: {
      id: `option-name-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      label: "Option text",
      placeholder: "Type text for current option...",
      selected: false,
    },
    sequenceNumber: 1,
    isGroup: true,
    fieldName: "text",
  },
  {
    component: "BaseTextInput",
    props: {
      id: `option-value-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: true,
      type: "text",
      label: "Option value",
      placeholder: "Value, that will be sent to the server...",
      selected: false,
    },
    sequenceNumber: 2,
    isGroup: true,
    fieldName: "value",
    notNullable: true,
  },
  // {
  //   component: "BaseCheckbox",
  //   props: {
  //     id: `option-selected-checkbox-${id}`,
  //     "data-index": id,
  //     displayName: "",
  //     isHidden: false,
  //     required: false,
  //     label: "Selected",
  //   },
  //   onInput: (fields, state, e) => {
  //     const selectIndex = e.target.dataset.index - 1;
  //     state.options.forEach((opt, ind) => {
  //       if (ind !== selectIndex) {
  //         opt.selected = null;
  //       }
  //     });
  //   },
  //   sequenceNumber: 3,
  //   fieldName: "selected",
  // },
  {
    component: "BaseCheckbox",
    props: {
      id: `option-hidden-checkbox-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      label: "Hidden",
    },
    sequenceNumber: 3,
    fieldName: "hidden",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: `option-disabled-checkbox-${id}`,
      "data-index": id,
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 4,
    fieldName: "disabled",
  },

  {
    component: "hr",
    sequenceNumber: 5,
  },
];

export default createSelectOption;
