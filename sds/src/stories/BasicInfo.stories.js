import BasicInfo from "../views/signup/basicInfo/BasicInfo.vue";

const meta = {
  component: BasicInfo,
};

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { BasicInfo},
    props: Object.keys(argTypes),
    template: '<div style="border: 1px solid #f5f5f5; padding: 56px; width: 550px;"><BasicInfo /></div>',
  })
}

export default meta;
