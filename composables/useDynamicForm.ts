import { FieldTypes } from "@/types";
import { isArray } from "@/helpers";
import { onClickFns } from "@/helpers/models";
import { isArrayOfArrays, prepareModel } from "@/helpers";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(prepareModel(fields));

  const fieldsState = useState(`fieldsState-${id}`, createStateFields);

  function createStateFields() {
    let state = {};

    for (const field of fieldsSet) {
      if (field.isGroup) {
        state[field.groupName] = FieldTypes[field.groupType];
        createNestedFields(
          field.groupFields,
          state[field.groupName],
          field.groupName
        );
      } else if (field.fieldName) {
        state[field.fieldName] = "";
      }
    }

    return state;
  }

  function createNestedFields(modelField, state, path = "") {
    if (isArray(modelField)) {
      const arrayOfArrays = isArrayOfArrays(modelField);
      if (arrayOfArrays) {
        for (const [index, groupField] of Object.entries(modelField)) {
          if (state?.[index]) continue;
          state[index] = {};
          path = `${path}.${index}`;
          createNestedFields(groupField, state[index], path);
        }
      } else {
        for (const groupField of modelField) {
          if (state?.[groupField.fieldName]) continue;
          state[groupField.fieldName] = null;
          groupField["stateBlock"] = `${path}`;
        }
      }
    }
  }
  watch(fieldsSet, (newVal) => {
    if (newVal) {
      console.log("creating new fields");
      createStateFields();
      console.log(fieldsState, "fieldsState");
    }
  });
  return { fieldsState, fieldsSet };
};
