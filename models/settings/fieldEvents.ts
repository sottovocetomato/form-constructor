import { createFieldModelsFnMap } from "../../helpers/formSettingsMap";

const fieldEvents: { [index: string]: any } = {
  addRowEvent: ({
    fields,
    groupName,
    modelCreateFn: { name = "", params = {} },
  }) => {
    if (!fields || !fields.length) return;
    const optionsGroup = fields.find(
      (el) => el?.isGroup && el.groupName === groupName
    );
    if (!optionsGroup || !optionsGroup.groupFields) return;
    optionsGroup.groupFields.push(
      createFieldModelsFnMap[name]({
        id: optionsGroup.groupFields.length + 1,
        ...params,
      })
    );
  },

  deleteRowEvent: ({
    fields,
    fieldsState: { state, setStateField },
    e,
    groupName,
  }) => {
    if (fields && fields.length) {
      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === groupName
      );
      const target = e.target as HTMLElement;
      if (optionsGroup && optionsGroup.groupFields && target.dataset.index) {
        const removeAtIndex = +target.dataset.index - 1;
        console.log(removeAtIndex, "removeAtIndex");
        optionsGroup.groupFields.splice(removeAtIndex, 1);
        const data = [...state[groupName]];
        data?.splice(removeAtIndex, 1);
        setStateField(groupName, data);
      }
    }
  },
};

export default fieldEvents;
