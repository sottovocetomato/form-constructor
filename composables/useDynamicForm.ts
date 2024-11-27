import { FieldTypes } from "@/types";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(JSON.parse(JSON.stringify(fields)));

  const fieldsState = useState(`fieldsState-${id}`, () => {
    let state = {};

    for (const field of fieldsSet) {
      if (field?.fieldType && field.fieldGroup) {
        state[field.fieldGroup] = FieldTypes[field.fieldType];
        state[field.fieldGroup][field.groupPosition] = null;
        console.log(field.editField, "field.editField");
        console.log(state[field.fieldGroup], "state[field.fieldGroup]");
      } else if (field.editField) {
        state[field.editField] = "";
      }
    }
    console.log(state, "STATE");
    return state;
  });

  return { fieldsState, fieldsSet };
};
