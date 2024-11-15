const textInputSettingsModel = [
  {
    component: "BaseInput",
    props: {
      id: "firstInput",
      displayName: "",
      sequenceNumber: 1,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "first input placeholder",
    },
    editField: "placeholder",
  },
  {
    component: "BaseInput",
    props: {
      id: "firstInput",
      displayName: "",
      sequenceNumber: 2,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "second input placeholder",
    },
    editField: "label",
  },
  {
    component: "BaseInput",
    props: {
      id: "firstInput",
      displayName: "",
      sequenceNumber: 3,
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "third input placeholder",
    },
    editField: "isHidden",
  },
];

export default textInputSettingsModel;
