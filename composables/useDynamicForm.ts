import { FieldTypes } from "@/types";
import { isArray } from "@/helpers";
import { onClickFns } from "@/helpers/models";
import { isArrayOfArrays, prepareModel } from "@/helpers";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(prepareModel(fields));

  const fieldsState = useState(`fieldsState-${id}`, () => {
    let state = {};

    for (const field of fieldsSet) {
      if (field.isGroup) {
        state[field.groupName] = FieldTypes[field.groupType];
        createStateFields(
          field.groupFields,
          state[field.groupName],
          field.groupName
        );
      } else if (field.fieldName) {
        state[field.fieldName] = "";
      }
    }

    return state;
  });

  function createStateFields(modelField, state, path = "") {
    if (isArray(modelField)) {
      const arrayOfArrays = isArrayOfArrays(modelField);
      if (arrayOfArrays) {
        for (const [index, groupField] of Object.entries(modelField)) {
          state[index] = {};
          path = `${path}.${index}`;
          createStateFields(groupField, state[index], path);
        }
      } else {
        for (const groupField of modelField) {
          state[groupField.fieldName] = null;
          groupField["stateBlock"] = `${path}`;
        }
      }
    }
  }

  return { fieldsState, fieldsSet };
};
