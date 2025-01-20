const createDateRangeModel = () => [
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
    component: "BaseTextInput",
    props: {
      id: "labelFromInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Label From",
    },
    sequenceNumber: 2,
    fieldName: "labelFrom",
  },
  {
    component: "BaseTextInput",
    props: {
      id: "labelToInput",
      displayName: "",
      isHidden: false,
      required: false,
      type: "text",
      placeholder: "Label To",
    },
    sequenceNumber: 3,
    fieldName: "labelTo",
  },
  // {
  //   isGroup: true,
  //   groupType: "OBJECT",
  //   groupName: "dateRange",
  //   groupFields: [
  //     {
  //       component: "BaseDateInput",
  //       props: {
  //         id: "dateStart",
  //         displayName: "",
  //         isHidden: true,
  //         required: false,
  //         placeholder: "Starting date",
  //       },
  //       sequenceNumber: 3,
  //       fieldName: "dateStart",
  //     },
  //     {
  //       component: "BaseDateInput",
  //       props: {
  //         id: "dateEnd",
  //         displayName: "",
  //         isHidden: true,
  //         required: false,
  //         placeholder: "Ending date",
  //       },
  //       sequenceNumber: 3,
  //       fieldName: "dateEnd",
  //     },
  //   ],
  //   sequenceNumber: 4,
  // },

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
  // {
  //   component: "BaseCheckbox",
  //   props: {
  //     id: "required",
  //     displayName: "",
  //     isHidden: false,
  //     required: false,
  //     label: "Set at today's date",
  //   },
  //   sequenceNumber: 5,
  //   fieldName: "setToday",
  //   initialValue: true,
  // },
  {
    component: "BaseCheckbox",
    props: {
      id: "disabled",
      displayName: "",
      isHidden: false,
      required: false,
      label: "Disabled",
    },
    sequenceNumber: 6,
    fieldName: "disabled",
  },
];

export default createDateRangeModel;
