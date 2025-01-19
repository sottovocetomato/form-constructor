import createTextInputModel from "@/models/settings/textInputSettings.js";
import createSelectModel from "@/models/settings/selectSettings.js";
import createTextAreaModel from "@/models/settings/textAreaSettings.js";
import createDateInputModel from "@/models/settings/dateInputSettings";
import createDateRangeModel from "@/models/settings/dateRangeSettings";
import { constructFromModel } from "@/helpers/models";

export const elementsMap = {
  BaseTextInput: createTextInputModel,
  BaseSelect: createSelectModel,
  BaseTextarea: createTextAreaModel,
  BaseDateInput: createDateInputModel,
  BaseDateRange: createDateRangeModel,
};
