/** @type { import('@storybook/vue').Preview } */
import vuetify from "./vuetify_storybook";

const preview = {
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

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    toolbar: {
      icon: "paintbrush",
      // Array of plain string values or MenuItem shape
      items: [
        { value: "light", title: "Light", left: "🌞" },
        { value: "dark", title: "Dark", left: "🌛" },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story) => ({
    vuetify,
    template: `
        <v-app>
          <v-main>
            <v-container fluid >
              <story/>
            </v-container>
          </v-main>
        </v-app>
        `,
  }),
];

export default preview;
