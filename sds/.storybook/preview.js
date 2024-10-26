import VuetifyDecorator from './withVuetify.decorator';

/** @type { import('@storybook/vue').Preview } */
const preview = {
  decorators: [VuetifyDecorator],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
