export const useFormBuilderState = (id) => {
  const formItems = useState<string[]>(`formItems-${id}`, () => []);

  function insertInFromItems(ind, itemID, itemIndex = null) {
    if (itemIndex) {
      const itemArrIndex = formItems.value.findIndex(
        (c) => c.sequenceNumber == itemIndex
      );
      console.log(ind, "ind");
      console.log(itemArrIndex, "itemArrIndex");
      console.log(formItems.value, "formItems.value");
      if (itemArrIndex > -1) {
        formItems.value.splice(ind, 0, {
          ...formItems.value?.[itemArrIndex],
          sequenceNumber: ind,
        });
        formItems.value.splice(itemArrIndex + 1, 1);
      }
    } else {
      formItems.value.splice(ind, 0, {
        component: itemID,
        props: {},
        sequenceNumber: ind,
      });
    }
  }

  function addToFormItems(itemID) {
    formItems.value.push({
      component: itemID,
      props: {},
      sequenceNumber: formItems.value.length,
    });
  }

  return { formItems, addToFormItems, insertInFromItems };
};
