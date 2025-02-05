import { createFieldModelsFnMap } from "../../helpers/formSettingsMap";

const fieldEvents = {
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
      createFieldModelsFnMap[name](optionsGroup.groupFields.length + 1, params)
    );
  },

  deleteRowEvent: ({ fields, state, e, groupName }) => {
    if (fields && fields.length) {
      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === groupName
      );
      const target = e.target as HTMLElement;
      if (optionsGroup && optionsGroup.groupFields && target.dataset.index) {
        const removeAtIndex = +target.dataset.index - 1;
        optionsGroup.groupFields.splice(removeAtIndex, 1);
      }
    }
  },
};

export default fieldEvents;
