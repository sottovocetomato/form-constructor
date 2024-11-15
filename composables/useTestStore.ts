export const useDynamicForm = (fields = [], id) => {
  const fieldsState = useState(`fieldsState-${id}`, () => {
    let state = {};
    for (const field of fields) {
      state[field.editField] = "";
    }
    return state;
  });

  return { fieldsState };
};
