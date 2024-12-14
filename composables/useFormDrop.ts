import { useFormBuilderState } from "@/composables/useFormBuilderState";

export const useFormDrop = ({
  constructorAreaSelector = "",
  customMarkerSelector = "",
  formId,
}: {
  constructorAreaSelector: string;
  customMarkerSelector: string;
}) => {
  const dropMarkerSelector = customMarkerSelector || "drop-insert-marker";
  let constructorFreeDropZone;

  let constructorAreaForm;

  let dropMarker: HTMLElement | null = null;

  const { insertInFromItems, addToFormItems } = useFormBuilderState(formId);

  function setConstructorArea() {
    if (process.client) {
      constructorFreeDropZone = document.querySelector(constructorAreaSelector);
      console.log(
        constructorFreeDropZone,
        constructorAreaSelector,
        "setting constrArea"
      );
      constructorAreaForm = document.querySelector(".constructor-area_form");
    }
  }
  setConstructorArea();

  function getDropMarker() {
    if (process.client) {
      dropMarker = document.getElementById(dropMarkerSelector);
    }
  }
  function createDropMarker() {
    if (process.client) {
      dropMarker = document.createElement("div");
      if (dropMarker instanceof HTMLElement) {
        dropMarker.id = dropMarkerSelector;

        dropMarker?.addEventListener("drop", onDrop);
        dropMarker?.addEventListener("dragover", onComponentDragOver);
      }
    }
  }
  function removeDropMarker() {
    if (process.client) {
      if (!dropMarker) return;
      if (dropMarker instanceof HTMLElement) {
        dropMarker?.removeEventListener("drop", onDrop);
        dropMarker?.removeEventListener("dragover", onComponentDragOver);
        dropMarker.remove();
      }
    }
  }
  function onDrag(e): void {
    // console.log(constructorFreeDropZone, "constructorArea");
    // console.log(e.target, "e.target onDrag");
    // console.log(e.clientX, "onDrag");
    // console.log(e.clientY, "onDrag");

    const { bottom, top, left, right } =
      constructorAreaForm?.getBoundingClientRect();
    const isOutOfBounds =
      e.clientY > bottom ||
      e.clientY < top ||
      e.clientX < left ||
      e.clientX > right;

    if (isOutOfBounds) {
      getDropMarker();
      removeDropMarker();
    }
  }
  function startDrag(evt): void {
    evt.dataTransfer.dropEffect = "move";
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("itemID", evt.target?.id);
  }
  function onDrop(e): void {
    e.stopImmediatePropagation();
    const itemID = e.dataTransfer.getData("itemID");
    console.log(e.target.id, "e.target.id");
    getDropMarker();
    const siblingElement = dropMarker?.nextElementSibling;
    if (siblingElement instanceof HTMLElement) {
      const ind = siblingElement?.dataset?.index;
      console.log(ind);
      removeDropMarker();
      insertInFromItems(ind, itemID);
    } else {
      addToFormItems(itemID);
      constructorFreeDropZone.classList.remove("active");
    }
  }
  function onConstructorAreaDragEnter(e): void {
    getDropMarker();
    if (dropMarker) return;
    e.target.classList.add("active");
  }

  function onConstructorAreaDragLeave(evt): void {
    // let prependZone = document.querySelector("#drop-insert-place");
    // if (prependZone) prependZone.remove();
    evt.target.classList.remove("active");
  }

  function onComponentDragEnter(e): void {
    if (process.client) {
      e.preventDefault();
      getDropMarker();
      if (!dropMarker) {
        createDropMarker();
        constructorFreeDropZone?.insertBefore(
          dropMarker as HTMLElement,
          e.target
        );
      }
    }
  }
  // function onComponentDragLeave(e): void {
  //   console.log(e.target.getBoundingClientRect(), "leave");
  //   const { bottom, top, right, left } = e.target.getBoundingClientRect();
  //   console.log(e.clientX, e.clientY, "leave");
  //   const isVerticalLeave =
  //     Math.floor(bottom) - e.clientY <= 1 || Math.floor(top) - e.clientY >= 1;
  //   const isHorizontalLeave =
  //     Math.floor(right) - e.clientX <= 1 || Math.floor(left) - e.clientX >= 1;
  //   if (isHorizontalLeave) {
  //     let prependZone = document.querySelector("#drop-insert-place");
  //     if (!prependZone) return;
  //     prependZone.remove();
  //   }
  // }
  function onComponentDragOver(e): void {
    console.log(e.target, "onComponentDragOver");
    e.preventDefault();
    //смотрим, куда прёт курсор: если ниже, отвязываем, если выше, то даём управление добавленному элементу
    if (!e.target.classList.contains("constructor-area__component")) return;
    if (process.client) {
      const checkDirectionVertical =
        e.target.getBoundingClientRect().bottom -
          e.target.getBoundingClientRect().height / 2 >
        e.clientY
          ? "up"
          : "down";
      const isOutHotizontally =
        e.target.getBoundingClientRect().left > e.clientX ||
        e.target.getBoundingClientRect().right < e.clientX;

      // console.log(e.clientY);
      console.log(e.target, "onComponentDragOver");
      console.log(e.target.getBoundingClientRect());
      console.log(e.clientX);
      getDropMarker();
      console.log(dropMarker, "dropMarker");
      if (!dropMarker) {
        createDropMarker();
      }
      if (isOutHotizontally) {
        removeDropMarker();
        return;
      }
      if (checkDirectionVertical === "down") {
        console.log(e.target.nextElementSibling, "e.target.nextSibling");
        if (
          e.target.nextElementSibling &&
          e.target.nextElementSibling.classList?.contains(
            "constructor-area__component"
          )
        ) {
          constructorAreaForm?.insertBefore(
            dropMarker,
            e.target.nextElementSibling
          );
        } else if (!e.target.nextElementSibling) {
          removeDropMarker();
          constructorFreeDropZone?.classList.add("active");
        }
      } else {
        if (constructorFreeDropZone?.classList.contains("active")) {
          constructorFreeDropZone?.classList.remove("active");
        }
        constructorAreaForm?.insertBefore(dropMarker, e.target);
      }
    }
  }
  return {
    startDrag,
    onDrop,
    onComponentDragEnter,
    onComponentDragOver,
    onConstructorAreaDragEnter,
    onConstructorAreaDragLeave,
    onDrag,
  };
};
