export const useFormBuilderState = (id) => {
  const formItems = useState<string[]>(`formItems-${id}`, () => []);

  function insertInFromItems(ind, itemID, itemIndex = null) {
    ind = +ind;
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
        console.log(formItems.value?.[+ind + 1], "formItems.value?.[ind + 1]");

        if (itemArrIndex > ind) {
          formItems.value.splice(itemArrIndex + 1, 1);
          formItems.value[ind + 1] = {
            ...formItems.value?.[ind + 1],
            sequenceNumber: ind + 1,
          };
        } else {
          formItems.value.splice(itemArrIndex, 1);
          formItems.value[itemArrIndex] = {
            ...formItems.value?.[itemArrIndex],
            sequenceNumber: itemArrIndex,
          };
        }
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
