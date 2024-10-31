import OptionalInfo from "../views/signup/basicInfo/OptionalInfo.vue";

const meta = {
  component: OptionalInfo,
};

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { OptionalInfo },
    props: Object.keys(argTypes),
    template: '<div style="border: 1px solid #f5f5f5; padding: 56px; width: 550px;"><OptionalInfo /></div>',
  })
}

export default meta;
