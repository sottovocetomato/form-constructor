import createTextInputModel from "@/models/settings/textInputSettings.js";
import createSelectModel from "@/models/settings/selectSettings.js";
import createTextAreaModel from "@/models/settings/textAreaSettings.js";
import createDateInputModel from "@/models/settings/dateInputSettings";
import createDateRangeModel from "@/models/settings/dateRangeSettings";
import createCheckboxModel from "@/models/settings/checkboxSettings.js";
import createRadioModel from "@/models/settings/radioSettings.js";
import type { ElementsMap } from "@/types";

export const elementsMap: ElementsMap = {
  BaseTextInput: createTextInputModel,
  BaseSelect: createSelectModel,
  BaseTextarea: createTextAreaModel,
  BaseDateInput: createDateInputModel,
  BaseDateRange: createDateRangeModel,
  BaseCheckbox: createCheckboxModel,
  BaseRadio: createRadioModel,
};
