import Tabs from "../components/inputs/Tabs.vue";

const meta = {
  component: Tabs,
};

const options = [];

for (let i = 0; i < 5; i++) {
  options.push({ label: `Tab ${i + 1}`, value: `tab_${i + 1}` });
}

function handleTabChange(value) {
  console.log(value);
}

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { Tabs },
    props: Object.keys(argTypes),
    template: '<Tabs v-bind="$props" @handleTabChange="handleTabChange" />',
  }),
  args: {
    tabOptions: options,
    handleTabChange,
  }
};

export const Rounded = {
  render: (args, { argTypes }) => ({
    components: { Tabs },
    props: Object.keys(argTypes),
    template: '<Tabs v-bind="$props" @handleTabChange="handleTabChange" />',
  }),
  args: {
    tabOptions: options,
    variant: 'rounded',
    handleTabChange,
  }
};

export const Pills = {
  render: (args, { argTypes }) => ({
    components: { Tabs },
    props: Object.keys(argTypes),
    template: '<Tabs v-bind="$props" @handleTabChange="handleTabChange" />',
  }),
  args: {
    tabOptions: options,
    variant: 'pill',
    handleTabChange,
  }
};

export default meta;