import CreateAccountDialog from "../../../components/app/CreateAccountDialog.vue";

const meta = {
  component: CreateAccountDialog,
};

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { CreateAccountDialog },
    props: Object.keys(argTypes),
    template: '<CreateAccountDialog />',
  })
}

export default meta;