export const useFormDrop = ({
  constructorAreaSelector = "",
  customMarkerSelector = "",
}: {
  constructorAreaSelector: string;
  customMarkerSelector: string;
}) => {
  const dropMarkerSelector = customMarkerSelector || "drop-insert-marker";
  let constructorArea;

  let constructorWrap;

  let dropMarker: Element | null = null;

  const formItems = useState<string[]>("formItems", () => []);

  function setConstructorArea() {
    if (process.client) {
      constructorArea = document.querySelector(constructorAreaSelector);
      console.log(
        constructorArea,
        constructorAreaSelector,
        "setting constrArea"
      );
      constructorWrap = document.querySelector(".constructor-area");
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
      dropMarker.id = dropMarkerSelector;
    }
  }
  function onDrag(e): void {
    console.log(constructorArea, "constructorArea");
    console.log(e.clientX, "onDrag");
    console.log(e.clientY, "onDrag");

    const { bottom, top, left, right } =
      constructorArea?.getBoundingClientRect();
    const isOutOfBounds =
      e.clientY > bottom ||
      e.clientY < top ||
      e.clientX < left ||
      e.clientX > right;

    if (isOutOfBounds) {
      getDropMarker();
      if (!dropMarker) return;
      dropMarker?.remove();
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
      dropMarker?.remove();
      formItems.value.splice(ind, 0, itemID);
    } else {
      formItems.value.push(itemID);
      constructorArea.classList.remove("active");
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
        constructorArea?.insertBefore(dropMarker as HTMLElement, e.target);
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
    e.preventDefault();
    //смотрим, куда прёт курсор: если ниже, отвязываем, если выше, то даём управление добавленному элементу
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
      console.log(e.target.getBoundingClientRect());
      console.log(e.clientX);
      getDropMarker();
      console.log(dropMarker, "dropMarker");
      if (!dropMarker) {
        createDropMarker();
      }
      if (isOutHotizontally) {
        dropMarker?.remove();
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
          constructorArea?.insertBefore(
            dropMarker,
            e.target.nextElementSibling
          );
        } else if (!e.target.nextElementSibling) {
          if (dropMarker) dropMarker.remove();
          constructorArea?.classList.add("active");
        }
      } else {
        constructorWrap?.insertBefore(dropMarker, e.target);
      }
    }
  }
  return {
    formItems,
    startDrag,
    onDrop,
    onComponentDragEnter,
    onComponentDragOver,
    onConstructorAreaDragEnter,
    onConstructorAreaDragLeave,
    onDrag,
  };
};
