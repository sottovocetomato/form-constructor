import { FieldTypes } from "@/types";

export const useDynamicForm = (fields = [], id) => {
  const fieldsSet = reactive(JSON.parse(JSON.stringify(fields)));

  const fieldsState = useState(`fieldsState-${id}`, () => {
    let state = {};

    for (const field of fieldsSet) {
      if (field.isGroup) {
        state[field.editField] = FieldTypes[field.fieldType];
        state[field.editField][field.groupPosition] = {};
      } else if (field.editField) {
        state[field.editField] = "";
      }
    }
    console.log(state, "STATE");
    return state;
  });

  return { fieldsState, fieldsSet };
};
