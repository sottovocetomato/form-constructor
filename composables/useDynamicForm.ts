import { FieldTypes } from "@/types";
import { isArray } from "@/helpers";
import { isArrayOfArrays, deepClone } from "@/helpers";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(deepClone(fields));
  console.log(fieldsSet, "fieldsSet");
  const fieldsState = useState(`fieldsState-${id}`, () => {
    let state = {};

    for (const field of fieldsSet) {
      if (field.isGroup) {
        state[field.groupName] = FieldTypes[field.groupType];

        createStateFields(field.groupFields, state[field.groupName]);
      } else if (field.fieldName) {
        state[field.fieldName] = "";
        field["stateBlock"] = state;
      }
    }

    return state;
  });

  function createStateFields(modelField, state) {
    if (isArray(modelField)) {
      const arrayOfArrays = isArrayOfArrays(modelField);
      if (arrayOfArrays) {
        for (const [index, groupField] of Object.entries(modelField)) {
          state[index] = {};
          createStateFields(groupField, state[index]);
        }
      } else {
        for (const groupField of modelField) {
          state[groupField.fieldName] = null;
          groupField["stateBlock"] = state;
        }
      }
    }
  }

  return { fieldsState, fieldsSet };
};
