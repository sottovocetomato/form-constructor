import { isArray } from "@/helpers";

import { isArrayOfArrays } from "@/helpers";
import type { Field, FieldsState, FieldStateData } from "@/types";
import { onMounted } from "@vue/runtime-core";

export const useDynamicForm = (
  fields: Field[] = [],
  id: string | number,
  loadedState?: FieldsState
) => {
  const fieldsSet = useState<Field[] | null>(`fieldsSet-${id}`);
  if (!fieldsSet.value) {
    fieldsSet.value = fields;
  }

  const fieldsState = useState<FieldsState>(`fieldsState-${id}`, () => ({}));

  if (loadedState && !Object.keys(fieldsState.value)?.length) {
    setState({ ...loadedState });
  }

  createStateFields();

  function createGroupObject(type: string | undefined) {
    if (type === "ARRAY") {
      return [];
    }
    if (type === "OBJECT") {
      return {};
    } else return "";
  }

  function clearFieldsSet() {
    fieldsSet.value = null;
  }

  function setState(data: FieldsState) {
    fieldsState.value = data;
  }
  function setStateField(fieldName: string, data: FieldStateData) {
    fieldsState.value[fieldName] = data;
  }

  function createStateFields() {
    if (!fieldsSet.value) return;
    for (const field of fieldsSet.value) {
      if (field.isGroup && field.groupName && field.groupFields) {
        if (!fieldsState.value[field.groupName]) {
          const data = createGroupObject(field.groupType);
          setStateField(field.groupName, data);
        }
        createNestedFields(
          field.groupFields,
          fieldsState.value[field.groupName],
          field.groupName
        );
      } else if (field.fieldName) {
        if (!fieldsState.value[field.fieldName]) {
          const data =
            field?.initialValue !== null
              ? field.initialValue
              : field.notNullable
              ? ""
              : null;

          setStateField(field.fieldName, data);
        }
      }
    }
  }

  function createNestedFields(
    groupFields: Field | Field[] | Field[][],
    state: FieldsState,
    path = ""
  ) {
    if (isArray(groupFields)) {
      const arrayOfArrays = isArrayOfArrays(groupFields);
      if (arrayOfArrays) {
        for (const [index, groupField] of Object.entries(groupFields)) {
          if (!state?.[index]) {
            state[index] = {};
          }
          const currentPath = `${path}.${index}`;
          createNestedFields(groupField, state[index], currentPath);
        }
      } else {
        for (const groupField of groupFields as Field[]) {
          if (!groupField?.fieldName) continue;
          if (!groupField["stateBlock"]) {
            groupField["stateBlock"] = `${path}`;
          }
          if (state?.[groupField?.fieldName]) {
            continue;
          }
          // state[groupField.fieldName] = groupField.notNullable ? "" : null;
          state[groupField.fieldName] =
            groupField?.initialValue !== null
              ? groupField.initialValue
              : groupField.notNullable
              ? ""
              : null;
        }
      }
    }
  }
  return {
    fieldsState,
    fieldsSet,
    createStateFields,
    setState,
    setStateField,
    clearFieldsSet,
  };
};
