function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function isArray(obj: any) {
  return Array.isArray(obj);
}

function isArrayOfArrays(array: Record<string, any>[]): boolean {
  if (!Array.isArray(array)) {
    throw new Error("Please provide an array");
  }
  return array.every((e) => isArray(e));
}

export { cloneDeep, isArray, isArrayOfArrays };
