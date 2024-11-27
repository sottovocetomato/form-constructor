import { FieldTypes } from "@/types";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(fields);

  const fieldsState = useState(`fieldsState-${id}`, () => {
    let state = {};
    for (const field of fieldsSet) {
      if (field?.fieldType && field.fieldGroup) {
        state[field.fieldGroup] = FieldTypes[field.fieldType];
        field.editField = `${field.fieldGroup}.${field.groupPosition}`;
        console.log(field.editField, "field.editField");
        console.log(state[field.fieldGroup], "state[field.fieldGroup]");
      } else {
        state[field.editField] = "";
      }
    }
    console.log(state, "STATE");
    return state;
  });

  return { fieldsState, fieldsSet };
};
