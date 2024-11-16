export const useFormBuilderState = () => {
  const formItems = useState<string[]>("formItems", () => []);

  function insertInFromItems(ind, itemID) {
    formItems.value.splice(ind, 0, {
      component: itemID,
      props: {},
    });
  }

  function addToFormItems(itemID) {
    formItems.value.push({
      component: itemID,
      props: {},
    });
  }

  return { formItems, addToFormItems, insertInFromItems };
};
