const createDateInputModel = () => [
  {
    component: "BaseTextInput",
    props: {
      id: "labelInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Label",
    },
    sequenceNumber: 1,
    fieldName: "label",
  },

  {
    component: "BaseDateInput",
    props: {
      id: "minDate",
      displayName: "",
      isHidden: false,
      required: false,
      placeholder: "Min date",
    },
    sequenceNumber: 3,
    fieldName: "min",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "nameInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Name (optional)",
    },
    sequenceNumber: 1,
    fieldName: "name",
  },
  {
    component: "BaseDateInput",
    props: {
      id: "maxDate",
      displayName: "",
      isHidden: false,
      required: false,
      placeholder: "Max date",
    },
    sequenceNumber: 3,
    fieldName: "max",
  },

  {
    component: "BaseCheckbox",
    props: {
      id: "required",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Required",
    },
    sequenceNumber: 5,
    fieldName: "required",
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "required",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Set at today's date",
    },
    sequenceNumber: 5,
    fieldName: "setToday",
    initialValue: true,
  },
  {
    component: "BaseCheckbox",
    props: {
      id: "disabled",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 7,
    fieldName: "disabled",
  },
];

export default createDateInputModel;
