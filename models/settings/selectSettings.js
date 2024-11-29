const optionModel = [
  {
    component: "BaseTextInput",
    props: {
      id: `option-name-1`,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Option Name",
      selected: false,
    },
    sequenceNumber: 1,
    isGroup: true,
    editField: "text",
  },
  {
    component: "BaseTextInput",
    props: {
      id: `option-value-1`,
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Option Value",
      selected: false,
    },
    sequenceNumber: 2,
    isGroup: true,
    editField: "text",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "option-required-checkbox-1",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Required",
    },
    sequenceNumber: 3,
    editField: "selected",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "option-disabled-checkbox-1",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 4,
    editField: "disabled",
  },
];

const selectSettingsModel = [
  {
    component: "BaseTextInput",
    props: {
      id: "placeholderInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Select Id",
    },
    sequenceNumber: 1,
    editField: "id",
  },
  {
    isGroup: true,
    groupType: "ARRAY",
    groupName: "options",
    groupFields: [...optionModel],
    sequenceNumber: 2,
  },
  {
    component: "button",
    props: {
      id: "add-row",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "AddRow",
    },
    sequenceNumber: 3,
    innerText: "Добавить поле",
    onClick(fields) {
      if (!fields || !fields.length) return;
      const lastOptionField = fields.findLast(
        (el) => el?.isGroup && el.groupName === "options"
      );
      const position = lastOptionField?.sequenceNumber || 0;
      const editInd = +lastOptionField?.groupPosition || 0;
      fields.splice(position, 0, {
        ...optionModel,
        props: {
          ...optionModel.props,
          id: `option-${position}`,
          placeholder: `Option ${position}`,
        },
        sequenceNumber: position,
        groupPosition: editInd,
      });
    },
  },
];

export default selectSettingsModel;
