import SingleUsersRegistrationV4 from "../views/mgmDogs/SingleUsersRegistrationV4.vue";

export default {
  component: SingleUsersRegistrationV4,
};

export const Primary = {
  render: (args, { argTypes }) => ({
    components: { SingleUsersRegistrationV4 },
    props: Object.keys(argTypes),
    template: "<SingleUsersRegistrationV4 v-bind='$props' />",
  }),
  args: {
    user: {},
    dogs: [],
    isHandler: false, //use to indicate if this is
    expanded: true,
    showAddDogs: false, //controls if button to add dogs is shown
    showTransfer: false, //controls if button to add dogs is shown
    myDogs: false, //controls if user's image is shown in mobile mode
  },
};
