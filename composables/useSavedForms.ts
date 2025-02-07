import type { FieldsState, SavedForm } from "@/types";

export const useSavedForms = () => {
  function getSavedForms() {
    if (import.meta.client) {
      return JSON.parse(localStorage.getItem("savedForm") as string) || [];
    }
  }

  function checkFormExistsByName(name: string) {
    if (!name) return false;
    const savedForms: SavedForm[] = getSavedForms();
    return savedForms.find(
      (form) => form.name?.toLowerCase() == name?.toLowerCase()
    );
  }

  function getSavedFormById(id: number | string) {
    if (import.meta.client) {
      const savedForms: SavedForm[] = getSavedForms();
      console.log(savedForms, "savedForms");
      return savedForms.find((form) => form.id == id);
    }
  }

  function deleteSavedForm(id: number | string) {
    if (import.meta.client) {
      if (!id) return;
      let savedForms: SavedForm[] = getSavedForms();
      savedForms = savedForms.filter((form) => form.id !== id);
      localStorage.setItem("savedForm", JSON.stringify([...savedForms]));
    }
  }
  function getPresavedForm() {
    if (import.meta.client) {
      return JSON.parse(localStorage.getItem("preSavedForm") as string) || {};
    }
  }

  function setSavedForms(data: SavedForm) {
    if (import.meta.client) {
      console.log(data, "data");
      const savedForms: SavedForm[] = getSavedForms();
      const existsIndex = savedForms.findIndex((el) => el.id == data.id);
      if (existsIndex > -1) {
        savedForms[existsIndex] = data;
        localStorage.setItem("savedForm", JSON.stringify([...savedForms]));
      } else {
        localStorage.setItem(
          "savedForm",
          JSON.stringify([...savedForms, data])
        );
      }
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
    getSavedFormById,
    checkFormExistsByName,
    deleteSavedForm,
  };
};
