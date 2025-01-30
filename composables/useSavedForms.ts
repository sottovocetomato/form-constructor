import type { FieldsState } from "@/types";

export const useSavedForms = () => {
  function getSavedForms() {
    if (import.meta.client) {
      return JSON.parse(localStorage.getItem("savedForm") as string) || [];
    }
  }
  function getPresavedForm() {
    if (import.meta.client) {
      return JSON.parse(localStorage.getItem("preSavedForm") as string) || {};
    }
  }

  function setSavedForms(data: FieldsState) {
    if (import.meta.client) {
      const savedForms = getSavedForms();
      localStorage.setItem("savedForm", JSON.stringify([...savedForms, data]));
    }
  }

  function setPresavedForm(data: FieldsState) {
    if (import.meta.client) {
      const preSavedForm = getPresavedForm();
      localStorage.setItem("preSavedForm", JSON.stringify(data));
    }
  }
  function getLastFormId() {
    const savedForms = getSavedForms();
    console.log(savedForms);
    return savedForms?.[savedForms?.length - 1]?.id || 0;
  }

  return {
    getSavedForms,
    getLastFormId,
    getPresavedForm,
    setPresavedForm,
    setSavedForms,
  };
};
