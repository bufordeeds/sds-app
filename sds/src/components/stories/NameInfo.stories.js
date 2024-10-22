import NameInfo from "../../views/signup/basicInfo/NameInfo.vue";

const meta = {
  component: NameInfo,
};

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { NameInfo },
    props: Object.keys(argTypes),
    template: '<div style="border: 1px solid #f5f5f5; padding: 56px; width: 550px;"><NameInfo /></div>',
  })
}

export default meta;