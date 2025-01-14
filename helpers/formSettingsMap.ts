import createTextInputModel from "@/models/settings/textInputSettings.js";
import createSelectModel from "@/models/settings/selectSettings.js";
import { constructFromModel } from "@/helpers/models";

export const elementsMap = {
  BaseTextInput: createTextInputModel,
  BaseSelect: createSelectModel,
};
