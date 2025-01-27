import { constructFromModel } from "../../helpers/models.ts";
import createSelectOption from "../settings/selectOption.js";
import createSelectPlaceholder from "../settings/selectPlaceholder.js";

const createSelectModel = (id) => [
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
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "AddRow",
    },
    sequenceNumber: 3,
    innerText: "Add option",
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
