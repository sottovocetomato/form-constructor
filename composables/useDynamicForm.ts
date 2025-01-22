import { isArray } from "@/helpers";

import { isArrayOfArrays, prepareModel } from "@/helpers";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = useState(`fieldsSet-${id}`);

  if (!fieldsSet.value) {
    fieldsSet.value = fields;
  }

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
    for (const field of fieldsSet.value) {
      if (
        field?.displayByField?.field &&
        fieldsState.value[field?.displayByField?.field] !=
          field?.displayByField?.showValue
      )
        continue;

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
        if (!fieldsState.value[field.fieldName]) {
          fieldsState.value[field.fieldName] =
            field?.initialValue !== null
              ? field.initialValue
              : field.notNullable
              ? ""
              : null;
        }
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
          // state[groupField.fieldName] = groupField.notNullable ? "" : null;
          state[groupField.fieldName] =
            groupField?.initialValue !== null
              ? groupField.initialValue
              : groupField.notNullable
              ? ""
              : null;
          groupField["stateBlock"] = `${path}`;
        }
      }
    }
  }
  return { fieldsState, fieldsSet, createStateFields };
};
