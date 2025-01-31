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

function generateUID() {
  let firstPart: string | number = (Math.random() * 46656) | 0;
  let secondPart: string | number = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

export { cloneDeep, isArray, isArrayOfArrays, generateUID };
