import { constructFromModel } from "../../helpers/models.ts";
import selectOptionModel from "../settings/selectOption.js";

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
    fieldName: "id",
  },
  {
    isGroup: true,
    groupType: "ARRAY",
    groupName: "options",
    groupFields: [constructFromModel(selectOptionModel, { id: 1 })],
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
    fieldName: "addRow",
    sequenceNumber: 3,
    innerText: "Добавить поле",
    onClick(fields) {
      console.log("click");
      if (!fields || !fields.length) return;

      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === "options"
      );
      if (!optionsGroup) return;
      optionsGroup.groupFields.push(
        constructFromModel(selectOptionModel, {
          ind: optionsGroup.groupFields.length,
        })
      );
      console.log(optionsGroup.groupFields, "optionsGroup.groupFields");
    },
  },
];

export default selectSettingsModel;
