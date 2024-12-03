function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function deepClone(obj: any) {
  return obj.map((item) => {
    if (Array.isArray(item)) {
      deepClone(item);
    } else if (typeof item === "object") {
      return structuredClone(item);
    } else {
      return item;
    }
  });
}

function isArray(obj: any) {
  return Array.isArray(obj);
}

function isArrayOfArrays(obj: any) {
  return obj.every((e) => isArray(e));
}

export { cloneDeep, isArray, isArrayOfArrays, deepClone };
