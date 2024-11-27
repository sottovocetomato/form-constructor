const optionModel = {
  component: "BaseTextInput",
  props: {
    id: `option-1`,
    displayName: "",
    isHidden: false,
    required: false,
    type: "text",
    placeholder: "Option 1",
  },
  sequenceNumber: 0,
  fieldType: "ARRAY",
  fieldGroup: "options",
  groupPosition: 0,
  editField: null,
};

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
    ...optionModel,
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
        (el) => el.fieldGroup === "options"
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
