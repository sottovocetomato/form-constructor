import { useFormBuilderState } from "@/composables/useFormBuilderState";

export const useFormDrop = ({
  constructorAreaSelector = "",
  customMarkerSelector = "",
  formId,
}: {
  constructorAreaSelector?: string;
  customMarkerSelector?: string;
  formId: string | number;
}) => {
  const dropMarkerSelector = customMarkerSelector || "drop-insert-marker";
  let constructorFreeDropZone: Element | HTMLElement | undefined | null;

  let constructorAreaForm: Element | HTMLElement | undefined | null;

  let dropMarker: HTMLElement | null = null;
  let dragged: HTMLElement | null = null;

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
  function onDrag(e: DragEvent): void {
    // console.log(constructorFreeDropZone, "constructorArea");
    // console.log(e.target, "e.target onDrag");
    // console.log(e.clientX, "onDrag");
    // console.log(e.clientY, "onDrag");
    if (!constructorAreaForm) {
      setConstructorArea();
    }
    if (!constructorAreaForm?.getBoundingClientRect()) return;
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
  function startDrag(evt: DragEvent): void {
    console.log(evt.target, "evt.target");
    if (!evt.dataTransfer || !evt.target) return;

    dragged = evt.target as HTMLElement;
    evt.dataTransfer.dropEffect = "move";
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("itemID", dragged.id);
    if (dragged.dataset?.index) {
      evt.dataTransfer.setData("dataIndex", dragged.dataset?.index);
    }
  }
  function onDrop(e: Event): void {
    e.stopImmediatePropagation();

    if (!constructorAreaForm || !constructorFreeDropZone) return;
    // const itemID = e.dataTransfer.getData("itemID");
    // const itemIndex = e.dataTransfer.getData("dataIndex");
    const itemID = dragged?.id || "";
    const itemIndex = dragged?.dataset?.index || null;
    console.log(itemID, dragged?.id, dragged, "itemID");
    // console.log(e.target.id, "e.target.id");
    // console.log(itemIndex, "itemIndex");
    getDropMarker();
    const siblingElement = dropMarker?.nextElementSibling;
    if (siblingElement instanceof HTMLElement) {
      const ind =
        siblingElement?.dataset?.index || constructorAreaForm.children.length;
      removeDropMarker();
      insertInFromItems(ind, itemID, itemIndex);
    } else if (itemIndex) {
      const ind = constructorAreaForm.children.length;
      removeDropMarker();
      insertInFromItems(ind, itemID, itemIndex);
    } else {
      addToFormItems(itemID);
      constructorFreeDropZone.classList.remove("active");
    }
  }
  function onConstructorAreaDragEnter(e: Event): void {
    if (!(e.target instanceof HTMLElement)) return;
    getDropMarker();
    if (dropMarker) return;
    e.target.classList.add("active");
  }

  function onConstructorAreaDragLeave(evt: Event): void {
    // let prependZone = document.querySelector("#drop-insert-place");
    // if (prependZone) prependZone.remove();
    (evt.target as HTMLElement).classList.remove("active");
  }

  function onComponentDragEnter(e: Event): void {
    if (process.client) {
      e.preventDefault();
      getDropMarker();
      if (!dropMarker) {
        createDropMarker();
      }
      constructorFreeDropZone?.insertBefore(
        dropMarker as HTMLElement,
        e.target as HTMLElement
      );
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
  function onComponentDragOver(e: DragEvent): void {
    // console.log(e.target, "onComponentDragOver");
    e.preventDefault();
    const itemID = dragged?.id || "";
    const itemIndex = dragged?.dataset?.index || null;
    const target = e.target as HTMLElement;
    //смотрим, куда прёт курсор: если ниже, отвязываем, если выше, то даём управление добавленному элементу
    if (!target.classList.contains("constructor-area__component")) return;
    if (process.client) {
      const checkDirectionVertical =
        target.getBoundingClientRect().bottom -
          target.getBoundingClientRect().height / 2 >
        e.clientY
          ? "up"
          : "down";
      const isOutHotizontally =
        target.getBoundingClientRect().left > e.clientX ||
        target.getBoundingClientRect().right < e.clientX;

      // console.log(e.clientY);
      // console.log(e.target, "onComponentDragOver");
      // console.log(e.target.getBoundingClientRect());
      // console.log(e.clientX);
      getDropMarker();
      // console.log(dropMarker, "dropMarker");
      if (!dropMarker) {
        createDropMarker();
      }

      if (isOutHotizontally) {
        removeDropMarker();
        return;
      }
      if (checkDirectionVertical === "down") {
        // console.log(e.target.nextElementSibling, "e.target.nextSibling");
        if (
          target.nextElementSibling &&
          target.nextElementSibling.classList?.contains(
            "constructor-area__component"
          ) &&
          dropMarker
        ) {
          constructorAreaForm?.insertBefore(
            dropMarker,
            target.nextElementSibling
          );
        } else if (itemIndex && !target.nextElementSibling) {
          constructorAreaForm?.appendChild(dropMarker as HTMLElement);
        } else if (!target.nextElementSibling) {
          removeDropMarker();
          constructorFreeDropZone?.classList.add("active");
        }
      } else {
        if (constructorFreeDropZone?.classList.contains("active")) {
          constructorFreeDropZone?.classList.remove("active");
        }
        constructorAreaForm?.insertBefore(dropMarker as HTMLElement, target);
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
    setConstructorArea,
  };
};
