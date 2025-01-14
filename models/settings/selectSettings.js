import { constructFromModel } from "../../helpers/models.ts";
import createSelectOption from "../settings/selectOption.js";

const createSelectModel = (id) => [
  {
    isGroup: true,
    groupType: "ARRAY",
    groupName: "options",
    groupFields: [createSelectOption(1)],
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
    onClick: (fields) => {
      if (!fields || !fields.length) return;
      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === "options"
      );
      if (!optionsGroup) return;
      optionsGroup.groupFields.push(
        createSelectOption(optionsGroup.groupFields.length + 1)
      );
    },
  },
];

export default createSelectModel;
