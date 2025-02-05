import createTextInputModel from "@/models/settings/textInputSettings";
import createSelectModel from "@/models/settings/selectSettings";
import createTextAreaModel from "@/models/settings/textAreaSettings";
import createDateInputModel from "@/models/settings/dateInputSettings";
import createDateRangeModel from "@/models/settings/dateRangeSettings";
import createCheckboxModel from "@/models/settings/checkboxSettings";
import createRadioModel from "@/models/settings/radioSettings";
import createSelectOption from "@/models/settings/selectOption";
import createSelectPlaceholder from "@/models/settings/selectPlaceholder";
import type { ElementsMap, FieldModelsFnMap } from "@/types";
import createCheckboxFields from "@/models/settings/checkboxFields";
import createRadioFields from "@/models/settings/radioFields";

export const elementsMap: ElementsMap = {
  BaseTextInput: createTextInputModel,
  BaseSelect: createSelectModel,
  BaseTextarea: createTextAreaModel,
  BaseDateInput: createDateInputModel,
  BaseDateRange: createDateRangeModel,
  BaseCheckbox: createCheckboxModel,
  BaseRadio: createRadioModel,
};

export const createFieldModelsFnMap: FieldModelsFnMap = {
  createTextInputModel,
  createSelectModel,
  createTextAreaModel,
  createDateInputModel,
  createDateRangeModel,
  createCheckboxModel,
  createRadioModel,
  createSelectOption,
  createSelectPlaceholder,
  createCheckboxFields,
  createRadioFields,
};
