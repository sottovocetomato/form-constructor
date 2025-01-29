import { isArray } from "@/helpers";

import { isArrayOfArrays, prepareModel } from "@/helpers";
import type { Field, FieldsState } from "@/types";

export const useDynamicForm = (fields: Field[] = [], id: string | number) => {
  const fieldsSet = useState<Field[]>(`fieldsSet-${id}`);

  if (!fieldsSet.value) {
    fieldsSet.value = fields;
  }

  const fieldsState = useState<FieldsState>(`fieldsState-${id}`, () => ({}));

  createStateFields();

  function createGroupObject(type: "ARRAY" | "OBJECT" | undefined) {
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

  function createNestedFields(
    groupFields: Field | Field[],
    state: FieldsState,
    path = ""
  ) {
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
        for (const groupField: Field of groupFields) {
          if (state?.[groupField?.fieldName]) continue;
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
