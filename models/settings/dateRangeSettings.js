const createDateRangeModel = () => [
  {
    isGroup: true,
    groupType: "OBJECT",
    groupName: "dateRange",
    groupFields: [
      {
        component: "BaseDateInput",
        props: {
          id: "dateStart",
          displayName: "",
          isHidden: false,
          required: false,
          placeholder: "Starting date",
        },
        sequenceNumber: 3,
        fieldName: "dateStart",
      },
      {
        component: "BaseDateInput",
        props: {
          id: "dateEnd",
          displayName: "",
          isHidden: false,
          required: false,
          placeholder: "Ending date",
        },
        sequenceNumber: 3,
        fieldName: "dateEnd",
      },
    ],
    sequenceNumber: 1,
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
    sequenceNumber: 7,
    fieldName: "disabled",
  },
];

export default createDateRangeModel;
