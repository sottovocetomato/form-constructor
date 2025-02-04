import { createFieldModelsFnMap } from "../../helpers/formSettingsMap";

const fieldEvents = {
  addRowEvent: ({ fields, groupName, modelCreateFnName }) => {
    if (!fields || !fields.length) return;
    const optionsGroup = fields.find(
      (el) => el?.isGroup && el.groupName === groupName
    );
    console.log(optionsGroup, "optionsGroup");
    console.log(
      createFieldModelsFnMap[modelCreateFnName],
      "createFieldModelsFnMap[modelCreateFnName]"
    );
    if (!optionsGroup || !optionsGroup.groupFields) return;
    optionsGroup.groupFields.push(
      createFieldModelsFnMap[modelCreateFnName]?.(
        optionsGroup.groupFields.length + 1
      )
    );
  },

  deleteRowEvent: (fields: Field[], state: FieldsState, e: Event) => {
    if (fields && fields.length) {
      const optionsGroup = fields.find(
        (el) => el?.isGroup && el.groupName === "checkboxGroup"
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
