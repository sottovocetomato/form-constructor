export const useFormBuilderState = (id) => {
  const formItems = useState<string[]>(`formItems-${id}`, () => []);

  function insertInFromItems(ind, itemID, itemIndex = null) {
    ind = +ind;
    if (itemIndex) {
      const itemArrIndex = formItems.value.findIndex(
        (c) => c.sequenceNumber == itemIndex
      );

      if (itemArrIndex > -1) {
        formItems.value.splice(ind, 0, {
          ...formItems.value?.[itemArrIndex],
          sequenceNumber: ind,
        });

        if (itemArrIndex > ind) {
          formItems.value.splice(itemArrIndex + 1, 1);
        } else {
          formItems.value.splice(itemArrIndex, 1);
        }
        formItems.value.forEach((el, ind) => (el.sequenceNumber = ind));
      }
    } else {
      formItems.value.splice(ind, 0, {
        component: itemID,
        props: {},
        sequenceNumber: ind,
        id: `${itemID}-${ind}`,
      });
    }
  }

  function addToFormItems(itemID) {
    formItems.value.push({
      component: itemID,
      props: {},
      sequenceNumber: formItems.value.length,
      id: `${itemID}-${formItems.value.length}`,
    });
  }

  return { formItems, addToFormItems, insertInFromItems };
};
