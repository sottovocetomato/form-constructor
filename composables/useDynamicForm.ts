import { isArray } from "@/helpers";

import { isArrayOfArrays, prepareModel } from "@/helpers";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(prepareModel(fields));

  const fieldsState = useState(`fieldsState-${id}`, () => ({}));

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
    console.log(fieldsState.value, "creating state fields");
    for (const field of fieldsSet) {
      if (field.isGroup) {
        if (!fieldsState.value[field.groupName]) {
          fieldsState.value[field.groupName] = createGroupObject(
            field.groupType
          );
        }

        createNestedFields(
          field.groupFields,
          fieldsState.value[field.groupName],
          field.groupName
        );
      } else if (field.fieldName) {
        fieldsState.value[field.fieldName] = null;
      }
    }
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
