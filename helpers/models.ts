import { cloneDeep, isArray } from "@/helpers/index";
import selectOptionModel from "#build/models/settings/selectOption";

function constructFromModel(
  model: any,
  { ind = null, id = null }: { ind?: null | number; id?: null | number }
) {
  if (isArray(model)) {
    const preModel = [];
    for (const modelObj of model) {
      const newObj = cloneDeep(modelObj);
      if ("props" in newObj) {
        newObj.props.id = `${newObj.props.id}-${id ?? ind + 1}`;
      }
      preModel.push(newObj);
    }

    return preModel;
  }
  const newObj = cloneDeep(model);
  newObj.props[id] = `${newObj.props.id}-${id ?? ind + 1}`;
  return newObj;
}

export { constructFromModel };
