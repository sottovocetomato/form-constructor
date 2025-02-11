import type { Field } from "@/types";
import { generateUID } from "@/helpers";
import { onMounted } from "@vue/runtime-core";

export const useFormBuilderState = (
  id: string | number,
  loadedItems: Field[] = []
) => {
  const formItems = useState<Field[]>(`formItems-${id}`, () => []);

  onMounted(() => {
    if (loadedItems.length) {
      formItems.value = [...loadedItems];
    }
  });

  function insertInFromItems(
    ind: string | number,
    itemID: string,
    itemIndex: string | number | null = null
  ) {
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
      }
    } else {
      formItems.value.splice(ind, 0, {
        component: itemID,
        props: {},
        sequenceNumber: ind,
      });
    }
    formItems.value.forEach((el, ind) => {
      el.sequenceNumber = ind;
      el.id = el.id ? el.id : `${el.component}-${generateUID()}`;
    });
  }

  function addToFormItems(itemID: string) {
    if (!itemID) return;
    formItems.value.push({
      component: itemID,
      props: {},
      sequenceNumber: formItems.value.length,
      id: `${itemID}-${generateUID()}`,
    });
  }

  return { formItems, addToFormItems, insertInFromItems };
};
