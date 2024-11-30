function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function isArray(obj: any) {
  return Array.isArray(obj);
}

export { cloneDeep, isArray };
