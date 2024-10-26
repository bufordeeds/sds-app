import AboutDog from "../views/signup/basicInfo/AboutDog.vue";

const meta = {
  component: AboutDog,
};

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { AboutDog},
    props: Object.keys(argTypes),
    template: '<div style="border: 1px solid #f5f5f5; padding: 56px; width: 550px;"><AboutDog /></div>',
  })
}

export default meta;
