import PersonalInfo from "../views/signup/basicInfo/PersonalInfo.vue";

const meta = {
  component: PersonalInfo,
};

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { PersonalInfo },
    props: Object.keys(argTypes),
    template: '<div style="border: 1px solid #f5f5f5; padding: 56px; width: 550px;"><PersonalInfo /></div>',
  })
}

export default meta;