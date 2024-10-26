import EmergencyInfo from '../views/signup/basicInfo/EmergencyInfo.vue';

const meta = {
  component: EmergencyInfo,
};

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { EmergencyInfo},
    props: Object.keys(argTypes),
    template: '<div style="border: 1px solid #f5f5f5; padding: 56px; width: 550px;"><EmergencyInfo /></div>',
  })
}

export default meta;
