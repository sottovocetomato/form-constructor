function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function isArray(obj: any) {
  return Array.isArray(obj);
}

function isArrayOfArrays(obj: any) {
  return obj.every((e) => isArray(e));
}

export { cloneDeep, isArray, isArrayOfArrays };
