import { isArray } from "@/helpers";

import { isArrayOfArrays, prepareModel } from "@/helpers";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(prepareModel(fields));

  const fieldsState = useState(`fieldsState-${id}`);

  createStateFields();

  function createGroupObject(type) {
    if (type === "ARRAY") {
      return [];
    }
    if (type === "OBJECT") {
      return {};
    } else return "";
  }

  function createStateFields() {
    let state = {};
    console.log("creating state fields");
    for (const field of fieldsSet) {
      if (field.isGroup) {
        state[field.groupName] = createGroupObject(field.groupType);

        createNestedFields(
          field.groupFields,
          state[field.groupName],
          field.groupName
        );
      } else if (field.fieldName) {
        state[field.fieldName] = "";
      }
    }
    // console.log(state, "State");
    fieldsState.value = state;
  }

  function createNestedFields(groupFields, state, path = "") {
    if (isArray(groupFields)) {
      const arrayOfArrays = isArrayOfArrays(groupFields);
      if (arrayOfArrays) {
        for (const [index, groupField] of Object.entries(groupFields)) {
          if (state?.[index]) continue;
          state[index] = {};
          const currentPath = `${path}.${index}`;
          createNestedFields(groupField, state[index], currentPath);
        }
      } else {
        for (const groupField of groupFields) {
          if (state?.[groupField.fieldName]) continue;
          state[groupField.fieldName] = null;
          groupField["stateBlock"] = `${path}`;
        }
      }
    }
  }
  return { fieldsState, fieldsSet, createStateFields };
};
