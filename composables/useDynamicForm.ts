import { FieldTypes } from "@/types";
import { isArray } from "@/helpers";
import { isArrayOfArrays } from "@/helpers";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(JSON.parse(JSON.stringify(fields)));

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
    console.log(state, "STATE");
    return state;
  });

  function createStateFields(modelField, state) {
    console.log(modelField, "modelField");
    console.log(state, "state");
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
          console.log(groupField, "groupField");
        }
      }
    }
  }

  return { fieldsState, fieldsSet };
};
