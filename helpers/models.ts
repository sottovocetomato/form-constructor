import { isArray, prepareModel } from "@/helpers/index";

function constructFromModel(
  model: any,
  { ind = null, id = null }: { ind?: null | number; id?: null | number }
) {
  if (isArray(model)) {
    const preModel = [];
    for (const modelObj of model) {
      const newObj = { ...modelObj };
      if ("props" in modelObj) {
        newObj.props = { ...modelObj.props };
        newObj.props.id = `${newObj.props.id}-${id ?? ind + 1}`;
        newObj.props["data-index"] = id;
      }
      preModel.push(newObj);
    }

    return preModel;
  }
  const newObj = { ...model };
  if ("props" in modelObj) {
    newObj.props = { ...modelObj.props };
  }
  newObj.props[id] = `${newObj.props.id}-${id ?? ind + 1}`;
  newObj.props["data-index"] = id;
  return newObj;
}

export { constructFromModel };
