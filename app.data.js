module.exports = [
  (function() {
  var e = require("/home/circleci/react-native-paper/docs/pages/0.index.js");
  var c = typeof e.default === 'function' ? e.default : e;
  var m = e.meta || {};
  return {
     title: m.title || "Home",
     link: m.link || "index",
     description: m.description,
     type: "custom",
     data: c
  };
}()),{"filepath":"pages/1.getting-started.md","title":"Getting Started","description":"","link":"getting-started","data":"# Getting Started\n\n## Installation\n\n* Open a Terminal in your project's folder and run:\n\n```sh\nyarn add react-native-paper\n```\nor\n```sh\nnpm install react-native-paper\n```\n\n* From `v5` there is a need to install [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) for handling safe area.\n\n```sh\nyarn add react-native-safe-area-context\n```\nor\n```sh\nnpm install react-native-safe-area-context\n```\n\nAdditionaly for `iOS` platform there is a requirement to link the native parts of the library:\n\n```sh\nnpx pod-install\n```\n\n* If you're on a vanilla React Native project, you also need to install and link [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons).\n\nSpecifically `MaterialCommunityIcons` icon pack needs to be included in the project, because some components use those internally (e.g. `AppBar.BackAction` on Android). \n\n```sh\nyarn add react-native-vector-icons\n```\n\nThe library has specified dedicated steps for each platform. Please follow their [installation guide](https://github.com/oblador/react-native-vector-icons#installation) in order to properly use icon fonts.\n\nIf you don't want to install vector icons, you can use [babel-plugin-optional-require](https://github.com/satya164/babel-plugin-optional-require) to opt-out.\n\nIf you use Expo, you don't need to install vector icons. But if you have a `babel.config.js` or `.babelrc` file, make sure that it includes `babel-preset-expo`.\n\nTo get smaller bundle size by excluding modules you don't use, you can use our optional babel plugin. The plugin automatically rewrites the import statements so that only the modules you use are imported instead of the whole library. Add `react-native-paper/babel` to the `plugins` section in your `babel.config.js` for production environment. It should look like this:\n\n```js\nmodule.exports = {\n  presets: ['module:metro-react-native-babel-preset'],\n  env: {\n    production: {\n      plugins: ['react-native-paper/babel'],\n    },\n  },\n};\n```\n\nIf you created your project using Expo, it'll look something like this:\n\n```js\nmodule.exports = function(api) {\n  api.cache(true);\n  return {\n    presets: ['babel-preset-expo'],\n    env: {\n      production: {\n        plugins: ['react-native-paper/babel'],\n      },\n    },\n  };\n};\n```\n\nThe plugin only works if you are importing the library using ES2015 import statements and not with `require`.\n\n**Note:** The above examples are for the latest `react-native` using Babel 7. If you have `react-native <= 0.55`, you'll have a `.babelrc` file instead of a `babel.config.js` file and the content of the file will be different.\n\nIf you're using Flow for typechecking your code, you need to add the following under the `[options]` section in your `.flowconfig`:\n\n```ini\nmodule.file_ext=.js\nmodule.file_ext=.native.js\nmodule.file_ext=.android.js\nmodule.file_ext=.ios.js\n```\n\n## Usage\n\nWrap your root component in `Provider` from `react-native-paper`. If you have a vanilla React Native project, it's a good idea to add it in the component which is passed to `AppRegistry.registerComponent`. This will usually be in the `index.js` file. If you have an Expo project, you can do this inside the exported component in the `App.js` file.\n\nExample:\n\n```js\nimport * as React from 'react';\nimport { AppRegistry } from 'react-native';\nimport { Provider as PaperProvider } from 'react-native-paper';\nimport { name as appName } from './app.json';\nimport App from './src/App';\n\nexport default function Main() {\n  return (\n    <PaperProvider>\n      <App />\n    </PaperProvider>\n  );\n}\n\nAppRegistry.registerComponent(appName, () => Main);\n```\n\nThe `PaperProvider` component provides the theme to all the components in the framework. It also acts as a portal to components which need to be rendered at the top level.\n\nIf you have another provider (such as `Redux`), wrap it outside `PaperProvider` so that the context is available to components rendered inside a `Modal` from the library:\n\n```js\nimport * as React from 'react';\nimport { Provider as PaperProvider } from 'react-native-paper';\nimport { Provider as StoreProvider } from 'react-redux';\nimport App from './src/App';\nimport store from './store';\n\nexport default function Main() {\n  return (\n    <StoreProvider store={store}>\n      <PaperProvider>\n        <App />\n      </PaperProvider>\n    </StoreProvider>\n  );\n}\n```\n\n## Customization\n\nYou can provide a custom theme to customize the colors, typescales etc. with the `Provider` component. Check the [Material Design 3 default theme](https://github.com/callstack/react-native-paper/blob/main/src/styles/themes/v3/LightTheme.tsx) to see what customization options are supported.\n\nExample:\n\n```js\nimport * as React from 'react';\nimport { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';\nimport App from './src/App';\n\nconst theme = {\n  ...DefaultTheme,\n  colors: {\n    ...DefaultTheme.colors,\n    primary: 'tomato',\n    secondary: 'yellow',\n  },\n};\n\nexport default function Main() {\n  return (\n    <PaperProvider theme={theme}>\n      <App />\n    </PaperProvider>\n  );\n}\n```\n\n<i>Note: For MD2 check the following [Material Design 2 default theme](https://github.com/callstack/react-native-paper/blob/main/src/styles/themes/v2/LightTheme.tsx).</i>\n","type":"md","dependencies":[]},{"filepath":"pages/10.migration-guide-to-5.0.md","title":"Introducing v5 with Material You","description":"","link":"introducing-v5-with-material-you","data":"React Native Paper v5 is all about adopting the new Material Design 3 <i>aka</i> Material You. It was released in October 2021 after intense work and effort to make Material You follow a more expressive approach to design.\n\nPaper now supports both Material Design 2 and 3 through the configuration described in [Versioning](#versioning) and is compatible with a handful of API changes. \n\n# Migration guide to Material You 5.0\n\nVersion 5.0 brings support for the next Material Design iteration branded as Material You <i>(in fact being Material Design v3 or in short MD3)</i> into the `react-native-paper` library. All the components were refined according to the official [design kit on figma](https://www.figma.com/community/file/1035203688168086460) and adjusted in terms of visuals by changes in colors, typography and animations. \n\nBelow you can find the most important information about the components whose API may have changed  API has been changed due to supporting new props, renaming existing ones or some deprecations. Hopefully, based on the presented required changes, migration to the latest version should be smooth. Enjoy!\n\n### Installation\n\n* The `v5` has been oficially released as a stable version, which means it will be installed by default from the `npm`. In order to do that, open a Terminal in your project's folder and run:\n\n```sh\nyarn add react-native-paper\n```\nor\n```sh\nnpm install react-native-paper\n```\n\n* From `v5` there is a need to install [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) for handling safe area.\n\n```sh\nyarn add react-native-safe-area-context\n```\nor\n```sh\nnpm install react-native-safe-area-context\n```\n\nAdditionaly for `iOS` platform there is a requirement to link the native parts of the library:\n\n```sh\nnpx pod-install\n```\n\n## Theming\n\n### Versioning\n\nIntroducing Material You <i>(MD3)</i> into `react-native-paper` doesn't mean dropping previous Material Design <i>(MD2)</i>! On the contrary, both of them will be supported, however, not simultaneously. To specify which design system components should follow in the app, there is a newly created property in the theme called `version` which can accept only one of two values:\n\n* <b>3</b> – <b>(default)</b> new Material You <i>(MD3)</i>,\n* <b>2</b> - previous Material Design <i>(MD2)</i>.\n\n```js\ntheme: {\n  /* ... */\n  version: 3 | 2\n}\n```\n\nRead more about using Material Design 2 in our [Material Design 2 theming guide](https://callstack.github.io/react-native-paper/theming.html#material-design-2)\n\n### Colors\n\nNew theme introduces a new color palette along with new namings reflecting design color tokens, but written in camel case. Palette contains a set of five key colors, where primary, secondary and tertiary are classified into <i>accent colors</i>. The second group of colors is <i>neutral and neutral variant colors</i> used for defining surface or background roles as well as specifying high and medium emphasis text and icons. Additionally, the color system includes a semantic color role for error.\n\nEach accent and error colors has a group of related tones. The tones are mapped to roles that create contrast and visual interest when applied to elements in the UI.\n\n📍<i>Note: Dynamic colors are not supported yet.</i>\n\n<img class=\"medium\" src=\"migration/color-palette.png\" />\n\nColors theme structure should follow the default palette and contain the following properties:\n\n```js\ntheme: {\n  /* ... */\n  colors: {\n    primary,\n    primaryContainer,\n    secondary,\n    secondaryContainer,\n    tertiary,\n    tertiaryContainer,\n    surface,\n    surfaceVariant,\n    surfaceDisabled,\n    background,\n    error,\n    errorContainer,\n    onPrimary,\n    onPrimaryContainer,\n    onSecondary,\n    onSecondaryContainer,\n    onTertiary,\n    onTertiaryContainer,\n    onSurface,\n    onSurfaceVariant,\n    onSurfaceDisabled,\n    onError,\n    onErrorContainer,\n    onBackground,\n    outline,\n    shadow,\n    inverseOnSurface,\n    inverseSurface,\n    inversePrimary,\n    backdrop,\n    elevation: {\n      level0,\n      level1,\n      level2,\n      level3,\n      level4,\n      level5\n    }\n  }\n}\n```\n\n👉 You can find more about color on [Material You website](https://m3.material.io/styles/color/the-color-system/key-colors-tones)\n\n## Typography\n\nA new way of approaching typography introduces one component `<Text>` which accepts prop `variant`. Variant defines appropriate text styles for type role and its size. The updated type scale organizes styles into five roles that are named to describe their purposes: <b>Display</b>, <b>Headline</b>, <b>Title</b>, <b>Label</b> and <b>Body</b> along with three display styles <i>large</i>, <i>medium</i>, and <i>small</i>. In total, there are fifteen variants that are MD3 compliant and are reflecting design typography tokens written in camel case. \n\n<i>Note:</i> If any component uses Paper's `Text` component, without specified <b>variant</b>, then `default` variant is applied.\n\n```js\n<Text variant=\"displayLarge\">Display Large</Text>\n<Text variant=\"displayMedium\">Display Medium</Text>\n<Text variant=\"displaySmall\">Display small</Text>\n\n<Text variant=\"headlineLarge\">Headline Large</Text>\n<Text variant=\"headlineMedium\">Headline Medium</Text>\n<Text variant=\"headlineSmall\">Headline Small</Text>\n\n<Text variant=\"titleLarge\">Title Large</Text>\n<Text variant=\"titleMedium\">Title Medium</Text>\n<Text variant=\"titleSmall\">Title Small</Text>\n\n<Text variant=\"bodyLarge\">Body Large</Text>\n<Text variant=\"bodyMedium\">Body Medium</Text>\n<Text variant=\"bodySmall\">Body Small</Text>\n\n<Text variant=\"labelLarge\">Label Large</Text>\n<Text variant=\"labelMedium\">Label Medium</Text>\n<Text variant=\"labelSmall\">Label Small</Text>\n ```\n\nTake a look at the suggested replacement diff:\n\n ```diff\n- <Headline>Headline</Headline>\n+ <Text variant=\"headlineSmall\">Headline</Text>\n\n- <Title>Title</Title>\n+ <Text variant=\"titleLarge\">Title</Text>\n\n- <Subheading>Subheading</Subheading>\n+ <Text variant=\"titleMedium\">Subheading</Text>\n\n- <Paragraph>Paragraph</Paragraph>\n+ <Text variant=\"bodyMedium\">Paragraph</Text>\n\n- <Caption>Caption</Caption>\n+ <Text variant=\"bodySmall\">Caption</Text>\n ```\n\n\n👉 You can find more about color on [Material You website](https://m3.material.io/styles/typography/overview)\n\n### Configure fonts\n\nThe existing utility called `configureFonts` was adjusted to help users configure their theme fonts in both version, that's why that function, as of today, is going to accept the object with the follwing properties as an argument:\n\n```ts\nconfigureFonts(params)\n```\n\n<b>Parameters:</b>\n\n| NAME        | TYPE        | REQUIRED    |\n| ----------- | ----------- | ----------- |\n| params      | object      | No          |\n\nValid `params` keys are:\n\n  * `config` ([MD2FontsConfig](https://github.com/callstack/react-native-paper/blob/main/src/styles/fonts.tsx#L63) | [MD3FontsConfig](https://github.com/callstack/react-native-paper/blob/main/src/styles/fonts.tsx#L67)) - fonts config object appropriate to the MD version\n  * `isV3` (boolean) - whether adjusting theme fonts for v3. Default it <b>true</b>.\n\nTo use your current font config from <b>v2</b> and migrate to <b>v3</b> there are two requirements:\n* the font config previously passed directly into function has to be passed into the params object property called `config`\n* the params object property `isV3` has to be set to `false`\n\n```diff\n- configureFonts(fontConfig)\n+ configureFonts({config: fontConfig, isV3: false})\n```\n\n📍<i>Note: If you want to check how to use `configureFonts` on MD3, check the [Fonts](https://callstack.github.io/react-native-paper/fonts.html) guide.</i>\n\n# Components\n\n## Appbar <i>(Top app bar)</i>\n\n`Appbar` and `Appbar.Header` in the latest version can be used in four various modes due to new prop `mode`:\n\n* `small` - Appbar with default height <i>(56) (default)</i>,\n* `medium` - Appbar with medium height <i>(112)</i>,\n* `large` - Appbar with large height <i>(152)</i>,\n* `center-aligned` - Appbar with default height <i>(56)</i> and center-aligned title.\n\n```js\n<Appbar mode=\"center-aligned\">\n  /* ... */\n</Appbar>\n```\n\nTo make it easier for users to build the `BottomBar`, formed on the `Appbar` components, we have added a property `safeAreaInsets`:\n\n```js\n<Appbar safeAreaInsets={{ bottom: 47 }}>\n  /* ... */\n</Appbar>\n```\n \nIt's worth noting that by default the theme version 3 `Appbar` and `Appbar.Header` don't have a shadow. However, it can be added by passing prop `elevated` into the component:\n\n```js\n<Appbar elevated>\n  /* ... */\n</Appbar>\n```\n\n### Appbar.Action\n\n`Appbar.Action` received new prop `isLeading`, which defines whether it's the <b>leading</b> button and should be placed at the beginning of the `Appbar`.\n\n```js\n<Appbar.Action isLeading icon=\"magnify\" onPress={() => {}} />\n```\n\n### Appbar.Content\n\nNew design guidelines indicate there is no <b>subtitle</b> in `Appbar.Content`, that's why there are two deprecations and the following props won't be supported anymore: `subtitle` and `subtitleStyle`.\n\n```diff\n- <Appbar.Content title=\"Title\" subtitle=\"Subtitle\" styles={styles.subtitle} />\n+ <Appbar.Content title=\"Title\" />\n```\n\n## Banner, Searchbar and Snackbar\n\nAccording to the updates in `Surface` on the top of which `Banner`, `Searchbar` and `Snackbar` are implemented, all three component received `elevation` prop to adjust its value.\n\n```diff\n- <Snackbar style={{elevation: 1}}>Hello</Snackbar>\n+ <Snackbar elevation={1}>Hello</Snackbar>\n```\n\n## BottomNavigation <i>(Navigation bar)</i>\n\nFor the sake of new animation of pill shape, indicating active destination, and assisting icon change from outlined to filled, there are three changes within `navigationState.routes` property items:\n\n* `color` is deprecated since color is constant and the same for all routes,\n* `icon` is renamed to `focusedIcon`, as the name implies, with theme version 3 it's the outline icon used as focused tab icon and with theme version 2 it's a default icon,\n* `unfocusedIcon` <i>(optional)</i> is the filled icon used as the unfocused tab icon, compatible with theme version 3.\n\n📍<i>Note: `unfocusedIcon` is optional, if you can't find outline icon equivalent, omit that prop, so `focusedIcon` will be displayed in both active and inactive state</i>\n\n```diff\nroutes: [\n- { key: \"album\", title: \"Album\", icon: \"image-album\", color: \"#3F51B5\" },\n+ { key: \"album\", title: \"Album\", focusedIcon: \"image-album\" },\n- { key: \"library\", title: \"Library\", icon: \"inbox\", color: \"#009688\" },\n+ { key: \"library\", title: \"Library\", focusedIcon: \"inbox\", unfocusedIcon: \"inbox-outline\" },\n- { key: \"favorites\", title: \"Favorites\", icon: \"heart\", color: \"#795548\" },\n+ { key: \"favorites\", title: \"Favorites\", focusedIcon: \"heart\", unfocusedIcon: \"heart-outline; },\n- { key: \"purchased\", title: \"Purchased\", icon: \"shopping-cart\", color: \"#607D8B\" },\n+ { key: \"purchased\", title: \"Purchased\", focusedIcon: \"shopping-cart\" },\n]\n```\n\nThe `compact` prop was also introduced, working with both themes. It indicates whether tabs should be spread across the entire width, especially in a <i>horizontal</i> mode. \n\n```js\n<BottomNavigation compact />\n```\n\nIt's worth to mention that default value of prop `shifting` depends on the theme version:\n* <b>3</b> - it's `false`,\n* <b>2</b> - it's `true` when there are more than 3 tabs.\n\nTwo additional props that control the scene animation were introduced that control the animation of the tabs when `sceneAnimationEnabled` is `true`:\n* `sceneAnimationType: \"opacity\" | \"shifting\" | undefined` - defines the animation type for the scene. `shifting` enables a new animation where navigating to a scene will shift it horizontally into view. Both `opacity` and `undefined` have the same effect, fading the scene into view.\n* `sceneAnimationEasing` allows specifying a custom easing function for the scene animation.\n\n![shiftingAnimation](screenshots/bottom-navigation-shifting.gif)\n\nOn a final note, please be aware that `BottomNavigation` with theme version 3 doesn't have a shadow.\n\n## Button\n\n`Button`'s property `mode` has been expanded with two additional options:\n* `elevated` - button with a background color and elevation, used when absolutely necessary e.g. button requires visual separation from a patterned background,\n* `container-tonal` - button with a secondary background color, an alternative middle ground between contained and outlined buttons.\n\n```js\n<>\n  <Button icon=\"camera\" mode=\"elevated\" onPress={onPress}>\n    Elevated\n  </Button>\n  <Button icon=\"camera\" mode=\"container-tonal\" onPress={onPress}>\n    Container tonal\n  </Button>\n</>\n```\n\nThe property `color` is deprecated, but in its place two new props called `buttonColor` and `textColor` are introduced:\n* `buttonColor` - custom button's background color,\n* `textColor` - custom button's text color.\n\n```diff\n- <Button mode=\"text\" color=\"red\" onPress={onPress}>Custom text color</Button>\n+ <Button mode=\"text\" textColor=\"red\" onPress={onPress}>Custom text color</Button>\n```\n\n```diff\n- <Button mode=\"contained\" color=\"red\" onPress={onPress}>Custom text color</Button>\n+ <Button mode=\"contained\" buttonColor=\"red\" onPress={onPress}>Custom background color</Button>\n```\n\nPlease be aware that along with theme version 3, by default text in the `Button` component isn't uppercased and `contained` button doesn't have any shadow <i>(use then `elevated`)</i>.\n\n## Card\n\nThe `Card` component's property `mode` has been expanded with one additional option called `contained`, which applies to the card's specified background color without any elevation and border.\n\n```js\n<Card mode=\"contained\" />\n```\n\n## Card.Title\n\nSince there is no one right way to make a card, there is also no one right way for specifying a title and subtitle variant. Therefore two new props come in handy:\n\n* `titleVariant` - title text variant defines appropriate text styles for type role and its size.\n* `subtitleVariant` - subtitle text variant defines appropriate text styles for type role and its size.\n\n```js\n<Card.Title\n  titleVariant=\"headlineMedium\"\n  subtitleVariant=\"bodyLarge\"\n/>\n```\n\n## Checkbox.Item\n\n`Checkbox.Item` similarly to `RadioButton.Item` has been expanded with the prop called `labelVariant`, which defines appropriate text styles for type role and its size.\n\n```js\n<Checkbox.Item \n  labelVariant=\"titleLarge\"\n>\n```\n\n## Chip\n\nTo properly compose `Chip` component and adjust into required type, there are three new props that will come in handy:\n\n* `compact` - sets smaller horizontal paddings around the label, useful for `Chip` containing only the label,\n* `elevated` - indicating whether `Chip` should be elevated,\n* `showSelectedOverlay` - defining whether to display an overlay on a selected button.\n\n```js\n<>\n  <Chip compact>Compact Chip</Chip>\n  <Chip icon=\"camera\" elevated>Elevated Chip</Chip>\n  <Chip icon=\"camera\" selected showSelectedOverlay>Chip with selected overlay</Chip>\n</>\n```\n\n## Dialog.Icon\n\n`Dialog.Icon` is another freshly added component presenting an icon within a `Dialog`, placed at the top of the content.\n\n📍<i>Note: It's working only with theme version 3.</i>\n\n```js\n<Portal>\n  <Dialog visible={visible} onDismiss={hideDialog}>\n    <Dialog.Icon icon=\"alert\" />\n  </Dialog>\n</Portal>\n```\n## Divider\n\n`Divider` component received two new props:\n\n* `bold` - divider is bolded,\n* `horizontalInset` - divider has horizontal insets on both sides.\n\nAdditionally prop `inset` was renamed to `leftInset`.\n\n```diff\n- <Divider inset />\n+ <Divider leftInset />\n```\n\n## Drawer.CollapsedItem <i>(Navigation rail)</i>\n\n`Drawer.CollapsedItem` is a newly created side navigation component that can be used within `Drawer`, representing a destination in the form of an action item with an icon and optionally label.\n\n📍<i>Note: It's working only with theme version 3.</i>\n\n```js\n<Drawer.Section>\n  <Drawer.CollapsedItem\n    focusedIcon=\"inbox\"\n    unfocusedIcon=\"inbox-outline\"\n    label=\"Inbox\"\n  />\n  <Drawer.CollapsedItem\n    focusedIcon=\"star\"\n    unfocusedIcon=\"star-outline\"\n    label=\"Starred\"\n  />\n</Drawer.Section>\n```\n\n## Drawer.Section\n\nWith the latest version, there is a possibility to specify whether `Drawer.Section` should have a separator, in form of `Divider` component, displayed at the end of the section. To adjust it, a new property called `showDivider` was introduced, which by default is `true`:\n\n```js\n<Drawer.Section showDivider={false}>\n  <Drawer.CollapsedItem\n    focusedIcon=\"inbox\"\n    unfocusedIcon=\"inbox-outline\"\n    label=\"Inbox\"\n  />\n  <Drawer.CollapsedItem\n    focusedIcon=\"star\"\n    unfocusedIcon=\"star-outline\"\n    label=\"Starred\"\n  />\n</Drawer.Section>\n```\n\n## Floating Action Buttons\n\n`FAB`, `AnimatedFAB` and `FAB.Group` in the latest version can be used with four variants and two modes, thanks to two new props:\n\n* `variant` defines color mappings variant for combinations of container and icon colors. Can be one of: <b>primary</b> <i>(default)</i>, <b>secondary</b>, <b>tertiary</b> or <b>surface</b>.\n\n```js\n<FAB variant=\"tertiary\" />\n```\n\n* `mode` specifies whether a button should be <b>flat</b> or <b>elevated</b>:\n   - `flat` - button without a shadow,\n   - `elevated` - button with a shadow.\n\n```js\n<FAB mode=\"flat\" />\n```\n\n### FAB\n\nAdditionaly `FAB` may be applied in one of three available sizes, thanks to new prop `size`: \n\n* `small` - FAB with small height (40),\n* `medium` - Appbar with default medium height (56),\n* `large` - Appbar with large height (96).\n\n```js\n<FAB size=\"large\" />\n```\n\nHowever, if you would like to have your own size of `FAB`, there is a new prop called `customSize`:\n\n```js\n<FAB customSize={64}>\n```\n\nAccordingly to introducing `size=\"small\"`, prop `small` was deprecated.\n\n```diff\n- <FAB small />\n+ <FAB size=\"small\" />\n```\n\n### FAB.Group\n\nThere is also deprecation in one of the `actions` properties, namely `small` prop is deprecated and replaced in favour of the default `size=\"small\"`.\n\n```diff\n- <FAB.Group actions={[{ icon: \"plus\", small }]} />\n+ <FAB.Group actions={[{ icon: \"plus\" }]} />\n```\n\nAdditionally, the action item property previously known as `labelStyle` was renamed to `containerStyle` since it's tied mostly with the container styles. At the same time, `labelStyle` is still available with the new role related to styling item label. \n\n```diff\n- <FAB.Group actions={[{ icon: \"plus\", labelStyle: styles.customStyle }]} />\n+ <FAB.Group actions={[{ icon: \"plus\", containerStyle: styles.customStyle, labelStyle: styles.newLabelStyle }]} />\n```\n\n## IconButton\n\n`IconButton` received two new props:\n\n* `selected` sets alternative combination of icon and container color,\n\n```js\n<IconButton selected>\n```\n\n* `containerColor` custom background color of the icon container. \n\n```js\n<IconButton containerColor=\"red\">\n```\n\nAt the same time, the `color` prop was renamed to `iconColor`.\n\n```diff\n- <IconButton color=\"red\" />\n+ <IconButton iconColor=\"red\" />\n```\n\n## Menu.Item\n\n`Menu.Item` received two new props:\n\n* `dense` sets smaller item height for more condensed layout,\n* `trailingIcon` which handles displaying an icon at the end of the item row. \n\n```js\n<Menu.Item dense trailingIcon=\"chevron-up\">\n```\n\nAt the same time, by analogy to the second new prop, the `icon` prop was renamed to `leadingIcon`.\n\n```diff\n- <Menu.Item icon=\"redo\" onPress={() => {}} title=\"Redo\" />\n+ <Menu.Item leadingIcon=\"redo\" onPress={() => {}} title=\"Redo\" />\n```\n\n## RadioButton.Item\n\n`RadioButton.Item` has been expanded with the prop called `labelVariant`, which defines appropriate text styles for type role and its size.\n\n```js\n<RadioButton.Item \n  labelVariant=\"titleLarge\"\n>\n```\n\n## SegmentedButtons\n\n`SegmentedButtons` is a completely new component introduced in the latest version. It allows people to select options, switch views, or sort elements. It supports single and multiselect select variant and provide a lot of customization options.\n\n![segmentedButtons](screenshots/segmentedbuttons.gif)\n\n```js\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('');\n\n  return (\n      <SegmentedButtons\n        value={value}\n        onValueChange={setValue}\n        buttons={[\n          {\n            value: 'walk',\n            label: 'Walking',\n          },\n          {\n            value: 'train',\n            label: 'Transit',\n          },\n          {\n            value: 'drive',\n            label: 'Driving',\n          },\n        ]}\n      />\n  );\n};\n```\n\n## Snackbar\n\n`Snackbar` due to the optional close affordance, in form of `IconButton` <i>(located on the right side of action button)</i>, received three new props:\n\n* `icon` - icon to display when `onIconPress` is defined. Default will be `close` icon.\n* `onIconPress` - function to execute on icon button press. The icon button appears only when this prop is specified.\n* `iconAccessibilityLabel` - accessibility label for the icon button.\n\n## Surface\n\n`Surface` component received one new prop:\n* `elevation` - accepts values from `0` to `5` and applies background color and shadows to the `Surface` component. Supports both iOS and Android.\n\nPreviously `elevation` was passed inside the `style` prop. Since it supported not only Android, but also iOS, we decided to extract it from `style` and create a separate `elevation` prop for that.\n\n```diff\n- <Surface style={{ elevation: 1 }} />\n+ <Surface elevation={1} />\n```\n\n## TextInput.Icon\n\nThe property `name` was renamed to `icon`, since the scope and type of that prop is much wider than just the icon name – it accepts also the function which receives an object with color and size properties and \n\n```diff\n- <TextInput.Icon name=\"magnify\" />\n+ <TextInput.Icon icon=\"magnify\" />\n```\n\n## Tooltip\n\nComponent displayed upon tapping and holding a screen element or component used to present an informative text label identifying an element, such as a description of its function.\n\n![tooltip](screenshots/tooltips.gif)\n\n\n```js\n<Tooltip title=\"Selected Camera\">\n  <IconButton icon=\"camera\" selected size={24} onPress={() => {}} />\n</Tooltip>\n```\n\n## Credits\n\n<i>With this, that’s a wrap.</i>\n\nThe update wouldn't happen without a group of great React Native experts I'm happy to work with. \nFrom this place I would like to thank:\n- [Daniel Szczepanik](https://github.com/Drakeoon) for his commitment, effort and collaborative work on adjusting components,\n- [Olimpia Zurek](https://github.com/OlimpiaZurek) for her contribution and help,\n- [Aleksandra Desmurs-Linczewska](https://github.com/p-syche), [Jan Jaworek](https://github.com/jaworek) and [Kewin Wereszczyński](https://github.com/kwereszczynski) for checking and testing changes as well as providing valuable feedback,\n- [Bruno Castro](https://github.com/brunohkbx) for creating a long-awaited `Tooltip` component,\n- [Muhammad Hur Ali](https://github.com/hurali97) for various bug fixes and `List` subcomponents adjustments,\n\nand, <i>last but not least</i>, [Satya Sahoo](https://github.com/satya164) for his mentoring during the process.\n","type":"md","dependencies":[]},
(function() {
  var React = require('react');
  var Content = require("/home/circleci/react-native-paper/docs/node_modules/component-docs/dist/templates/Content.js").default;

  var m = { exports: {} };
  var r = {
    "react": require("/home/circleci/react-native-paper/docs/node_modules/react/index.js"),
"@mdx-js/tag": require("/home/circleci/react-native-paper/docs/node_modules/@mdx-js/tag/dist/index.js"),
"./src/components/DynamicColorTheme.js": require("/home/circleci/react-native-paper/docs/pages/src/components/DynamicColorTheme.js")
  };

  (function(module, exports, require, __filename, __dirname) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.meta = void 0;

var React = _interopRequireWildcard(require("react"));

var _tag = require("@mdx-js/tag");

var _DynamicColorTheme = _interopRequireDefault(require("./src/components/DynamicColorTheme.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var meta = {
  title: "Theming"
};
exports.meta = meta;
var layoutProps = {
  meta: meta
};

var MDXContent = /*#__PURE__*/function (_React$Component) {
  _inherits(MDXContent, _React$Component);

  var _super = _createSuper(MDXContent);

  function MDXContent(props) {
    var _this;

    _classCallCheck(this, MDXContent);

    _this = _super.call(this, props);
    _this.layout = null;
    return _this;
  }

  _createClass(MDXContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          components = _this$props.components,
          props = _objectWithoutProperties(_this$props, ["components"]);

      return /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "wrapper",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h1",
        components: components
      }, "Theming"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Applying a theme to the whole app"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "To support custom themes, paper exports a ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Provider"), " component. You need to wrap your root component with the provider to be able to support themes:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "By default React Native Paper will apply the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://github.com/callstack/react-native-paper/blob/main/src/styles/themes/v3/LightTheme.tsx"
        }
      }, "Material You theme (MD3)"), " if no ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "theme"), " or ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "version"), " prop is passed to to the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Provider"), "."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Accessing theme properties"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Use the built-in ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "useTheme()"), " hook to get access to the theme's variables:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> useTheme <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">PaymentScreen</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token function\">useTheme</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n  <span class=\"token keyword\">return</span> <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">View</span></span> <span class=\"token attr-name\">style</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> backgroundColor<span class=\"token punctuation\">:</span> theme<span class=\"token punctuation\">.</span>colors<span class=\"token punctuation\">.</span>primary <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "You can also use the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "withTheme()"), " HOC exported from the library. If you wrap your component with the HOC, you'll receive the theme as a prop:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> withTheme <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">function</span> <span class=\"token function\">PaymentScreen</span><span class=\"token punctuation\">(</span><span class=\"token parameter\"><span class=\"token punctuation\">{</span> theme <span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">View</span></span> <span class=\"token attr-name\">style</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> backgroundColor<span class=\"token punctuation\">:</span> theme<span class=\"token punctuation\">.</span>colors<span class=\"token punctuation\">.</span>primary <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token function\">withTheme</span><span class=\"token punctuation\">(</span>PaymentScreen<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Theme properties"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "You can change the theme prop dynamically and all the components will automatically update to reflect the new theme."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "A theme usually contains the following properties:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "dark"), " (", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "boolean"), "): whether this is a dark theme or light theme.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "version"), ": specify which design system components should follow in the app"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, "3 - new Material You (MD3)"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, "2 - previous Material Design (MD2)"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "mode"), " (", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "'adaptive' | 'exact'"), "): color mode for dark theme (See ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "#dark-theme"
        }
      }, "Dark Theme"), ").")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "roundness"), " (", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "number"), "): roundness of common elements, such as buttons.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "colors"), " (", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "object"), "): various colors used throughout different elements."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "The primary key color is used to derive roles for key components across the UI, such as the FAB, prominent buttons, active states, as well as the tint of elevated surfaces.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "primary")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onPrimary")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "primaryContainer")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onPrimaryContainer"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "The secondary key color is used for less prominent components in the UI such as filter chips, while expanding the opportunity for color expression.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "secondary")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onSecondary")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "secondaryContainer")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onSecondaryContainer"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "The tertiary key color is used to derive the roles of contrasting accents that can be used to balance primary and secondary colors or bring heightened attention to an element."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "The tertiary color role is left for teams to use at their discretion and is intended to support broader color expression in products.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "tertiary")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onTertiary")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "tertiaryContainer")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onTertiaryContainer"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "The neutral key color is used to derive the roles of surface and background, as well as high emphasis text and icons.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "background")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onBackground")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "surface")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onSurface"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "The neutral variant key color is used to derive medium emphasis text and icons, surface variants, and component outlines.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "surfaceVariant")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onSurfaceVariant")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "outline"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "In addition to the accent and neutral key color, the color system includes a semantic color role for error")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "error")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onError")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "errorContainer")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onErrorContainer"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "Surfaces at elevation levels 0-5 are tinted via color overlays based on the primary color, such as app bars or menus. The addition of a grade from 0-5 introduces tonal variation to the surface baseline.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "elevation"), " (", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "object"), ")", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "level0"), " - transparent"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "level1"), " - 5% opacity"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "level2"), " - 8% opacity"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "level3"), " - 11% opacity"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "level4"), " - 12% opacity"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "level5"), " - 14% opacity")))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "Colors for disabled state")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "surfaceDisabled")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "onSurfaceDisabled"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "blockquote",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "blockquote"
      }, "These additional role mappings exist in a scheme and are mapped to components where needed.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "shadow")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "inverseOnSurface")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "inverseSurface")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "inversePrimary")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "backdrop")))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "fonts"), " (", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "object"), "): various fonts styling properties under the text variant key used in component."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "li",
        props: {
          "href": "%60object%60"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "a"
      }, "variant"), " e.g. ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "a"
      }, "labelMedium")), ":", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "fontFamily")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "letterSpacing")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "fontWeight")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "lineHeight")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "fontSize")))))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "animation"), " (", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "object"), ")"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components,
        parentName: "li"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "scale"), " - scale for all animations")))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "When creating a custom theme, you will need to provide all of these properties."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "If you don't use a custom theme, Paper will automatically turn animations on/off, depending on device settings."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Otherwise, your custom theme will need to handle it manually, using React Native's ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://reactnative.dev/docs/accessibilityinfo"
        }
      }, "AccessibilityInfo API"), "."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Extending the theme"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Keeping your own properties in the theme is fully supported by our library:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span>\n  MD3LightTheme <span class=\"token keyword\">as</span> DefaultTheme<span class=\"token punctuation\">,</span>\n  Provider <span class=\"token keyword\">as</span> PaperProvider<span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>DefaultTheme<span class=\"token punctuation\">,</span>\n  <span class=\"token comment\">// Specify custom property</span>\n  myOwnProperty<span class=\"token punctuation\">:</span> <span class=\"token boolean\">true</span><span class=\"token punctuation\">,</span>\n  <span class=\"token comment\">// Specify custom property in nested object</span>\n  colors<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    myOwnColor<span class=\"token punctuation\">:</span> <span class=\"token string\">'#BADA55'</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Creating dynamic theme colors"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Dynamic Color Themes allows for generating two color schemes lightScheme and darkScheme, based on the provided source color.\nCreated schemes are following the Material Design 3 color system and covering colors structure from the Paper theme. User may generate these schemes using the following tool:"), /*#__PURE__*/React.createElement(_DynamicColorTheme["default"], null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Passed source color into the util is translated into tones to automatically provide the range of tones that map to color roles. "), /*#__PURE__*/React.createElement("img", {
        "class": "medium",
        src: "screenshots/custom-colors.png"
      }), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, " ", /*#__PURE__*/React.createElement("i", null, "Source: ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://m3.material.io/styles/color/the-color-system/custom-colors"
        }
      }, "Material You Color System"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Using schemes:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Once we have copied the color schemes from the generated JSON above, we can use by passing it to the colors in ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "theme"), " object as below:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-jsx"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-jsx",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span>\n  MD3LightTheme <span class=\"token keyword\">as</span> DefaultTheme<span class=\"token punctuation\">,</span>\n  Provider <span class=\"token keyword\">as</span> PaperProvider<span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>DefaultTheme<span class=\"token punctuation\">,</span>\n  colors<span class=\"token punctuation\">:</span> yourGeneratedLightOrDarkScheme<span class=\"token punctuation\">,</span> <span class=\"token comment\">// Copy it from the color codes scheme and then use it here</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Adapting React Navigation theme"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "The ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "adaptNavigationTheme"), " function takes an existing React Navigation theme and returns a React Navigation theme using the colors from Material Design 3. This theme can be passed to ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "NavigationContainer"), " so that React Navigation's UI elements have the same color scheme as Paper."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-ts"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-ts",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token function\">adaptNavigationTheme</span><span class=\"token punctuation\">(</span>themes<span class=\"token punctuation\">)</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, /*#__PURE__*/React.createElement("b", null, "Parameters:")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "table",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "thead",
        components: components,
        parentName: "table"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "tr",
        components: components,
        parentName: "thead"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "th",
        components: components,
        parentName: "tr",
        props: {
          "align": null
        }
      }, "NAME"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "th",
        components: components,
        parentName: "tr",
        props: {
          "align": null
        }
      }, "TYPE"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "tbody",
        components: components,
        parentName: "table"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "tr",
        components: components,
        parentName: "tbody"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "td",
        components: components,
        parentName: "tr",
        props: {
          "align": null
        }
      }, "themes"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "td",
        components: components,
        parentName: "tr",
        props: {
          "align": null
        }
      }, "object")))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Valid ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "themes"), " keys are:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "reactNavigationLight"), " () - React Navigation compliant light theme."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "reactNavigationDark"), " () - React Navigation compliant dark theme."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "materialLight"), " () - React Native Paper compliant light theme."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "materialDark"), " () - React Native Paper compliant dark theme.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-ts"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-ts",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token comment\">// App.tsx</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> NavigationContainer<span class=\"token punctuation\">,</span> DefaultTheme <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'@react-navigation/native'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> createStackNavigator <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'@react-navigation/stack'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Provider<span class=\"token punctuation\">,</span> MD3LightTheme<span class=\"token punctuation\">,</span> adaptNavigationTheme <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">const</span> Stack <span class=\"token operator\">=</span> <span class=\"token function\">createStackNavigator</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span> LightTheme <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">adaptNavigationTheme</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span> reactNavigationLight<span class=\"token punctuation\">:</span> DefaultTheme <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">App</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token operator\">&#x3C;</span>Provider theme<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>MD3LightTheme<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&#x3C;</span>NavigationContainer theme<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>LightTheme<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n        <span class=\"token operator\">&#x3C;</span>Stack<span class=\"token punctuation\">.</span>Navigator initialRouteName<span class=\"token operator\">=</span><span class=\"token string\">\"Home\"</span><span class=\"token operator\">></span>\n          <span class=\"token operator\">&#x3C;</span>Stack<span class=\"token punctuation\">.</span>Screen name<span class=\"token operator\">=</span><span class=\"token string\">\"Home\"</span> component<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>HomeScreen<span class=\"token punctuation\">}</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n          <span class=\"token operator\">&#x3C;</span>Stack<span class=\"token punctuation\">.</span>Screen name<span class=\"token operator\">=</span><span class=\"token string\">\"Details\"</span> component<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>DetailsScreen<span class=\"token punctuation\">}</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n        <span class=\"token operator\">&#x3C;</span><span class=\"token operator\">/</span>Stack<span class=\"token punctuation\">.</span>Navigator<span class=\"token operator\">></span>\n      <span class=\"token operator\">&#x3C;</span><span class=\"token operator\">/</span>NavigationContainer<span class=\"token operator\">></span>\n    <span class=\"token operator\">&#x3C;</span><span class=\"token operator\">/</span>Provider<span class=\"token operator\">></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "TypeScript"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "By default, TypeScript works well whenever you change the value of the built-in theme's properties. It gets more complicated when you want to extend the theme's properties or change their types. In order to fully support TypeScript, you will need to follow the guide that fits your use-case most accurately:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "There are two supported ways of overriding the theme:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ol",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ol"
      }, /*#__PURE__*/React.createElement("b", null, "Simple built-in theme overrides"), " - when you only customize the values and the whole theme schema remains the same"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ol"
      }, /*#__PURE__*/React.createElement("b", null, "Advanced theme overrides"), " - when you ", /*#__PURE__*/React.createElement("i", null, "add new properties"), " or ", /*#__PURE__*/React.createElement("i", null, "change the built-in schema shape"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "\uD83D\uDCCD", /*#__PURE__*/React.createElement("b", null, "Warning"), ": TypeScript support for withTheme is currently limited to ", /*#__PURE__*/React.createElement("b", null, "Material You (MD3)"), " theme only.\n", /*#__PURE__*/React.createElement("i", null, "We are planning to provide a better support of handling custom theme overrides in future releases.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Simple built-in theme overrides"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "You can provide a ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "theme"), " prop with a theme object with the same properties as the default theme:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> MD3LightTheme<span class=\"token punctuation\">,</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">,</span> <span class=\"token comment\">// or MD3DarkTheme</span>\n  roundness<span class=\"token punctuation\">:</span> <span class=\"token number\">2</span><span class=\"token punctuation\">,</span>\n  colors<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">.</span>colors<span class=\"token punctuation\">,</span>\n    primary<span class=\"token punctuation\">:</span> <span class=\"token string\">'#3498db'</span><span class=\"token punctuation\">,</span>\n    secondary<span class=\"token punctuation\">:</span> <span class=\"token string\">'#f1c40f'</span><span class=\"token punctuation\">,</span>\n    tertiary<span class=\"token punctuation\">:</span> <span class=\"token string\">'#a1b2c3'</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Advanced theme overrides"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "If you need to modify the built-in theme schema by adding a new property or changing its type, you need to follow these steps:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ol",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ol"
      }, "Pass your theme overrides to the Provider component")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-ts"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-ts",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> MD3LightTheme<span class=\"token punctuation\">,</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">,</span>\n\n  <span class=\"token comment\">// Specify a custom property</span>\n  custom<span class=\"token punctuation\">:</span> <span class=\"token string\">'property'</span><span class=\"token punctuation\">,</span>\n\n  <span class=\"token comment\">// Specify a custom property in nested object</span>\n  colors<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">.</span>colors<span class=\"token punctuation\">,</span>\n    brandPrimary<span class=\"token punctuation\">:</span> <span class=\"token string\">'#fefefe'</span><span class=\"token punctuation\">,</span>\n    brandSecondary<span class=\"token punctuation\">:</span> <span class=\"token string\">'red'</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token operator\">&#x3C;</span>PaperProvider theme<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&#x3C;</span>App <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n    <span class=\"token operator\">&#x3C;</span><span class=\"token operator\">/</span>PaperProvider<span class=\"token operator\">></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ol",
        components: components,
        props: {
          "start": 2
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ol"
      }, "Create a typed ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "useAppTheme()"), " hook in your project")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-ts"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-ts",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span>\n  MD3LightTheme<span class=\"token punctuation\">,</span>\n  Provider <span class=\"token keyword\">as</span> PaperProvider<span class=\"token punctuation\">,</span>\n  useTheme<span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">,</span>\n\n  <span class=\"token comment\">// Specify a custom property</span>\n  custom<span class=\"token punctuation\">:</span> <span class=\"token string\">'property'</span><span class=\"token punctuation\">,</span>\n\n  <span class=\"token comment\">// Specify a custom property in nested object</span>\n  colors<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">.</span>colors<span class=\"token punctuation\">,</span>\n    brandPrimary<span class=\"token punctuation\">:</span> <span class=\"token string\">'#fefefe'</span><span class=\"token punctuation\">,</span>\n    brandSecondary<span class=\"token punctuation\">:</span> <span class=\"token string\">'red'</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">type</span> AppTheme <span class=\"token operator\">=</span> <span class=\"token keyword\">typeof</span> theme<span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">const</span> <span class=\"token function-variable function\">useAppTheme</span> <span class=\"token operator\">=</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> useTheme<span class=\"token operator\">&#x3C;</span>AppTheme<span class=\"token operator\">></span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token operator\">&#x3C;</span>PaperProvider theme<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&#x3C;</span>App <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n    <span class=\"token operator\">&#x3C;</span><span class=\"token operator\">/</span>PaperProvider<span class=\"token operator\">></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ol",
        components: components,
        props: {
          "start": 3
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ol"
      }, "Start using the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "useAppTheme()"), " hook across your components in the whole app")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-ts"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-ts",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> useAppTheme <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'./App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">HomeScreen</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span>\n    colors<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span> brandPrimary <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">useAppTheme</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n  <span class=\"token keyword\">return</span> <span class=\"token operator\">&#x3C;</span>View style<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> backgroundColor<span class=\"token punctuation\">:</span> brandPrimary <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span><span class=\"token operator\">></span><span class=\"token operator\">...</span><span class=\"token operator\">&#x3C;</span><span class=\"token operator\">/</span>View<span class=\"token operator\">></span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Material Design 2"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Using Material Design 2 is ", /*#__PURE__*/React.createElement("b", null, "fully supported in React Native Paper v5.x"), "."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Simple setup"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "In order to use the Material Design 2 theme you can just pass ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "{ version: 2 }"), " to the PaperProvider theme prop:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> version<span class=\"token punctuation\">:</span> <span class=\"token number\">2</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Specifying ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "{ version: 2 }"), " tells React Native Paper to use the built in Material Design 2 theme, so you don't have to fully extend it on your own."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Advanced setup"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "As with any theme, you can also specify your custom properties within the Material Design 2 theme:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> MD2LightTheme<span class=\"token punctuation\">,</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token operator\">...</span>MD2LightTheme<span class=\"token punctuation\">,</span>\n\n    <span class=\"token comment\">// Specify a custom property</span>\n    custom<span class=\"token punctuation\">:</span> <span class=\"token string\">'property'</span><span class=\"token punctuation\">,</span>\n\n    <span class=\"token comment\">// Specify a custom nested property</span>\n    colors<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      <span class=\"token operator\">...</span>MD2LightTheme<span class=\"token punctuation\">.</span>colors<span class=\"token punctuation\">,</span>\n      primary<span class=\"token punctuation\">:</span> <span class=\"token string\">'#fefefe'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Typescript"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Due to the amount of changes in the theme's schema shape it falls into the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "#advanced-theme-overrides"
        }
      }, "Advanced theme overrides"), " category. The steps are identical as with any advanced theme, just make sure to extend the built-in ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "MD2LightTheme"), " or ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "MD2DarkTheme"), " instead of ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "MD3LightTheme"), " or ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "MD3DarkTheme"), "."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "The final example for Material Design 2 would look like this:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-ts"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-ts",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span>\n  MD2LightTheme<span class=\"token punctuation\">,</span>\n  Provider <span class=\"token keyword\">as</span> PaperProvider<span class=\"token punctuation\">,</span>\n  useTheme<span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token comment\">// Extend Material Design 2 theme</span>\n\n  <span class=\"token operator\">...</span>MD2LightTheme<span class=\"token punctuation\">,</span> <span class=\"token comment\">// or MD2DarkTheme</span>\n\n  <span class=\"token comment\">// Specify a custom property</span>\n  myOwnProperty<span class=\"token punctuation\">:</span> <span class=\"token boolean\">true</span><span class=\"token punctuation\">,</span>\n\n  <span class=\"token comment\">// Specify a custom nested property</span>\n  colors<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token operator\">...</span>MD2LightTheme<span class=\"token punctuation\">.</span>colors<span class=\"token punctuation\">,</span>\n    myOwnColor<span class=\"token punctuation\">:</span> <span class=\"token string\">'#BADA55'</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">type</span> AppTheme <span class=\"token operator\">=</span> <span class=\"token keyword\">typeof</span> theme<span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">const</span> <span class=\"token function-variable function\">useAppTheme</span> <span class=\"token operator\">=</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> useTheme<span class=\"token operator\">&#x3C;</span>AppTheme<span class=\"token operator\">></span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token operator\">&#x3C;</span>PaperProvider theme<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&#x3C;</span>App <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n    <span class=\"token operator\">&#x3C;</span><span class=\"token operator\">/</span>PaperProvider<span class=\"token operator\">></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n\n<span class=\"token comment\">// App.tsx</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">App</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">const</span> <span class=\"token punctuation\">{</span> theme <span class=\"token punctuation\">}</span> <span class=\"token operator\">=</span> <span class=\"token function\">useAppTheme</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n\n  <span class=\"token keyword\">return</span> <span class=\"token operator\">&#x3C;</span>View style<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> backgroundColor<span class=\"token punctuation\">:</span> theme<span class=\"token punctuation\">.</span>colors<span class=\"token punctuation\">.</span>primary <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Migrating to Material You"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "If you are migrating from Material Design 2 (4.x and lower) to Material You (5.x), please refer to our ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://callstack.github.io/react-native-paper/introducing-v5-with-material-you.html"
        }
      }, "Migration Guide")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Applying a theme to a paper component"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "If you want to change the theme for a certain component from the library, you can directly pass the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "theme"), " prop to the component. The theme passed as the prop is merged with the theme from the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Provider"), ":"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Button <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">ButtonExample</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Button</span></span> <span class=\"token attr-name\">raised</span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> roundness<span class=\"token punctuation\">:</span> <span class=\"token number\">3</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      Press me\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">Button</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Customizing all instances of a component"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Sometimes you want to style a component in a different way everywhere, but don't want to change the properties in the theme, so that other components are not affected. For example, say you want to change the font for all your buttons, but don't want to change ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "theme.fonts.labelLarge"), " because it affects other components."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "We don't have an API to do this, because you can already do it with components:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Button <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">FancyButton</span><span class=\"token punctuation\">(</span><span class=\"token parameter\">props</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token operator\">&#x3C;</span>Button\n      theme<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> typescale<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span> labelLarge<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span> letterSpacing<span class=\"token punctuation\">:</span> <span class=\"token number\">1</span> <span class=\"token punctuation\">}</span> <span class=\"token punctuation\">}</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span>\n      <span class=\"token punctuation\">{</span><span class=\"token operator\">...</span>props<span class=\"token punctuation\">}</span>\n    <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Now you can use your ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "FancyButton"), " component everywhere instead of using ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Button"), " from Paper."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Dark Theme"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Since 3.0 we adapt dark theme to follow ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://material.io/design/color/dark-theme.html"
        }
      }, "Material design guidelines"), ". ", /*#__PURE__*/React.createElement("br", null), "\nIn contrast to light theme, dark theme by default uses ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "surface"), " colour instead of ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "primary"), " on large components like ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "AppBar"), " or ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "BottomNavigation"), ".", /*#__PURE__*/React.createElement("br", null), "\nThe dark theme adds a white overlay with opacity depending on elevation of surfaces. It uses it for the better accentuation of surface elevation. Using only shadow is highly imperceptible on dark surfaces."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "We are aware that users often use dark theme in their own ways and may not want to use the default dark theme features from the guidelines.", /*#__PURE__*/React.createElement("br", null), "\nThat's why if you are using dark theme you can switch between two dark theme ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "mode"), "s:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "exact"), " where everything is like it was before. ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "Appbar"), " and ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "BottomNavigation"), " will still use primary colour by default.", /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "adaptive"), " where we follow ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "li",
        props: {
          "href": "https://material.io/design/color/dark-theme.html"
        }
      }, "Material design guidelines"), ", the surface will use white overlay with opacity to show elevation, ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "Appbar"), " and ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "BottomNavigation"), " will use surface colour as a background.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "If you don't use a custom theme, Paper will automatically change between the default theme and the default dark theme, depending on device settings."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Otherwise, your custom theme will need to handle it manually, using React Native's ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://reactnative.dev/docs/appearance"
        }
      }, "Appearance API"), "."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Gotchas"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "The ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Provider"), " exposes the theme to the components via ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://reactjs.org/docs/context.html"
        }
      }, "React's context API"), ", which means that the component must be in the same tree as the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Provider"), ". Some React Native components will render a different tree such as a ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Modal"), ", in which case the components inside the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Modal"), " won't be able to access the theme. The work around is to get the theme using the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "withTheme"), " HOC and pass it down to the components as props, or expose it again with the exported ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "ThemeProvider"), " component."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "The ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Modal"), " component from the library already handles this edge case, so you won't need to do anything."));
    }
  }]);

  return MDXContent;
}(React.Component);

exports["default"] = MDXContent;
MDXContent.isMDXComponent = true;;
  }(
    m,
    m.exports,
    function(name) {
      return r[name];
    },
    "/home/circleci/react-native-paper/docs/pages/2.theming.mdx",
    "/home/circleci/react-native-paper/docs/pages"
  ));

  var meta = m.exports.meta || {};

  return {
    title: meta.title || "Theming",
    link: meta.link || "theming",
    description: meta.description,
    type: "custom",
    data: function MDXContent(props) {
      return React.createElement(
        Content,
        { logo: 'images/sidebar-logo.svg' },
        React.createElement(m.exports.default, props)
      );
    },
  };
}()),
(function() {
  var React = require('react');
  var Content = require("/home/circleci/react-native-paper/docs/node_modules/component-docs/dist/templates/Content.js").default;

  var m = { exports: {} };
  var r = {
    "react": require("/home/circleci/react-native-paper/docs/node_modules/react/index.js"),
"@mdx-js/tag": require("/home/circleci/react-native-paper/docs/node_modules/@mdx-js/tag/dist/index.js"),
"./src/components/IconsList.js": require("/home/circleci/react-native-paper/docs/pages/src/components/IconsList.js")
  };

  (function(module, exports, require, __filename, __dirname) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.meta = void 0;

var React = _interopRequireWildcard(require("react"));

var _tag = require("@mdx-js/tag");

var _IconsList = _interopRequireDefault(require("./src/components/IconsList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var meta = {
  title: "Icons"
};
exports.meta = meta;
var layoutProps = {
  meta: meta
};

var MDXContent = /*#__PURE__*/function (_React$Component) {
  _inherits(MDXContent, _React$Component);

  var _super = _createSuper(MDXContent);

  function MDXContent(props) {
    var _this;

    _classCallCheck(this, MDXContent);

    _this = _super.call(this, props);
    _this.layout = null;
    return _this;
  }

  _createClass(MDXContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          components = _this$props.components,
          props = _objectWithoutProperties(_this$props, ["components"]);

      return /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "wrapper",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h1",
        components: components
      }, "Icons"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Configuring icons"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Many of the components require the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://github.com/oblador/react-native-vector-icons"
        }
      }, "react-native-vector-icons"), " library to render correctly. If you're using Expo, you don't need to do anything extra, but if it's a vanilla React Native project, you need link the library as described in the getting started guide."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "If you opted out of vector icons support using ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://github.com/satya164/babel-plugin-optional-require"
        }
      }, "babel-plugin-optional-require"), ", you won't be able to use icon names for the icon prop. Some components may not look correct without vector icons and might need extra configuration."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Using the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "h2"
      }, "icon"), " prop"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Many components such as ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Button"), " accept an ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "icon"), " prop which is used to display an icon. The ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "icon"), " prop supports the following types of values:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "1. An icon name"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "You can pass the name of an icon from ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://materialdesignicons.com"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "a"
      }, "MaterialCommunityIcons")), ". This will use the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "https://github.com/oblador/react-native-vector-icons"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "a"
      }, "react-native-vector-icons")), " library to display the icon."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Example:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Button</span></span> <span class=\"token attr-name\">icon</span><span class=\"token attr-value\"><span class=\"token punctuation\">=</span><span class=\"token punctuation\">\"</span>camera<span class=\"token punctuation\">\"</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n  Press me\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">Button</span></span><span class=\"token punctuation\">></span></span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement("details", null, /*#__PURE__*/React.createElement("summary", null, "See the list of supported icons"), /*#__PURE__*/React.createElement(_IconsList["default"], null)), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "2. An image source"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "You can pass an image source, such as an object of shape ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "{ uri: 'https://path.to' }"), " or a local image: ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "require('../path/to/image.png')"), " to use as an icon. The image might be rendered with a different color than the one provided depending on the component. If don't want this behavior, see the next example to pass an ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Image"), " element."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Remote image:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Button</span></span> <span class=\"token attr-name\">icon</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> uri<span class=\"token punctuation\">:</span> <span class=\"token string\">'https://avatars0.githubusercontent.com/u/17571969?v=3&#x26;s=400'</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n  Press me\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">Button</span></span><span class=\"token punctuation\">></span></span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Local image:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Button</span></span> <span class=\"token attr-name\">icon</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token function\">require</span><span class=\"token punctuation\">(</span><span class=\"token string\">'../assets/chameleon.jpg'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n  Press me\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">Button</span></span><span class=\"token punctuation\">></span></span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "3. A render function"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "You can pass a function which returns a react element to be used an icon. The function receives an object with ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "size"), " and ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "color"), " properties as its arguments. The element is used as is without any modification. However, it might get clipped if the provided element's size is bigger than what the component renders. It's up to you to make sure that the size of the element is correct."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Example:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Button</span></span>\n  <span class=\"token attr-name\">icon</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">(</span><span class=\"token parameter\"><span class=\"token punctuation\">{</span> size<span class=\"token punctuation\">,</span> color <span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Image</span></span>\n      <span class=\"token attr-name\">source</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token function\">require</span><span class=\"token punctuation\">(</span><span class=\"token string\">'../assets/chameleon.jpg'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">}</span></span>\n      <span class=\"token attr-name\">style</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> width<span class=\"token punctuation\">:</span> size<span class=\"token punctuation\">,</span> height<span class=\"token punctuation\">:</span> size<span class=\"token punctuation\">,</span> tintColor<span class=\"token punctuation\">:</span> color <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span>\n    <span class=\"token punctuation\">/></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">}</span></span>\n<span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n  Press me\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">Button</span></span><span class=\"token punctuation\">></span></span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "4. Use custom icons"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "If you want to use icons other than ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "MaterialCommunityIcons"), " you need to import the icons and pass it to the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "settings"), " prop within ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "PaperProvider"), "."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Example:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> AwesomeIcon <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-vector-icons/FontAwesome'</span><span class=\"token punctuation\">;</span>\n<span class=\"token comment\">// ...</span>\n\n      <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span>\n        <span class=\"token attr-name\">settings</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span>\n          <span class=\"token function-variable function\">icon</span><span class=\"token punctuation\">:</span> <span class=\"token parameter\">props</span> <span class=\"token operator\">=></span> <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">AwesomeIcon</span></span> <span class=\"token spread\"><span class=\"token punctuation\">{</span><span class=\"token punctuation\">...</span><span class=\"token attr-value\">props</span><span class=\"token punctuation\">}</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token punctuation\">,</span>\n        <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span>\n        <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>state<span class=\"token punctuation\">.</span>theme<span class=\"token punctuation\">}</span></span>\n      <span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n        // ...\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "RTL support"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "If you want your icon to behave properly in a RTL environment, you can pass an object to the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "icon"), " prop with shape: ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "{ source: { uri: 'https://path.to' }, direction : 'rtl' }"), ". ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "source"), " can be any of the values that the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "icon"), " prop accepts in ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "#1.-an-icon-name"
        }
      }, "option 1"), " and ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "a",
        components: components,
        parentName: "p",
        props: {
          "href": "#2.-an-image-source"
        }
      }, "option 2"), ". For ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "direction"), " you have a few options:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ol",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ol"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "auto"), " - uses the device language to determine if icon should be displayed from rtl. Uses the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "I18nManager"), " module to get this info."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ol"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "rtl"), " - flips the icon so that it is rtl, this is regardless of the device language."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ol"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "ltr"), " - displays from ltr, even if in an rtl environment.")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Example for using an image source:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Button</span></span> <span class=\"token attr-name\">icon</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> source<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span> uri<span class=\"token punctuation\">:</span> <span class=\"token string\">'https://avatars0.githubusercontent.com/u/17571969?v=3&#x26;s=400'</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span> direction<span class=\"token punctuation\">:</span> <span class=\"token string\">'rtl'</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n  Press me\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">Button</span></span><span class=\"token punctuation\">></span></span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Example for using an icon name:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Button</span></span> <span class=\"token attr-name\">icon</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> source<span class=\"token punctuation\">:</span> <span class=\"token string\">\"add-a-photo\"</span><span class=\"token punctuation\">,</span> direction<span class=\"token punctuation\">:</span> <span class=\"token string\">'rtl'</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n  Press me\n</span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">Button</span></span><span class=\"token punctuation\">></span></span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "You can also use a render function. Along with ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "size"), " and ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "color"), ", you have access to ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "direction"), " which will either be ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "'rtl'"), " or ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "'ltr'"), ". You can then decide how to render your icon component accordingly."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Example of using a render function:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">Button</span></span>\n  <span class=\"token attr-name\">icon</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">(</span><span class=\"token parameter\"><span class=\"token punctuation\">{</span> size<span class=\"token punctuation\">,</span> color<span class=\"token punctuation\">,</span> direction <span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=></span> <span class=\"token punctuation\">(</span>\n    <span class=\"token operator\">&#x3C;</span>Image\n      source<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token function\">require</span><span class=\"token punctuation\">(</span><span class=\"token string\">'../assets/chameleon.jpg'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">}</span>\n      style<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">[</span>\n        <span class=\"token punctuation\">{</span>\n          transform<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">[</span><span class=\"token punctuation\">{</span> scaleX<span class=\"token punctuation\">:</span> direction <span class=\"token operator\">===</span> <span class=\"token string\">'rtl'</span> <span class=\"token operator\">?</span> <span class=\"token operator\">-</span><span class=\"token number\">1</span> <span class=\"token punctuation\">:</span> <span class=\"token number\">1</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">,</span>\n        <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n        <span class=\"token punctuation\">{</span>\n          width<span class=\"token punctuation\">:</span> size<span class=\"token punctuation\">,</span>\n          height<span class=\"token punctuation\">:</span> size<span class=\"token punctuation\">,</span>\n          tintColor<span class=\"token punctuation\">:</span> color\n        <span class=\"token punctuation\">}</span>\n      <span class=\"token punctuation\">]</span><span class=\"token punctuation\">}</span></span>\n    <span class=\"token punctuation\">/></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">}</span>\n<span class=\"token operator\">></span>\n  Press me\n<span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">Button</span></span><span class=\"token punctuation\">></span></span>\n"
          }
        }
      })));
    }
  }]);

  return MDXContent;
}(React.Component);

exports["default"] = MDXContent;
MDXContent.isMDXComponent = true;;
  }(
    m,
    m.exports,
    function(name) {
      return r[name];
    },
    "/home/circleci/react-native-paper/docs/pages/3.icons.mdx",
    "/home/circleci/react-native-paper/docs/pages"
  ));

  var meta = m.exports.meta || {};

  return {
    title: meta.title || "Icons",
    link: meta.link || "icons",
    description: meta.description,
    type: "custom",
    data: function MDXContent(props) {
      return React.createElement(
        Content,
        { logo: 'images/sidebar-logo.svg' },
        React.createElement(m.exports.default, props)
      );
    },
  };
}()),
(function() {
  var React = require('react');
  var Content = require("/home/circleci/react-native-paper/docs/node_modules/component-docs/dist/templates/Content.js").default;

  var m = { exports: {} };
  var r = {
    "react": require("/home/circleci/react-native-paper/docs/node_modules/react/index.js"),
"@mdx-js/tag": require("/home/circleci/react-native-paper/docs/node_modules/@mdx-js/tag/dist/index.js")
  };

  (function(module, exports, require, __filename, __dirname) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.meta = void 0;

var React = _interopRequireWildcard(require("react"));

var _tag = require("@mdx-js/tag");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var meta = {
  title: "Fonts"
};
exports.meta = meta;
var layoutProps = {
  meta: meta
};

var MDXContent = /*#__PURE__*/function (_React$Component) {
  _inherits(MDXContent, _React$Component);

  var _super = _createSuper(MDXContent);

  function MDXContent(props) {
    var _this;

    _classCallCheck(this, MDXContent);

    _this = _super.call(this, props);
    _this.layout = null;
    return _this;
  }

  _createClass(MDXContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          components = _this$props.components,
          props = _objectWithoutProperties(_this$props, ["components"]);

      return /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "wrapper",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h1",
        components: components
      }, "Fonts"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Installing custom fonts"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "The easiest way to install custom fonts to your RN project is do as follows:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "  ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "1."), " Define path to assets directory with fonts in project:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "  ", /*#__PURE__*/React.createElement("i", null, "Example:")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "  module<span class=\"token punctuation\">.</span>exports <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token operator\">...</span>\n    assets<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">[</span>\n      <span class=\"token string\">'./assets/fonts'</span>\n    <span class=\"token punctuation\">]</span><span class=\"token punctuation\">,</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "  ", /*#__PURE__*/React.createElement("i", null, "Note:"), " ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "fonts"), " is a folder with ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, ".ttf"), " files"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "  ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "2."), " Place your font files in your assets directory."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "  ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "3."), " Link font files, using the following command in the terminal:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, "React Native  ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, ">= 0.69"), ":"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        parentName: "li",
        props: {
          "className": "language-sh"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-sh"
        }
      }, "npx react-native-asset\n"))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components,
        parentName: "li"
      }, "React Native ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "< 0.69"), ":"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        parentName: "li",
        props: {
          "className": "language-sh"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-sh"
        }
      }, "npx react-native link\n")))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "  ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "4."), " Restart your project to refresh changes."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "Now, you are able to use ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "fontFamily"), " from font files."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h2",
        components: components
      }, "Configuring fonts in ThemeProvider"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Material Design 2"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h4",
        components: components
      }, "Using ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "h4"
      }, "configureFonts"), " helper"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "To create a custom font, prepare a ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "fontConfig"), " object where fonts are divided by platforms. After that, you have to:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, "pass the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "fontConfig"), " into ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "configureFonts"), " params object property called ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "config"), " "), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, "set the params object property ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "isV3"), " to ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "false"), ". ")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "The ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "fontConfig"), " object accepts ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "ios"), ", ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "android"), ", ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "macos"), ", ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "windows"), ", ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "web"), ", and ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "native"), ". Use these to override fonts on particular platforms."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, /*#__PURE__*/React.createElement("i", null, "Note:"), "At a minimum, you need to explicitly pass fonts for ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "android"), ", ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "ios"), ", and ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "web"), "."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> configureFonts<span class=\"token punctuation\">,</span> MD2LightTHeme<span class=\"token punctuation\">,</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> fontConfig <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  web<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    regular<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    medium<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-medium'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    light<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-light'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    thin<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-thin'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n  ios<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    regular<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    medium<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-medium'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    light<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-light'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    thin<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-thin'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n  android<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    regular<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    medium<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-medium'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    light<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-light'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    thin<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n      fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif-thin'</span><span class=\"token punctuation\">,</span>\n      fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'normal'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>MD2LightTheme<span class=\"token punctuation\">,</span>\n  fonts<span class=\"token punctuation\">:</span> <span class=\"token function\">configureFonts</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>config<span class=\"token punctuation\">:</span> fontConfig<span class=\"token punctuation\">,</span> isV3<span class=\"token punctuation\">:</span> <span class=\"token boolean\">false</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h3",
        components: components
      }, "Material Design 3"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h4",
        components: components
      }, "Variants"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, "In the latest version fonts in theme are structured based on the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "variant"), " keys e.g. ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "displayLarge"), " or ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "bodyMedium"), " which are then used in ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Text"), "'s component throughout the whole library."), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, /*#__PURE__*/React.createElement("i", null, "Note:"), " The default ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "fontFamily"), " is different per particular platfrom:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "Platform<span class=\"token punctuation\">.</span><span class=\"token function\">select</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>\n  web<span class=\"token punctuation\">:</span> <span class=\"token string\">'Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif'</span><span class=\"token punctuation\">,</span>\n  ios<span class=\"token punctuation\">:</span> <span class=\"token string\">'System'</span><span class=\"token punctuation\">,</span>\n  <span class=\"token keyword\">default</span><span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif'</span><span class=\"token punctuation\">,</span> <span class=\"token comment\">// and 'sans-serif-medium' for `fontWeight:\"500\"`</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">,</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h4",
        components: components,
        parentName: "li"
      }, "Display"))), /*#__PURE__*/React.createElement("div", {
        style: {
          flexDirection: 'row',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"displaySmall\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">36</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">44</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"displayMedium\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">45</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">52</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"displayLarge\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">57</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">64</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h4",
        components: components,
        parentName: "li"
      }, "Headline"))), /*#__PURE__*/React.createElement("div", {
        style: {
          flexDirection: 'row',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"headlineSmall\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">24</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">32</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"headlineMedium\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">28</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">36</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"headlineLarge\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">32</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">40</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h4",
        components: components,
        parentName: "li"
      }, "Title"))), /*#__PURE__*/React.createElement("div", {
        style: {
          flexDirection: 'row',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"titleSmall\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">14</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"500\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.1</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">20</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"titleMedium\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">16</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"500\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.15</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">24</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"titleLarge\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">22</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">28</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h4",
        components: components,
        parentName: "li"
      }, "Label"))), /*#__PURE__*/React.createElement("div", {
        style: {
          flexDirection: 'row',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"labelSmall\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">11</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"500\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.5</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">16</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"labelMedium\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">12</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"500\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.5</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">16</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"labelLarge\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">14</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"500\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.1</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">20</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h4",
        components: components,
        parentName: "li"
      }, "Body"))), /*#__PURE__*/React.createElement("div", {
        style: {
          flexDirection: 'row',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"bodySmall\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">12</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.4</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">16</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          borderColor: 'darkgray',
          borderRightWidth: '1px',
          borderStyle: 'dotted'
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"bodyMedium\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">14</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.25</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">20</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"bodyLarge\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontSize\"</span><span class=\"token operator\">:</span> <span class=\"token number\">16</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0.15</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"lineHeight\"</span><span class=\"token operator\">:</span> <span class=\"token number\">24</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })))), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "p",
        components: components
      }, /*#__PURE__*/React.createElement("i", null, "Note:"), " If any component uses Paper's ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "Text"), " component, without specified ", /*#__PURE__*/React.createElement("b", null, "variant"), ", then ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "p"
      }, "default"), " variant is applied:"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-json"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-json",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token property\">\"default\"</span><span class=\"token operator\">:</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token property\">\"fontFamily\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"FontFamily\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"fontWeight\"</span><span class=\"token operator\">:</span> <span class=\"token string\">\"400\"</span><span class=\"token punctuation\">,</span>\n  <span class=\"token property\">\"letterSpacing\"</span><span class=\"token operator\">:</span> <span class=\"token number\">0</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "h4",
        components: components
      }, "Using ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "h4"
      }, "configureFonts"), " helper"), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, "If there is a need to create a custom font variant, prepare its config object including required all fonts properties. After that, defined ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "fontConfig"), " has to be passed under the ", /*#__PURE__*/React.createElement("b", null, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "variant")), " name as ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "config"), " into the params object:")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> configureFonts<span class=\"token punctuation\">,</span> MD3LightTheme<span class=\"token punctuation\">,</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> fontConfig <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  customVariant<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    fontFamily<span class=\"token punctuation\">:</span> Platform<span class=\"token punctuation\">.</span><span class=\"token function\">select</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>\n      web<span class=\"token punctuation\">:</span> <span class=\"token string\">'Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif'</span><span class=\"token punctuation\">,</span>\n      ios<span class=\"token punctuation\">:</span> <span class=\"token string\">'System'</span><span class=\"token punctuation\">,</span>\n      <span class=\"token keyword\">default</span><span class=\"token punctuation\">:</span> <span class=\"token string\">'sans-serif'</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">,</span>\n    fontWeight<span class=\"token punctuation\">:</span> <span class=\"token string\">'400'</span><span class=\"token punctuation\">,</span>\n    letterSpacing<span class=\"token punctuation\">:</span> <span class=\"token number\">0.5</span><span class=\"token punctuation\">,</span>\n    lineHeight<span class=\"token punctuation\">:</span> <span class=\"token number\">22</span><span class=\"token punctuation\">,</span>\n    fontSize<span class=\"token punctuation\">:</span> <span class=\"token number\">20</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">,</span>\n  fonts<span class=\"token punctuation\">:</span> <span class=\"token function\">configureFonts</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>config<span class=\"token punctuation\">:</span> fontConfig<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, "In order to override one of the available ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "variant"), "'s font properties, pass the modified ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "fontConfig"), " under specific ", /*#__PURE__*/React.createElement("b", null, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "variant")), " name as ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "config"), " into the params object:")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> configureFonts<span class=\"token punctuation\">,</span> MD3LightTheme<span class=\"token punctuation\">,</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> fontConfig <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  bodyLarge<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n    letterSpacing<span class=\"token punctuation\">:</span> <span class=\"token number\">0.5</span><span class=\"token punctuation\">,</span>\n    lineHeight<span class=\"token punctuation\">:</span> <span class=\"token number\">22</span><span class=\"token punctuation\">,</span>\n    fontSize<span class=\"token punctuation\">:</span> <span class=\"token number\">20</span><span class=\"token punctuation\">,</span>\n  <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">,</span>\n  fonts<span class=\"token punctuation\">:</span> <span class=\"token function\">configureFonts</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>config<span class=\"token punctuation\">:</span> fontConfig<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "ul",
        components: components
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "li",
        components: components,
        parentName: "ul"
      }, "However, if you just want to override any font property e.g. ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "fontFamily"), " or ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "letterSpacing"), " for ", /*#__PURE__*/React.createElement("b", null, "all"), " variants, you can pass the ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "fontConfig"), " as a ", /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "inlineCode",
        components: components,
        parentName: "li"
      }, "config"), " into the params object ", /*#__PURE__*/React.createElement("b", null, "without"), " specifying variant name:")), /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "pre",
        components: components,
        props: {
          "className": "language-js"
        }
      }, /*#__PURE__*/React.createElement(_tag.MDXTag, {
        name: "code",
        components: components,
        parentName: "pre",
        props: {
          "className": "language-js",
          "dangerouslySetInnerHTML": {
            "__html": "<span class=\"token keyword\">import</span> <span class=\"token operator\">*</span> <span class=\"token keyword\">as</span> React <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> configureFonts<span class=\"token punctuation\">,</span> MD3LightTheme<span class=\"token punctuation\">,</span> Provider <span class=\"token keyword\">as</span> PaperProvider <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react-native-paper'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> App <span class=\"token keyword\">from</span> <span class=\"token string\">'./src/App'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> fontConfig <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  fontFamily<span class=\"token punctuation\">:</span> <span class=\"token string\">'NotoSans'</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">const</span> theme <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token operator\">...</span>MD3LightTheme<span class=\"token punctuation\">,</span>\n  fonts<span class=\"token punctuation\">:</span> <span class=\"token function\">configureFonts</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span>config<span class=\"token punctuation\">:</span> fontConfig<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">export</span> <span class=\"token keyword\">default</span> <span class=\"token keyword\">function</span> <span class=\"token function\">Main</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token punctuation\">(</span>\n    <span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">PaperProvider</span></span> <span class=\"token attr-name\">theme</span><span class=\"token script language-javascript\"><span class=\"token script-punctuation punctuation\">=</span><span class=\"token punctuation\">{</span>theme<span class=\"token punctuation\">}</span></span><span class=\"token punctuation\">></span></span><span class=\"token plain-text\">\n      </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;</span><span class=\"token class-name\">App</span></span> <span class=\"token punctuation\">/></span></span><span class=\"token plain-text\">\n    </span><span class=\"token tag\"><span class=\"token tag\"><span class=\"token punctuation\">&#x3C;/</span><span class=\"token class-name\">PaperProvider</span></span><span class=\"token punctuation\">></span></span>\n  <span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n"
          }
        }
      })));
    }
  }]);

  return MDXContent;
}(React.Component);

exports["default"] = MDXContent;
MDXContent.isMDXComponent = true;;
  }(
    m,
    m.exports,
    function(name) {
      return r[name];
    },
    "/home/circleci/react-native-paper/docs/pages/4.fonts.mdx",
    "/home/circleci/react-native-paper/docs/pages"
  ));

  var meta = m.exports.meta || {};

  return {
    title: meta.title || "Fonts",
    link: meta.link || "fonts",
    description: meta.description,
    type: "custom",
    data: function MDXContent(props) {
      return React.createElement(
        Content,
        { logo: 'images/sidebar-logo.svg' },
        React.createElement(m.exports.default, props)
      );
    },
  };
}()),{"filepath":"pages/5.react-native-web.md","title":"Using on the Web","description":"","link":"using-on-the-web","data":"# Using on the Web\n\n## Pre-requisites\n\nMake sure that you have followed the getting started guide and have `react-native-paper` installed and configured before following this guide.\n\nWe're going to use [react-native-web](https://github.com/necolas/react-native-web) and [webpack](https://webpack.js.org/) to use React Native Paper on the web, so let's install them as well.\n\nTo install `react-native-web`, run:\n\n```sh\nyarn add react-native-web react-dom react-art\n```\n\n### Using CRA ([Create React App](https://github.com/facebook/create-react-app))\n\nInstall [`react-app-rewired`](https://github.com/timarney/react-app-rewired) to override `webpack` configuration:\n\n```sh\nyarn add --dev react-app-rewired\n```\n\n[Configure `babel-loader`](#2-configure-babel-loader) using a new file called `config-overrides.js`:\n\n```js\nmodule.exports = function override(config, env) {\n  config.module.rules.push({\n    test: /\\.js$/,\n    exclude: /node_modules[/\\\\](?!react-native-vector-icons)/,\n    use: {\n      loader: \"babel-loader\",\n      options: {\n        // Disable reading babel configuration\n        babelrc: false,\n        configFile: false,\n\n        // The configuration for compilation\n        presets: [\n          [\"@babel/preset-env\", { useBuiltIns: \"usage\" }],\n          \"@babel/preset-react\",\n          \"@babel/preset-flow\",\n          \"@babel/preset-typescript\"\n        ],\n        plugins: [\n          \"@babel/plugin-proposal-class-properties\",\n          \"@babel/plugin-proposal-object-rest-spread\"\n        ]\n      }\n    }\n  });\n\n  return config;\n};\n```\n\nChange your script in `package.json`:\n\n```diff\n/* package.json */\n\n  \"scripts\": {\n-   \"start\": \"react-scripts start\",\n+   \"start\": \"react-app-rewired start\",\n-   \"build\": \"react-scripts build\",\n+   \"build\": \"react-app-rewired build\",\n-   \"test\": \"react-scripts test --env=jsdom\",\n+   \"test\": \"react-app-rewired test --env=jsdom\"\n}\n```\n\n### Custom webpack setup\n\nTo install `webpack`, run:\n\n```sh\nyarn add --dev webpack webpack-cli webpack-dev-server\n```\n\nIf you don't have a webpack config in your project, copy the following to `webpack.config.js` get started:\n\n```js\nconst path = require('path');\n\nmodule.exports = {\n  mode: 'development',\n\n  // Path to the entry file, change it according to the path you have\n  entry: path.join(__dirname, 'App.js'),\n\n  // Path for the output files\n  output: {\n    path: path.join(__dirname, 'dist'),\n    filename: 'app.bundle.js',\n  },\n\n  // Enable source map support\n  devtool: 'source-map',\n\n  // Loaders and resolver config\n  module: {\n    rules: [\n\n    ],\n  },\n  resolve: {\n\n  },\n\n  // Development server config\n  devServer: {\n    contentBase: [path.join(__dirname, 'public')],\n    historyApiFallback: true,\n  },\n};\n```\n\nAlso create a folder named `public` and add the following file named `index.html`:\n\n```html\n<!doctype html>\n<head>\n  <meta charSet=\"utf-8\" />\n  <meta httpEquiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n\n  <meta name=\"viewport\" content=\"width=device-width,minimum-scale=1,initial-scale=1\" />\n\n  <title>App</title>\n\n  <style>\n    html, body, #root {\n      height: 100%;\n    }\n\n    #root {\n      display: flex;\n      flex-direction: column;\n    }\n  </style>\n</head>\n<body>\n  <div id=\"root\"></div>\n  <script src=\"app.bundle.js\"></script>\n</body>\n```\n\nNow we're ready to start configuring the project.\n\n## Configure webpack\n\n### 1. Alias `react-native` to `react-native-web`\n\nFirst, we have to tell webpack to use `react-native-web` instead of `react-native`. Add the following alias in your webpack config under `resolve`:\n\n```js\nalias: {\n  'react-native$': require.resolve('react-native-web'),\n}\n```\n\n### 2. Configure `babel-loader`\n\nNext, we want to tell `babel-loader` to compile `react-native-paper` and `react-native-vector-icons`. We would also want to disable reading the babel configuration files to prevent any conflicts.\n\nFirst install the required dependencies:\n\n```sh\nyarn add --dev babel-loader @babel/preset-env @babel/preset-react @babel/preset-flow @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread\n```\n\nNow, add the following in the `module.rules` array in your webpack config:\n\n```js\n{\n  test: /\\.js$/,\n  exclude: /node_modules[/\\\\](?!react-native-vector-icons)/,\n  use: {\n    loader: 'babel-loader',\n    options: {\n      // Disable reading babel configuration\n      babelrc: false,\n      configFile: false,\n\n      // The configuration for compilation\n      presets: [\n        ['@babel/preset-env', { useBuiltIns: 'usage' }],\n        '@babel/preset-react',\n        '@babel/preset-flow',\n        \"@babel/preset-typescript\"\n      ],\n      plugins: [\n        '@babel/plugin-proposal-class-properties',\n        '@babel/plugin-proposal-object-rest-spread'\n      ],\n    },\n  },\n},\n```\n\n### 3. Configure `file-loader`\n\n#### webpack < 5.0\n\nTo be able to import images and other assets using `require`, we need to configure `file-loader`. Let's install it:\n\n```sh\nyarn add --dev file-loader\n```\n\nTo configure it, add the following in the `module.rules` array in your webpack config:\n\n```js\n{\n  test: /\\.(jpg|png|woff|woff2|eot|ttf|svg)$/,\n  loader: 'file-loader',\n}\n```\n\n##### webpack >= 5.0\n\nUse `asset/resource`, since `file-loader` was deprecated in webpack v5.\n\n```js\n{\n  test: /\\.(jpg|png|woff|woff2|eot|ttf|svg)$/,\n  type: 'asset/resource'\n}\n```\n\n## Load the Material Community Icons\n\nIf you followed the getting started guide, you should have the following code in your root component:\n\n```js\n<PaperProvider>\n  <App />\n</PaperProvider>\n```\n\nNow we need tweak this section to load the Material Community Icons from the [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons) library:\n\n```js\n<PaperProvider>\n  <React.Fragment>\n    {Platform.OS === 'web' ? (\n      <style type=\"text/css\">{`\n        @font-face {\n          font-family: 'MaterialCommunityIcons';\n          src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');\n        }\n      `}</style>\n    ) : null}\n    <App />\n  </React.Fragment>\n</PaperProvider>\n```\n\nRemember to import `Platform` from `react-native` at the top:\n\n```js\nimport { Platform } from 'react-native';\n```\n\nYou can also load these fonts using [`css-loader`](https://github.com/webpack-contrib/css-loader) if you prefer.\n\n## Load the Roboto fonts (optional)\n\nThe default theme in React Native Paper uses the Roboto font. You can add them to your project following [the instructions on its Google Fonts page](https://fonts.google.com/specimen/Roboto?selection.family=Roboto:100,300,400,500).\n\n## We're done!\n\nYou can run `webpack-dev-server` to run the webpack server and open your project in the browser. You can add the following script in your `package.json` under the `\"scripts\"` section to make it easier:\n\n```json\n\"web\": \"webpack-dev-server --open\"\n```\n\nNow you can run `yarn web` to run the project on web.\n","type":"md","dependencies":[]},{"filepath":"pages/6.recommended-libraries.md","title":"Recommended Libraries","description":"","link":"recommended-libraries","data":"# Recommended Libraries\n\nOur mission is to provide a full suite of well-integrated components built with Material Design in mind. However, many components already have better well maintained implementations.\n\nHere are some of the libraries we recommend:\n\n## Tabs\n\n[react-native-community/react-native-tab-view](https://github.com/react-native-community/react-native-tab-view)\nMaterial Design themed [swipeable tabs](https://material.io/design/components/tabs.html), maintained by [@satya164](https://twitter.com/satya164) and [@mosdnk](https://twitter.com/mosdnk).\n\n[react-native-paper-tabs](https://github.com/web-ridge/react-native-paper-tabs)\nMaterial Design themed [swipeable tabs](https://material.io/design/components/tabs.html) for React Native Paper, maintained by [@RichardLindhout](https://twitter.com/RichardLindhout)\n\n## Bottom sheet\n\n[osdnk/reanimated-bottom-sheet](https://github.com/osdnk/react-native-reanimated-bottom-sheet)\nAn implementation of the [bottom sheet behaviour](https://material.io/design/components/sheets-bottom.html), maintained by [@mosdnk](https://twitter.com/mosdnk).\n\n[gorhom/react-native-bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet)\nAn implementation of the [bottom sheet behaviour](https://material.io/design/components/sheets-bottom.html), maintained by [@Gorhom](https://twitter.com/Gorhom).\n\n\n## Date Picker\n[web-ridge/react-native-paper-dates](https://github.com/web-ridge/react-native-paper-dates)\nMaterial Design themed [date picker](https://material.io/components/date-pickers), maintained by [@RichardLindhout](https://twitter.com/RichardLindhout)\n \n[react-native-community/react-native-datetimepicker](https://github.com/react-native-community/react-native-datetimepicker)\n\n## Time Picker\n[web-ridge/react-native-paper-dates](https://github.com/web-ridge/react-native-paper-dates)\nMaterial Design themed [time picker](https://material.io/components/time-pickers), maintained by [@RichardLindhout](https://twitter.com/RichardLindhout) \n","type":"md","dependencies":[]},(function() {
  var e = require("/home/circleci/react-native-paper/docs/pages/6.showcase.js");
  var c = typeof e.default === 'function' ? e.default : e;
  var m = e.meta || {};
  return {
     title: m.title || "Showcase",
     link: m.link || "showcase",
     description: m.description,
     type: "custom",
     data: c
  };
}()),{"filepath":"pages/7.contributing.md","title":"Contributing","description":"","link":"contributing","data":"# Contributing to React Native Paper\n\n## Code of Conduct\n\nWe want this community to be friendly and respectful to each other. Please read [the full text](https://callstack.com/code-of-conduct/?utm_source=github.com&utm_medium=referral&utm_campaign=react-native-paper&utm_term=code-of-conduct) so that you can understand what actions will and will not be tolerated.\n\n## Our Development Process\n\nThe core team works directly on GitHub and all work is public.\n\n### Development workflow\n\n> **Working on your first pull request?** You can learn how from this *free* series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).\n\n1. Fork the repo and create your branch from `main` (a guide on [how to fork a repository](https://help.github.com/articles/fork-a-repo/)).\n2. Run `yarn bootstrap` on the root level, to setup the development environment.\n3. Do the changes you want and test them out in the example app before sending a pull request.\n\n### Commit message convention\n\nWe follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:\n\n* `fix`: bug fixes, e.g. fix Button color on DarkTheme.\n* `feat`: new features, e.g. add Snackbar component.\n* `refactor`: code refactor, e.g. new folder structure for components.\n* `docs`: changes into documentation, e.g. add usage example for Button.\n* `test`: adding or updating tests, eg unit, snapshot testing.\n* `chore`: tooling changes, e.g. change circleci config.\n* `BREAKING CHANGE`: for changes that break existing usage, e.g. change API of a component.\n\nOur pre-commit hooks verify that your commit message matches this format when committing.\n\n### Linting and tests\n\nWe use `typescript` for type checking, `eslint` with `prettier` for linting and formatting the code, and `jest` for testing. Our pre-commit hooks verify that the linter and tests pass when commiting. You can also run the following commands manually:\n\n* `yarn typescript`: type-check files with `tsc`.\n* `yarn lint`: lint files with `eslint` and `prettier`.\n* `yarn test`: run unit tests with `jest`.\n\n### Sending a pull request\n\nWhen you're sending a pull request:\n\n* Prefer small pull requests focused on one change.\n* Verify that `typescript`, `eslint` and all tests are passing.\n* Preview the documentation to make sure it looks good.\n* Follow the pull request template when opening a pull request.\n\nWhen you're working on a component:\n\n* Follow the guidelines described in the [official material design docs](https://material.io/guidelines/).\n* Write a brief description of every prop when defining `type Props` to aid with documentation.\n* Provide an example usage for the component (check other components to get a idea).\n* Update the type definitions for Flow and TypeScript if you changed an API or added a component.\n\n### Running the example\n\nThe example app uses [Expo](https://expo.dev/) for the React Native example. You will need to install the Expo app for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) and [iOS](https://itunes.apple.com/app/apple-store/id982107779) to start developing.\n\nAfter you're done, you can run `yarn example start` in the project root (or `expo start` in the `example/` folder) and scan the QR code to launch it on your device.\n\nTo run the example on web, run `yarn example web` in the project root.\n\n### Working on documentation\n\nThe documentation is automatically generated from the [TypeScript](https://www.typescriptlang.org/) annotations in the components. You can add comments above the type annotations to add descriptions. To preview the generated documentation, run `yarn docs start` in the project root.\n\n### Publishing a release\n\nWe use [release-it](https://github.com/webpro/release-it) to automate our release. If you have publish access to the NPM package, run the following from the main branch to publish a new release:\n\n```sh\nyarn release\n```\n\nNOTE: You must have a `GITHUB_TOKEN` environment variable available. You can create a GitHub access token with the \"repo\" access [here](https://github.com/settings/tokens).\n\n## Reporting issues\n\nYou can report issues on our [bug tracker](https://github.com/callstack/react-native-paper/issues). Please follow the issue template when opening an issue.\n\n## License\n\nBy contributing to React Native Paper, you agree that your contributions will be licensed under its **MIT** license.\n\n","type":"md","dependencies":["/home/circleci/react-native-paper/CONTRIBUTING.md"]},{"filepath":"pages/8.theming-with-react-navigation.md","title":"Theming with React Navigation","description":"","link":"theming-with-react-navigation","data":"# Theming with React Navigation\n\nIn this guide we will look into how to apply theming for an application using React Native Paper and React Navigation at the same time.\n\nOffering different theme options, especially dark/light ones, becomes increasingly a standard requirement of the modern mobile application. Fortunately, both React Navigation and React Native Paper support configurable theming out-of-the-box.\nBut how to make them work together?\n\n## Themes adaptation\n\n### Material Design 2\n\nFortunately, in Material Design 2, both React Navigation and React Native Paper offer very similar API when it comes to theming and theme color structure. It's possible to import them in light and dark variants from both.\n\n```js\nimport {\n  DarkTheme as NavigationDarkTheme,\n  DefaultTheme as NavigationDefaultTheme,\n} from '@react-navigation/native';\n\nimport {\n  MD2LightTheme,\n  MD2DarkTheme,\n} from 'react-native-paper';\n```\n\n### Material Design 3\n\nFrom v5, React Native Paper theme colors structure is following the Material Design 3 <i>(known as Material You)</i> colors system, which differs significantly from both previous Paper's theme and React Navigation theme.\n\nHowever, to simplify adapting React Navigation theme colors, to use the ones from React Native Paper, it's worth using a utility called `adaptNavigationTheme` – it accepts navigation compliant themes in both modes and returns their equivalents adjusted to Material Design 3.\n\n```ts\nimport {\n  DarkTheme as NavigationDarkTheme,\n  DefaultTheme as NavigationDefaultTheme,\n} from '@react-navigation/native';\n\nconst { LightTheme, DarkTheme } = adaptNavigationTheme({\n  reactNavigationLight: NavigationDefaultTheme,\n  reactNavigationDark: NavigationDarkTheme,\n});\n```\n\nLibrary exports also Material Design 3 themes in both modes:\n\n```js\nimport {\n  MD3LightTheme,\n  MD3DarkTheme,\n} from 'react-native-paper';\n```\n\n## Combining theme objects\n\nBoth libraries require a wrapper to be used at the entry point of the application.\nReact Navigation exposes `NavigationContainer` which ensures that navigation works correctly, but also accepts `theme` as an optional property. Read more about setting up navigation [here](https://reactnavigation.org/docs/getting-started/).\nFor React Native Paper theme to work, we need to use `PaperProvider` also at application's entry point.\n\n```js\nimport { NavigationContainer } from '@react-navigation/native';\nimport { createStackNavigator } from '@react-navigation/stack';\nimport { TouchableOpacity } from 'react-native';\nimport {\n  Card,\n  Text,\n  List,\n  Provider as PaperProvider,\n} from 'react-native-paper';\n\nconst Stack = createStackNavigator();\n\nconst HomeScreen = ({ navigation }) => (\n  <TouchableOpacity\n    onPress={() =>\n      navigation?.push('Details', {\n        title,\n        content,\n      })\n    }\n  >\n    <Card>\n      <Card.Content>\n        <Text variant=\"titleLarge\">{title}</Text>\n        <Text variant=\"bodyMedium\">{content}</Text>\n      </Card.Content>\n    </Card>\n  </TouchableOpacity>\n);\n\nconst DetailsScreen = (props) => {\n  const { title, content } = props?.route?.params;\n  return (\n    <List.Section>\n      <List.Subheader>{title}</List.Subheader>\n      <List.Item title={content} />\n    </List.Section>\n  );\n};\n\nexport default function App() {\n  return (\n    <PaperProvider>\n      <NavigationContainer>\n        <Stack.Navigator initialRouteName=\"Home\">\n          <Stack.Screen name=\"Home\" component={HomeScreen} />\n          <Stack.Screen name=\"Details\" component={DetailsScreen} />\n        </Stack.Navigator>\n      </NavigationContainer>\n    </PaperProvider>\n  );\n}\n```\n\n\n\nOur goal here is to combine those two themes, so that we could control the theme for the entire application from a single place.\n\nTo make things easier we can use [deepmerge](https://www.npmjs.com/package/deepmerge) package. With `yarn` we can install it like this\n\n```sh\nyarn add deepmerge\n```\n\n### Material Design 2\n\n```js\nimport {\n  NavigationContainer,\n  DarkTheme as NavigationDarkTheme,\n  DefaultTheme as NavigationDefaultTheme,\n} from '@react-navigation/native';\nimport {\n  MD2DarkTheme,\n  MD2LightTheme,\n} from 'react-native-paper';\nimport merge from 'deepmerge';\n\nconst CombinedDefaultTheme = merge(MD2LightTheme, NavigationDefaultTheme);\nconst CombinedDarkTheme = merge(MD2DarkTheme, NavigationDarkTheme);\n```\n\n### Material Design 3\n\n```js\nimport {\n  NavigationContainer,\n  DarkTheme as NavigationDarkTheme,\n  DefaultTheme as NavigationDefaultTheme,\n} from '@react-navigation/native';\nimport {\n  MD3DarkTheme,\n  MD3LightTheme,\n} from 'react-native-paper';\nimport merge from 'deepmerge';\n\nconst { LightTheme, DarkTheme } = adaptNavigationTheme({\n  reactNavigationLight: NavigationDefaultTheme,\n  reactNavigationDark: NavigationDarkTheme,\n});\n\nconst CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);\nconst CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);\n```\n\nAlternatively, we could merge those themes using vanilla JavaScript:\n\n### Material Design 2\n\n```js\nconst CombinedDefaultTheme = {\n  ...MD2LightTheme,\n  ...NavigationDefaultTheme,\n  colors: {\n    ...MD2LightTheme.colors,\n    ...NavigationDefaultTheme.colors,\n  },\n};\nconst CombinedDarkTheme = {\n  ...MD2DarkTheme,\n  ...NavigationDarkTheme,\n  colors: {\n    ...MD2DarkTheme.colors,\n    ...NavigationDarkTheme.colors,\n  },\n};\n```\n\n### Material Design 3\n\n```js\nconst { LightTheme, DarkTheme } = adaptNavigationTheme({\n  reactNavigationLight: NavigationDefaultTheme,\n  reactNavigationDark: NavigationDarkTheme,\n});\n\nconst CombinedDefaultTheme = {\n  ...MD3LightTheme,\n  ...LightTheme,\n  colors: {\n    ...MD3LightTheme.colors,\n    ...LightTheme.colors,\n  },\n};\nconst CombinedDarkTheme = {\n  ...MD3DarkTheme,\n  ...DarkTheme,\n  colors: {\n    ...MD3DarkTheme.colors,\n    ...DarkTheme.colors,\n  },\n};\n```\n\n## Passing theme with Providers\n\nAfter combining the themes, we will be able to control theming in both libraries from a single source, which will come in handy later.\n\nNext, we need to pass merged themes into the Providers. For this part, we use the dark one - `CombinedDarkTheme`.\n\n```js\nconst Stack = createStackNavigator();\n\nexport default function App() {\n  return (\n    <PaperProvider theme={CombinedDarkTheme}>\n      <NavigationContainer theme={CombinedDarkTheme}>\n        <Stack.Navigator initialRouteName=\"Home\">\n          <Stack.Screen name=\"Home\" component={HomeScreen} />\n          <Stack.Screen name=\"Details\" component={DetailsScreen} />\n        </Stack.Navigator>\n      </NavigationContainer>\n    </PaperProvider>\n  );\n}\n```\n\n## Customizing theme\n\nWe don't need to limit ourselves to the themes offered by the libraries in default. Both packages allow for custom themes to be applied.\nYou can learn all about it their documentations:\n\n- [Theming in React Navigation](https://reactnavigation.org/docs/themes/)\n- [Theming in React Native Paper](https://callstack.github.io/react-native-paper/theming.html)\n\n## React Context for theme customization\n\nNow, we wouldn't want to stay forever with dark theme being on, which is why we need to gain the ability to control theme dynamically. A bit of state management is needed for this purpose.\n\nReact Context proves itself very useful in handling cross-cutting concerns like global theme handling, so we will use just that.\n\n## Creating Context\n\nFirst, we define our Context.\n\n```js\nimport React from 'react';\n\nexport const PreferencesContext = React.createContext({\n  toggleTheme: () => {},\n  isThemeDark: false,\n});\n```\n\n## Using Context\n\nContext Provider should be imported also at the entry point, as we want it to wrap the whole app, for the theme values to be accessible at every component that we have.\n\n```js\nimport React from 'react';\nimport { PreferencesContext } from './PreferencesContext';\n\nconst Stack = createStackNavigator();\n\nexport default function App() {\n  const [isThemeDark, setIsThemeDark] = React.useState(false);\n\n  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;\n\n  const toggleTheme = React.useCallback(() => {\n    return setIsThemeDark(!isThemeDark);\n  }, [isThemeDark]);\n\n  const preferences = React.useMemo(\n    () => ({\n      toggleTheme,\n      isThemeDark,\n    }),\n    [toggleTheme, isThemeDark]\n  );\n\n  return (\n    // Context is wired into the local state of our main component, so that its values could be propagated throughout the entire application\n    <PreferencesContext.Provider value={preferences}>\n      <PaperProvider theme={theme}>\n        <NavigationContainer theme={theme}>\n          <Stack.Navigator initialRouteName=\"Home\">\n            <Stack.Screen name=\"Home\" component={HomeScreen} />\n            <Stack.Screen name=\"Details\" component={DetailsScreen} />\n          </Stack.Navigator>\n        </NavigationContainer>\n      </PaperProvider>\n    </PreferencesContext.Provider>\n  );\n}\n```\n\nNow that the Context is available at every component, all we need to do is import it. Next thing is to provide the user with some UI element to control changing the theme. We will use `Paper`'s [Switch](https://callstack.github.io/react-native-paper/switch.html) for this purpose.\n\n```js\nimport React from 'react';\nimport { useTheme, Appbar, TouchableRipple, Switch } from 'react-native-paper';\nimport { PreferencesContext } from './PreferencesContext';\n\nconst Header = ({ scene }) => {\n  const theme = useTheme();\n  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);\n\n  return (\n    <Appbar.Header\n      theme={{\n        colors: {\n          primary: theme?.colors.surface,\n        },\n      }}\n    >\n      <Appbar.Content title={scene.route?.name} />\n        <Switch\n          color={'red'}\n          value={isThemeDark}\n          onValueChange={toggleTheme}\n        />\n    </Appbar.Header>\n  );\n};\n```\n\nAnd now you can switch between light and dark theme!\n\n![paperGuide1](screenshots/themingWithReactNavigationDarkLightSwitch.gif)\n\nThanks to the linking of themes that we did earlier, switching themes can be controlled with only one piece of state.\n\nReact Native Paper components will automatically use provided theme thanks to the `PaperProvider` that is wrapped around the entry point of our application, but we can also access theme values manually with `useTheme` hook,\nexposed by the library. You can see how it's done in the `Header` component code above.\n\nIf light/dark themes are not enough for your use case, you can learn more about creating Material Design themes [here](https://material.io/design/material-theming/implementing-your-theme.html#color).\nOn `main` branch of the example app, you will find implemented [Menu](https://callstack.github.io/react-native-paper/menu.html) component, which allows to choose a few custom themes. Inspecting code in `utils` and `Header` may give you some idea how to use your own themes with `Paper`, in addition to dedicated [docs](https://callstack.github.io/react-native-paper/menu.html).\n\nRead more about integrating `Paper` with `React Navigation` in a brilliant [article](https://reactnavigation.org/blog/2020/01/29/using-react-navigation-5-with-react-native-paper/) by [@trensik](https://twitter.com/trensik)\n","type":"md","dependencies":[]},{"filepath":"pages/9.react-navigation.md","title":"Integrate AppBar with react-navigation","description":"","link":"integrate-app-bar-with-react-navigation","data":"# Integrate AppBar with react-navigation\n\n## Prerequisites\n\n - `react-native-paper`\n - `react-navigation`\n \nWe assume that you have already installed the mentioned libraries above, otherwise please check out the guides below.\n \n [React Native Paper - Getting Started](https://callstack.github.io/react-native-paper/getting-started.html)\n \n [React Navigation - Getting Started](https://reactnavigation.org/docs/getting-started/)\n\n## Stack Navigator\n\nWe will start with `react-navigation` by creating a basic navigation stack. Stack navigator gives us a possibility of transition between screens in our app and manage navigation's history. In a simple scenario where there is only one stack navigator present in the app, it resembles a navigation state in a browser.\nScreens are pushed and popped from the stack while the user navigates to a new screen or go back to the previous one.\n\nLet's create two screens. A main screen named `Home` and details screen named `Details`.\n\n```js\nimport 'react-native-gesture-handler';\nimport React from 'react';\nimport { NavigationContainer } from '@react-navigation/native';\nimport { createStackNavigator } from '@react-navigation/stack';\n\nconst Stack = createStackNavigator();\n\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator initialRouteName=\"Home\">\n        <Stack.Screen name=\"Home\" component={HomeScreen} />\n        <Stack.Screen name=\"Details\" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n```\n\nAt the moment our navigation stack contains two screens and will render `HomeScreen` or `DetailsScreen` components according to the current navigation state. We have not implemented those components yet, so let's do this now:\n\n```js\nimport React from 'react';\nimport {View, Text, Button, StyleSheet} from 'react-native';\n\nfunction HomeScreen() {\n  return (\n    <View style={style.container}>\n      <Text>Home Screen</Text>\n    </View>\n  );\n}\n\nfunction DetailsScreen() {\n  return (\n    <View style={style.container}>\n      <Text>Details Screen</Text>\n    </View>\n  );\n}\n\nconst style = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n});\n```\n\nOnce we have finished implementing the components, we can run the app and check how Stack looks like.\n\n![navigationAppBar1](screenshots/react-navigation-appBar1.png)\n\nTo navigate from `HomeScreen` to `DetailsScreen` we can use the navigation object provided by `Stack.Screen` component. Every component rendered by `Stack.Screen` has an access to the navigation object via props. Let's modify our `HomeScreen` component:\n\n```js\nfunction HomeScreen({ navigation }) {\n  return (\n    <View style={style.container}>\n      <Text>Home Screen</Text>\n      <Button\n        title=\"Go to details\"\n        onPress={() => navigation.navigate('Details')}\n      />\n    </View>\n  );\n}\n```\n\nOur result:\n\n![navigationAppBar2](screenshots/react-navigation-appBar2.gif)\n\nAs you can see, we can already navigate between two screens. In the next steps, we will show you how to use Paper's `AppBar` instead of the default header.\n\n### Adding AppBar\n\nWe can customize Stack's header by passing custom component:\n\n```js\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator\n        initialRouteName=\"Home\"\n        screenOptions={{\n          header: CustomNavigationBar,\n        }}>\n        <Stack.Screen name=\"Home\" component={HomeScreen} />\n        <Stack.Screen name=\"Details\" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n```\n\nNow we will implement `CustomNavigationBar` using `AppBar` component:\n\n```js\nimport { Appbar } from 'react-native-paper';\n\nfunction CustomNavigationBar() {\n  return (\n    <Appbar.Header>\n      <Appbar.Content title=\"My awesome app\" />\n    </Appbar.Header>\n  );\n}\n```\n\nCurrent implementation of the `CustomNavigationBar` is simple - we just render a title inside of it. You may notice there is no way to go back to the previous screen, because the back button is not visible in the header. Let's add it now and let's make sure it's visible on all Stack's screens except `Home` screen.\n\nFirstly, pass navigation props to `CustomNavigationBar`:\n\n```js\nexport default function App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator\n        initialRouteName=\"Home\"\n        screenOptions={{\n          header: (props) => <CustomNavigationBar {...props} />,\n        }}>\n        <Stack.Screen name=\"Home\" component={HomeScreen} />\n        <Stack.Screen name=\"Details\" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n```\n\nSecondly, we check if the navigation bar receives a `back` prop. If it has, it means there is another screen on the stack beneath the current screen and we should render the back arrow button in such a case. (The `back` prop is sent in React Navigation 6.x; in 5.x a prop named `previous` is sent and can be checked for instead.)\n\n```js\nfunction CustomNavigationBar({ navigation, back }) {\n  return (\n    <Appbar.Header>\n      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}\n      <Appbar.Content title=\"My awesome app\" />\n    </Appbar.Header>\n  );\n}\n```\n\n![navigationAppBar3](screenshots/react-navigation-appBar3.gif)\n\n\nAnother interesting pattern that can be implemented with `react-native-paper` and `react-navigation` is a \"hamburger menu\". Thanks to the `Menu` component we can add a nice looking pop-up to our `Appbar`. To implement this feature we need to make a couple of changes in `CustomNavigationBar`:\n- Render a `Menu` component\n- Pass `Appbar.Action` to the anchor prop\n- Add a state to control `Menu` visibility\n\nWe also want the menu to appear only on `HomeScreen`, which means we will render it conditionally based on the `back` prop.\n\n```js\nfunction CustomNavigationBar({ navigation, back }) {\n  const [visible, setVisible] = React.useState(false);\n  const openMenu = () => setVisible(true);\n  const closeMenu = () => setVisible(false);\n\n  return (\n    <Appbar.Header>\n      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}\n      <Appbar.Content title=\"My awesome app\" />\n      {!back ? (\n        <Menu\n          visible={visible}\n          onDismiss={closeMenu}\n          anchor={\n            <Appbar.Action icon=\"menu\" color=\"white\" onPress={openMenu} />\n          }>\n          <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title=\"Option 1\" />\n          <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title=\"Option 2\" />\n          <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title=\"Option 3\" disabled />\n        </Menu>\n      ) : null}\n    </Appbar.Header>\n  );\n}\n```\n\nFinal result:\n\n![navigationAppBar4](screenshots/react-navigation-appBar4.gif)\n\nThat's all we need! We have app bar that contains everything we need to navigate through screens and access an additional menu on the main screen. As you can see, with Material design `Appbar` provided by `react-native-paper` used together with `react-navigation` we can easily create an app that looks and works great.\n","type":"md","dependencies":[]},{"type":"separator"},{"filepath":"../src/components/ActivityIndicator.tsx","title":"ActivityIndicator","description":"Activity indicator is used to present progress of some activity in the app.\nIt can be used as a drop-in for the ActivityIndicator shipped with React Native.\n\n<div class=\"screenshots\">\n  <img src=\"screenshots/activity-indicator.gif\" style=\"width: 100px;\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ActivityIndicator, MD2Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <ActivityIndicator animating={true} color={MD2Colors.red800} />\n);\n\nexport default MyComponent;\n```","link":"activity-indicator","data":{"description":"Activity indicator is used to present progress of some activity in the app.\nIt can be used as a drop-in for the ActivityIndicator shipped with React Native.\n\n<div class=\"screenshots\">\n  <img src=\"screenshots/activity-indicator.gif\" style=\"width: 100px;\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ActivityIndicator, MD2Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <ActivityIndicator animating={true} color={MD2Colors.red800} />\n);\n\nexport default MyComponent;\n```","displayName":"ActivityIndicator","methods":[],"statics":[],"props":{"animating":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to show the indicator or hide it.","defaultValue":{"value":"true","computed":false}},"color":{"required":false,"tsType":{"name":"string"},"description":"The color of the spinner."},"size":{"required":false,"tsType":{"name":"union","raw":"'small' | 'large' | number","elements":[{"name":"literal","value":"'small'"},{"name":"literal","value":"'large'"},{"name":"number"}]},"description":"Size of the indicator.","defaultValue":{"value":"'small'","computed":false}},"hidesWhenStopped":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the indicator should hide when not animating.","defaultValue":{"value":"true","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/ActivityIndicator.tsx"]},{"filepath":"../src/components/FAB/AnimatedFAB.tsx","title":"AnimatedFAB","description":"An animated, extending horizontally floating action button represents the primary action in an application.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/animated-fab.gif\" />\n</div>\n\n## Usage\n```js\nimport React from 'react';\nimport {\n  StyleProp,\n  ViewStyle,\n  Animated,\n  StyleSheet,\n  Platform,\n  ScrollView,\n  Text,\n  SafeAreaView,\n  I18nManager,\n} from 'react-native';\nimport { AnimatedFAB } from 'react-native-paper';\n\nconst MyComponent = ({\n  animatedValue,\n  visible,\n  extended,\n  label,\n  animateFrom,\n  style,\n  iconMode,\n}) => {\n  const [isExtended, setIsExtended] = React.useState(true);\n\n  const isIOS = Platform.OS === 'ios';\n\n  const onScroll = ({ nativeEvent }) => {\n    const currentScrollPosition =\n      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;\n\n    setIsExtended(currentScrollPosition <= 0);\n  };\n\n  const fabStyle = { [animateFrom]: 16 };\n\n  return (\n    <SafeAreaView style={styles.container}>\n      <ScrollView onScroll={onScroll}>\n        {[...new Array(100).keys()].map((_, i) => (\n          <Text>{i}</Text>\n        ))}\n      </ScrollView>\n      <AnimatedFAB\n        icon={'plus'}\n        label={'Label'}\n        extended={isExtended}\n        onPress={() => console.log('Pressed')}\n        visible={visible}\n        animateFrom={'right'}\n        iconMode={'static'}\n        style={[styles.fabStyle, style, fabStyle]}\n      />\n    </SafeAreaView>\n  );\n};\n\nexport default MyComponent;\n\nconst styles = StyleSheet.create({\n  container: {\n    flexGrow: 1,\n  },\n  fabStyle: {\n    bottom: 16,\n    right: 16,\n    position: 'absolute',\n  },\n});\n```","link":"animated-fab","data":{"description":"An animated, extending horizontally floating action button represents the primary action in an application.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/animated-fab.gif\" />\n</div>\n\n## Usage\n```js\nimport React from 'react';\nimport {\n  StyleProp,\n  ViewStyle,\n  Animated,\n  StyleSheet,\n  Platform,\n  ScrollView,\n  Text,\n  SafeAreaView,\n  I18nManager,\n} from 'react-native';\nimport { AnimatedFAB } from 'react-native-paper';\n\nconst MyComponent = ({\n  animatedValue,\n  visible,\n  extended,\n  label,\n  animateFrom,\n  style,\n  iconMode,\n}) => {\n  const [isExtended, setIsExtended] = React.useState(true);\n\n  const isIOS = Platform.OS === 'ios';\n\n  const onScroll = ({ nativeEvent }) => {\n    const currentScrollPosition =\n      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;\n\n    setIsExtended(currentScrollPosition <= 0);\n  };\n\n  const fabStyle = { [animateFrom]: 16 };\n\n  return (\n    <SafeAreaView style={styles.container}>\n      <ScrollView onScroll={onScroll}>\n        {[...new Array(100).keys()].map((_, i) => (\n          <Text>{i}</Text>\n        ))}\n      </ScrollView>\n      <AnimatedFAB\n        icon={'plus'}\n        label={'Label'}\n        extended={isExtended}\n        onPress={() => console.log('Pressed')}\n        visible={visible}\n        animateFrom={'right'}\n        iconMode={'static'}\n        style={[styles.fabStyle, style, fabStyle]}\n      />\n    </SafeAreaView>\n  );\n};\n\nexport default MyComponent;\n\nconst styles = StyleSheet.create({\n  container: {\n    flexGrow: 1,\n  },\n  fabStyle: {\n    bottom: 16,\n    right: 16,\n    position: 'absolute',\n  },\n});\n```","displayName":"AnimatedFAB","methods":[],"statics":[],"props":{"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"Icon to display for the `FAB`."},"label":{"required":true,"tsType":{"name":"string"},"description":"Label for extended `FAB`."},"uppercase":{"required":false,"tsType":{"name":"boolean"},"description":"Make the label text uppercased."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the FAB. This is read by the screen reader when the user taps the FAB.\nUses `label` by default if specified.","defaultValue":{"value":"label","computed":true}},"accessibilityState":{"required":false,"tsType":{"name":"AccessibilityState"},"description":"Accessibility state for the FAB. This is read by the screen reader when the user taps the FAB."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for the icon and label of the `FAB`."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether `FAB` is disabled. A disabled button is greyed out and `onPress` is not called on touch."},"visible":{"required":false,"tsType":{"name":"boolean"},"description":"Whether `FAB` is currently visible.","defaultValue":{"value":"true","computed":false}},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"onLongPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Function to execute on long press."},"delayLongPress":{"required":false,"tsType":{"name":"number"},"description":"The number of milliseconds a user must touch the element before executing `onLongPress`."},"iconMode":{"required":false,"tsType":{"name":"union","raw":"'static' | 'dynamic'","elements":[{"name":"literal","value":"'static'"},{"name":"literal","value":"'dynamic'"}]},"description":"Whether icon should be translated to the end of extended `FAB` or be static and stay in the same place. The default value is `dynamic`.","defaultValue":{"value":"'dynamic'","computed":false}},"animateFrom":{"required":false,"tsType":{"name":"union","raw":"'left' | 'right'","elements":[{"name":"literal","value":"'left'"},{"name":"literal","value":"'right'"}]},"description":"Indicates from which direction animation should be performed. The default value is `right`.","defaultValue":{"value":"'right'","computed":false}},"extended":{"required":false,"tsType":{"name":"boolean"},"description":"Whether `FAB` should start animation to extend.","defaultValue":{"value":"false","computed":false}},"variant":{"required":false,"tsType":{"name":"union","raw":"'primary' | 'secondary' | 'tertiary' | 'surface'","elements":[{"name":"literal","value":"'primary'"},{"name":"literal","value":"'secondary'"},{"name":"literal","value":"'tertiary'"},{"name":"literal","value":"'surface'"}]},"description":"@supported Available in v5.x with theme version 3\n\nColor mappings variant for combinations of container and icon colors.","defaultValue":{"value":"'primary'","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"","defaultValue":{"value":"'animated-fab'","computed":false}}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/FAB/AnimatedFAB.tsx"]},{"filepath":"../src/components/Appbar/Appbar.tsx","title":"Appbar","description":"A component to display action items in a bar. It can be placed at the top or bottom.\nThe top bar usually contains the screen title, controls such as navigation buttons, menu button etc.\nThe bottom bar usually provides access to a drawer and up to four actions.\n\nBy default Appbar uses primary color as a background, in dark theme with `adaptive` mode it will use surface colour instead.\nSee [Dark Theme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more informations\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/appbar.png\" />\n</div>\n\n## Usage\n### Top bar\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Appbar.Header>\n    <Appbar.BackAction onPress={() => {}} />\n    <Appbar.Content title=\"Title\" />\n    <Appbar.Action icon=\"calendar\" onPress={() => {}} />\n    <Appbar.Action icon=\"magnify\" onPress={() => {}} />\n  </Appbar.Header>\n);\n\nexport default MyComponent;\n```\n\n### Bottom bar\n```js\nimport * as React from 'react';\nimport { StyleSheet } from 'react-native';\nimport { Appbar, FAB, useTheme } from 'react-native-paper';\nimport { useSafeAreaInsets } from 'react-native-safe-area-context';\n\nconst BOTTOM_APPBAR_HEIGHT = 80;\nconst MEDIUM_FAB_HEIGHT = 56;\n\nconst MyComponent = () => {\n  const { bottom } = useSafeAreaInsets();\n  const theme = useTheme();\n\n  return (\n    <Appbar\n      style={[\n        styles.bottom,\n        {\n          height: BOTTOM_APPBAR_HEIGHT + bottom,\n          backgroundColor: theme.colors.elevation.level2,\n        },\n      ]}\n      safeAreaInsets={{ bottom }}\n    >\n      <Appbar.Action icon=\"archive\" onPress={() => {}} />\n      <Appbar.Action icon=\"email\" onPress={() => {}} />\n      <Appbar.Action icon=\"label\" onPress={() => {}} />\n      <Appbar.Action icon=\"delete\" onPress={() => {}} />\n      <FAB\n        mode=\"flat\"\n        size=\"medium\"\n        icon=\"plus\"\n        onPress={() => {}}\n        style={[\n          styles.fab,\n          { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },\n        ]}\n      />\n    </Appbar>\n  );\n};\n\nconst styles = StyleSheet.create({\n  bottom: {\n    backgroundColor: 'aquamarine',\n    position: 'absolute',\n    left: 0,\n    right: 0,\n    bottom: 0,\n  },\n  fab: {\n    position: 'absolute',\n    right: 16,\n  },\n});\n\nexport default MyComponent;\n```","link":"appbar","data":{"description":"A component to display action items in a bar. It can be placed at the top or bottom.\nThe top bar usually contains the screen title, controls such as navigation buttons, menu button etc.\nThe bottom bar usually provides access to a drawer and up to four actions.\n\nBy default Appbar uses primary color as a background, in dark theme with `adaptive` mode it will use surface colour instead.\nSee [Dark Theme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more informations\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/appbar.png\" />\n</div>\n\n## Usage\n### Top bar\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Appbar.Header>\n    <Appbar.BackAction onPress={() => {}} />\n    <Appbar.Content title=\"Title\" />\n    <Appbar.Action icon=\"calendar\" onPress={() => {}} />\n    <Appbar.Action icon=\"magnify\" onPress={() => {}} />\n  </Appbar.Header>\n);\n\nexport default MyComponent;\n```\n\n### Bottom bar\n```js\nimport * as React from 'react';\nimport { StyleSheet } from 'react-native';\nimport { Appbar, FAB, useTheme } from 'react-native-paper';\nimport { useSafeAreaInsets } from 'react-native-safe-area-context';\n\nconst BOTTOM_APPBAR_HEIGHT = 80;\nconst MEDIUM_FAB_HEIGHT = 56;\n\nconst MyComponent = () => {\n  const { bottom } = useSafeAreaInsets();\n  const theme = useTheme();\n\n  return (\n    <Appbar\n      style={[\n        styles.bottom,\n        {\n          height: BOTTOM_APPBAR_HEIGHT + bottom,\n          backgroundColor: theme.colors.elevation.level2,\n        },\n      ]}\n      safeAreaInsets={{ bottom }}\n    >\n      <Appbar.Action icon=\"archive\" onPress={() => {}} />\n      <Appbar.Action icon=\"email\" onPress={() => {}} />\n      <Appbar.Action icon=\"label\" onPress={() => {}} />\n      <Appbar.Action icon=\"delete\" onPress={() => {}} />\n      <FAB\n        mode=\"flat\"\n        size=\"medium\"\n        icon=\"plus\"\n        onPress={() => {}}\n        style={[\n          styles.fab,\n          { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },\n        ]}\n      />\n    </Appbar>\n  );\n};\n\nconst styles = StyleSheet.create({\n  bottom: {\n    backgroundColor: 'aquamarine',\n    position: 'absolute',\n    left: 0,\n    right: 0,\n    bottom: 0,\n  },\n  fab: {\n    position: 'absolute',\n    right: 16,\n  },\n});\n\nexport default MyComponent;\n```","displayName":"Appbar","methods":[],"statics":[],"props":{"dark":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the background color is a dark color. A dark appbar will render light text and vice-versa."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `Appbar`."},"mode":{"required":false,"tsType":{"name":"union","raw":"'small' | 'medium' | 'large' | 'center-aligned'","elements":[{"name":"literal","value":"'small'"},{"name":"literal","value":"'medium'"},{"name":"literal","value":"'large'"},{"name":"literal","value":"'center-aligned'"}]},"description":"@supported Available in v5.x with theme version 3\n\nMode of the Appbar.\n- `small` - Appbar with default height (64).\n- `medium` - Appbar with medium height (112).\n- `large` - Appbar with large height (152).\n- `center-aligned` - Appbar with default height and center-aligned title.","defaultValue":{"value":"'small'","computed":false}},"elevated":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\nWhether Appbar background should have the elevation along with primary color pigment."},"safeAreaInsets":{"required":false,"tsType":{"name":"signature","type":"object","raw":"{\n  bottom?: number;\n  top?: number;\n  left?: number;\n  right?: number;\n}","signature":{"properties":[{"key":"bottom","value":{"name":"number","required":false}},{"key":"top","value":{"name":"number","required":false}},{"key":"left","value":{"name":"number","required":false}},{"key":"right","value":{"name":"number","required":false}}]}},"description":"Safe area insets for the Appbar. This can be used to avoid elements like the navigation bar on Android and bottom safe area on iOS."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Appbar/Appbar.tsx"]},{"filepath":"../src/components/Appbar/AppbarAction.tsx","title":"Appbar.Action","description":"A component used to display an action item in the appbar.\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/appbar-action-android.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\nimport { Platform } from 'react-native';\n\nconst MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';\n\nconst MyComponent = () => (\n    <Appbar.Header>\n       <Appbar.Content title=\"Title\" subtitle={'Subtitle'} />\n        <Appbar.Action icon=\"magnify\" onPress={() => {}} />\n        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />\n    </Appbar.Header>\n);\n\nexport default MyComponent;\n```","link":"appbar-action","data":{"description":"A component used to display an action item in the appbar.\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/appbar-action-android.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\nimport { Platform } from 'react-native';\n\nconst MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';\n\nconst MyComponent = () => (\n    <Appbar.Header>\n       <Appbar.Content title=\"Title\" subtitle={'Subtitle'} />\n        <Appbar.Action icon=\"magnify\" onPress={() => {}} />\n        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />\n    </Appbar.Header>\n);\n\nexport default MyComponent;\n```","displayName":"Appbar.Action","methods":[],"statics":[],"props":{"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for action icon."},"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"Name of the icon to show."},"size":{"required":false,"tsType":{"name":"number"},"description":"Optional icon size.","defaultValue":{"value":"24","computed":false}},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the button. This is read by the screen reader when the user taps the button."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Function to execute on press."},"isLeading":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\n\nWhether it's the leading button."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<View>","elements":[{"name":"View"}]},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Appbar/AppbarAction.tsx"],"group":"Appbar"},{"filepath":"../src/components/Appbar/AppbarBackAction.tsx","title":"Appbar.BackAction","description":"A component used to display a back button in the appbar.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/appbar-backaction-android.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\n\n\nconst MyComponent = () => (\n    <Appbar.Header>\n      <Appbar.BackAction onPress={() => {}} />\n    </Appbar.Header>\n);\n\nexport default MyComponent;\n```","link":"appbar-back-action","data":{"description":"A component used to display a back button in the appbar.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/appbar-backaction-android.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\n\n\nconst MyComponent = () => (\n    <Appbar.Header>\n      <Appbar.BackAction onPress={() => {}} />\n    </Appbar.Header>\n);\n\nexport default MyComponent;\n```","displayName":"Appbar.BackAction","methods":[],"statics":[],"props":{"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for back icon."},"size":{"required":false,"tsType":{"name":"number"},"description":"Optional icon size."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the button. This is read by the screen reader when the user taps the button.","defaultValue":{"value":"'Back'","computed":false}},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<View>","elements":[{"name":"View"}]},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Appbar/AppbarBackAction.tsx"],"group":"Appbar"},{"filepath":"../src/components/Appbar/AppbarContent.tsx","title":"Appbar.Content","description":"A component used to display a title and optional subtitle in an appbar.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/appbar-content.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\n\nconst MyComponent = () => (\n    <Appbar.Header>\n       <Appbar.Content title=\"Title\" />\n    </Appbar.Header>\n);\n\nexport default MyComponent;\n```","link":"appbar-content","data":{"description":"A component used to display a title and optional subtitle in an appbar.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/appbar-content.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\n\nconst MyComponent = () => (\n    <Appbar.Header>\n       <Appbar.Content title=\"Title\" />\n    </Appbar.Header>\n);\n\nexport default MyComponent;\n```","displayName":"Appbar.Content","methods":[],"statics":[],"props":{"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for the text."},"title":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Text for the title."},"titleStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style for the title."},"titleRef":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<Text>","elements":[{"name":"Text"}]},"description":"Reference for the title."},"subtitle":{"required":false,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"@deprecated Deprecated in v5.x\nText for the subtitle."},"subtitleStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"@deprecated Deprecated in v5.x\nStyle for the subtitle."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"mode":{"required":false,"tsType":{"name":"union","raw":"'small' | 'medium' | 'large' | 'center-aligned'","elements":[{"name":"literal","value":"'small'"},{"name":"literal","value":"'medium'"},{"name":"literal","value":"'large'"},{"name":"literal","value":"'center-aligned'"}]},"description":"@internal","defaultValue":{"value":"'small'","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Appbar/AppbarContent.tsx"],"group":"Appbar"},{"filepath":"../src/components/Appbar/AppbarHeader.tsx","title":"Appbar.Header","description":"A component to use as a header at the top of the screen.\nIt can contain the screen title, controls such as navigation buttons, menu button etc.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/appbar-small.png\" />\n    <figcaption>small</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/appbar-medium.png\" />\n    <figcaption>medium</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/appbar-large.png\" />\n    <figcaption>large</figcaption>\n  </figure>\n <figure>\n    <img class=\"small\" src=\"screenshots/appbar-center-aligned.png\" />\n    <figcaption>center-aligned</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const _goBack = () => console.log('Went back');\n\n  const _handleSearch = () => console.log('Searching');\n\n  const _handleMore = () => console.log('Shown more');\n\n  return (\n    <Appbar.Header>\n      <Appbar.BackAction onPress={_goBack} />\n      <Appbar.Content title=\"Title\" />\n      <Appbar.Action icon=\"magnify\" onPress={_handleSearch} />\n      <Appbar.Action icon=\"dots-vertical\" onPress={_handleMore} />\n    </Appbar.Header>\n  );\n};\n\nexport default MyComponent;\n```","link":"appbar-header","data":{"description":"A component to use as a header at the top of the screen.\nIt can contain the screen title, controls such as navigation buttons, menu button etc.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/appbar-small.png\" />\n    <figcaption>small</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/appbar-medium.png\" />\n    <figcaption>medium</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/appbar-large.png\" />\n    <figcaption>large</figcaption>\n  </figure>\n <figure>\n    <img class=\"small\" src=\"screenshots/appbar-center-aligned.png\" />\n    <figcaption>center-aligned</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Appbar } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const _goBack = () => console.log('Went back');\n\n  const _handleSearch = () => console.log('Searching');\n\n  const _handleMore = () => console.log('Shown more');\n\n  return (\n    <Appbar.Header>\n      <Appbar.BackAction onPress={_goBack} />\n      <Appbar.Content title=\"Title\" />\n      <Appbar.Action icon=\"magnify\" onPress={_handleSearch} />\n      <Appbar.Action icon=\"dots-vertical\" onPress={_handleMore} />\n    </Appbar.Header>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Appbar.Header","methods":[],"statics":[],"props":{"dark":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the background color is a dark color. A dark header will render light text and vice-versa."},"statusBarHeight":{"required":false,"tsType":{"name":"number"},"description":"Extra padding to add at the top of header to account for translucent status bar.\nThis is automatically handled on iOS >= 11 including iPhone X using `SafeAreaView`.\nIf you are using Expo, we assume translucent status bar and set a height for status bar automatically.\nPass `0` or a custom value to disable the default behaviour, and customize the height."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the header."},"mode":{"required":false,"tsType":{"name":"union","raw":"'small' | 'medium' | 'large' | 'center-aligned'","elements":[{"name":"literal","value":"'small'"},{"name":"literal","value":"'medium'"},{"name":"literal","value":"'large'"},{"name":"literal","value":"'center-aligned'"}]},"description":"@supported Available in v5.x with theme version 3\n\nMode of the Appbar.\n- `small` - Appbar with default height (56).\n- `medium` - Appbar with medium height (112).\n- `large` - Appbar with large height (152).\n- `center-aligned` - Appbar with default height and center-aligned title.","defaultValue":{"value":"Platform.OS === 'ios' ? 'center-aligned' : 'small'","computed":false}},"elevated":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\nWhether Appbar background should have the elevation along with primary color pigment.","defaultValue":{"value":"false","computed":false}},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Appbar/AppbarHeader.tsx"],"group":"Appbar"},{"filepath":"../src/components/Avatar/AvatarIcon.tsx","title":"Avatar.Icon","description":"Avatars can be used to represent people in a graphical way.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/avatar-icon.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Avatar.Icon size={24} icon=\"folder\" />\n);\n```","link":"avatar-icon","data":{"description":"Avatars can be used to represent people in a graphical way.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/avatar-icon.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Avatar.Icon size={24} icon=\"folder\" />\n);\n```","displayName":"Avatar.Icon","methods":[],"statics":[],"props":{"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"Icon to display for the `Avatar`."},"size":{"required":false,"tsType":{"name":"number"},"description":"Size of the avatar.","defaultValue":{"value":"64","computed":false}},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for the icon."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Avatar/AvatarIcon.tsx"],"group":"Avatar"},{"filepath":"../src/components/Avatar/AvatarImage.tsx","title":"Avatar.Image","description":"Avatars can be used to represent people in a graphical way.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/avatar-image.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Avatar.Image size={24} source={require('../assets/avatar.png')} />\n);\nexport default MyComponent\n```","link":"avatar-image","data":{"description":"Avatars can be used to represent people in a graphical way.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/avatar-image.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Avatar.Image size={24} source={require('../assets/avatar.png')} />\n);\nexport default MyComponent\n```","displayName":"Avatar.Image","methods":[],"statics":[],"props":{"source":{"required":true,"tsType":{"name":"union","raw":"ImageSourcePropType\n| ((props: { size: number }) => React.ReactNode)","elements":[{"name":"ImageSourcePropType"},{"name":"unknown"}]},"description":"Image to display for the `Avatar`.\nIt accepts a standard React Native Image `source` prop\nOr a function that returns an `Image`."},"size":{"required":false,"tsType":{"name":"number"},"description":"Size of the avatar.","defaultValue":{"value":"64","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"onError":{"required":false,"tsType":{"name":"ImageProps['onError']","raw":"ImageProps['onError']"},"description":"Invoked on load error."},"onLayout":{"required":false,"tsType":{"name":"ImageProps['onLayout']","raw":"ImageProps['onLayout']"},"description":"Invoked on mount and on layout changes."},"onLoad":{"required":false,"tsType":{"name":"ImageProps['onLoad']","raw":"ImageProps['onLoad']"},"description":"Invoked when load completes successfully."},"onLoadEnd":{"required":false,"tsType":{"name":"ImageProps['onLoadEnd']","raw":"ImageProps['onLoadEnd']"},"description":"Invoked when load either succeeds or fails."},"onLoadStart":{"required":false,"tsType":{"name":"ImageProps['onLoadStart']","raw":"ImageProps['onLoadStart']"},"description":"Invoked on load start."},"onProgress":{"required":false,"tsType":{"name":"ImageProps['onProgress']","raw":"ImageProps['onProgress']"},"description":"Invoked on download progress."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Avatar/AvatarImage.tsx"],"group":"Avatar"},{"filepath":"../src/components/Avatar/AvatarText.tsx","title":"Avatar.Text","description":"Avatars can be used to represent people in a graphical way.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/avatar-text.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Avatar.Text size={24} label=\"XD\" />\n);\n```","link":"avatar-text","data":{"description":"Avatars can be used to represent people in a graphical way.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/avatar-text.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Avatar.Text size={24} label=\"XD\" />\n);\n```","displayName":"Avatar.Text","methods":[],"statics":[],"props":{"label":{"required":true,"tsType":{"name":"string"},"description":"Initials to show as the text in the `Avatar`."},"size":{"required":false,"tsType":{"name":"number"},"description":"Size of the avatar.","defaultValue":{"value":"64","computed":false}},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for the text."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style for text container"},"labelStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style for the title."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Avatar/AvatarText.tsx"],"group":"Avatar"},{"filepath":"../src/components/Badge.tsx","title":"Badge","description":"Badges are small status descriptors for UI elements.\nA badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/badge-1.png\" />\n    <figcaption>Badge with content</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/badge-2.png\" />\n    <figcaption>Badge without content</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Badge } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Badge>3</Badge>\n);\n\nexport default MyComponent;\n```","link":"badge","data":{"description":"Badges are small status descriptors for UI elements.\nA badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/badge-1.png\" />\n    <figcaption>Badge with content</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/badge-2.png\" />\n    <figcaption>Badge without content</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Badge } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Badge>3</Badge>\n);\n\nexport default MyComponent;\n```","displayName":"Badge","methods":[],"statics":[],"props":{"visible":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the badge is visible","defaultValue":{"value":"true","computed":false}},"children":{"required":false,"tsType":{"name":"union","raw":"string | number","elements":[{"name":"string"},{"name":"number"}]},"description":"Content of the `Badge`."},"size":{"required":false,"tsType":{"name":"number"},"description":"Size of the `Badge`.","defaultValue":{"value":"20","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":""},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<typeof Animated.Text>","elements":[{}]},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Badge.tsx"]},{"filepath":"../src/components/Banner.tsx","title":"Banner","description":"Banner displays a prominent message and related actions.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/banner.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Image } from 'react-native';\nimport { Banner } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(true);\n\n  return (\n    <Banner\n      visible={visible}\n      actions={[\n        {\n          label: 'Fix it',\n          onPress: () => setVisible(false),\n        },\n        {\n          label: 'Learn more',\n          onPress: () => setVisible(false),\n        },\n      ]}\n      icon={({size}) => (\n        <Image\n          source={{\n            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',\n          }}\n          style={{\n            width: size,\n            height: size,\n          }}\n        />\n      )}>\n      There was a problem processing a transaction on your credit card.\n    </Banner>\n  );\n};\n\nexport default MyComponent;\n```","link":"banner","data":{"description":"Banner displays a prominent message and related actions.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/banner.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Image } from 'react-native';\nimport { Banner } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(true);\n\n  return (\n    <Banner\n      visible={visible}\n      actions={[\n        {\n          label: 'Fix it',\n          onPress: () => setVisible(false),\n        },\n        {\n          label: 'Learn more',\n          onPress: () => setVisible(false),\n        },\n      ]}\n      icon={({size}) => (\n        <Image\n          source={{\n            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',\n          }}\n          style={{\n            width: size,\n            height: size,\n          }}\n        />\n      )}>\n      There was a problem processing a transaction on your credit card.\n    </Banner>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Banner","methods":[],"statics":[],"props":{"visible":{"required":true,"tsType":{"name":"boolean"},"description":"Whether banner is currently visible."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content that will be displayed inside banner."},"icon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon to display for the `Banner`. Can be an image."},"actions":{"required":false,"tsType":{"name":"Array","elements":[{"name":"intersection","raw":"{\n  label: string;\n} & Omit<React.ComponentProps<typeof Button>, 'children'>","elements":[{"name":"signature","type":"object","raw":"{\n  label: string;\n}","signature":{"properties":[{"key":"label","value":{"name":"string","required":true}}]}},{"name":"Omit","elements":[{"name":"ReactComponentProps","raw":"React.ComponentProps<typeof Button>","elements":[{"name":"Button"}]},{"name":"literal","value":"'children'"}],"raw":"Omit<React.ComponentProps<typeof Button>, 'children'>"}]}],"raw":"Array<\n  {\n    label: string;\n  } & Omit<React.ComponentProps<typeof Button>, 'children'>\n>"},"description":"Action items to shown in the banner.\nAn action item should contain the following properties:\n\n- `label`: label of the action button (required)\n- `onPress`: callback that is called when button is pressed (required)\n\nTo customize button you can pass other props that button component takes.","defaultValue":{"value":"[]","computed":false}},"contentStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style of banner's inner content.\nUse this prop to apply custom width for wide layouts."},"elevation":{"required":false,"tsType":{"name":"union","raw":"0 | 1 | 2 | 3 | 4 | 5 | Animated.Value","elements":[{"name":"literal","value":"0"},{"name":"literal","value":"1"},{"name":"literal","value":"2"},{"name":"literal","value":"3"},{"name":"literal","value":"4"},{"name":"literal","value":"5"},{"name":"Animated.Value"}]},"description":"@supported Available in v5.x with theme version 3\nChanges Banner shadow and background on iOS and Android.","defaultValue":{"value":"1","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<View>","elements":[{"name":"View"}]},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"onShowAnimationFinished":{"required":false,"tsType":{"name":"Animated.EndCallback"},"description":"@optional\nOptional callback that will be called after the opening animation finished running normally","defaultValue":{"value":"() => {}","computed":false}},"onHideAnimationFinished":{"required":false,"tsType":{"name":"Animated.EndCallback"},"description":"@optional\nOptional callback that will be called after the closing animation finished running normally","defaultValue":{"value":"() => {}","computed":false}}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Banner.tsx"]},{"filepath":"../src/components/BottomNavigation/BottomNavigation.tsx","title":"BottomNavigation","description":"Bottom navigation provides quick navigation between top-level views of an app with a bottom navigation bar.\nIt is primarily designed for use on mobile.\n\nFor integration with React Navigation, you can use [react-navigation-material-bottom-tabs](https://github.com/react-navigation/react-navigation/tree/main/packages/material-bottom-tabs) and consult [createMaterialBottomTabNavigator](https://reactnavigation.org/docs/material-bottom-tab-navigator/) documentation.\n\nBy default Bottom navigation uses primary color as a background, in dark theme with `adaptive` mode it will use surface colour instead.\nSee [Dark InternalTheme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more information.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/bottom-navigation.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { BottomNavigation, Text } from 'react-native-paper';\n\nconst MusicRoute = () => <Text>Music</Text>;\n\nconst AlbumsRoute = () => <Text>Albums</Text>;\n\nconst RecentsRoute = () => <Text>Recents</Text>;\n\nconst NotificationsRoute = () => <Text>Notifications</Text>;\n\nconst MyComponent = () => {\n  const [index, setIndex] = React.useState(0);\n  const [routes] = React.useState([\n    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},\n    { key: 'albums', title: 'Albums', focusedIcon: 'album' },\n    { key: 'recents', title: 'Recents', focusedIcon: 'history' },\n    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },\n  ]);\n\n  const renderScene = BottomNavigation.SceneMap({\n    music: MusicRoute,\n    albums: AlbumsRoute,\n    recents: RecentsRoute,\n    notifications: NotificationsRoute,\n  });\n\n  return (\n    <BottomNavigation\n      navigationState={{ index, routes }}\n      onIndexChange={setIndex}\n      renderScene={renderScene}\n    />\n  );\n};\n\nexport default MyComponent;\n```","link":"bottom-navigation","data":{"description":"Bottom navigation provides quick navigation between top-level views of an app with a bottom navigation bar.\nIt is primarily designed for use on mobile.\n\nFor integration with React Navigation, you can use [react-navigation-material-bottom-tabs](https://github.com/react-navigation/react-navigation/tree/main/packages/material-bottom-tabs) and consult [createMaterialBottomTabNavigator](https://reactnavigation.org/docs/material-bottom-tab-navigator/) documentation.\n\nBy default Bottom navigation uses primary color as a background, in dark theme with `adaptive` mode it will use surface colour instead.\nSee [Dark InternalTheme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more information.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/bottom-navigation.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { BottomNavigation, Text } from 'react-native-paper';\n\nconst MusicRoute = () => <Text>Music</Text>;\n\nconst AlbumsRoute = () => <Text>Albums</Text>;\n\nconst RecentsRoute = () => <Text>Recents</Text>;\n\nconst NotificationsRoute = () => <Text>Notifications</Text>;\n\nconst MyComponent = () => {\n  const [index, setIndex] = React.useState(0);\n  const [routes] = React.useState([\n    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},\n    { key: 'albums', title: 'Albums', focusedIcon: 'album' },\n    { key: 'recents', title: 'Recents', focusedIcon: 'history' },\n    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },\n  ]);\n\n  const renderScene = BottomNavigation.SceneMap({\n    music: MusicRoute,\n    albums: AlbumsRoute,\n    recents: RecentsRoute,\n    notifications: NotificationsRoute,\n  });\n\n  return (\n    <BottomNavigation\n      navigationState={{ index, routes }}\n      onIndexChange={setIndex}\n      renderScene={renderScene}\n    />\n  );\n};\n\nexport default MyComponent;\n```","displayName":"BottomNavigation","methods":[{"name":"SceneMap","docblock":"Function which takes a map of route keys to components.\nPure components are used to minimize re-rendering of the pages.\nThis drastically improves the animation performance.","modifiers":["static"],"params":[{"name":"scenes","optional":false,"type":{"name":"signature","type":"object","raw":"{\n  [key: string]: React.ComponentType<{\n    route: Route;\n    jumpTo: (key: string) => void;\n  }>;\n}","signature":{"properties":[{"key":{"name":"string"},"value":{"name":"ReactComponentType","raw":"React.ComponentType<{\n  route: Route;\n  jumpTo: (key: string) => void;\n}>","elements":[{"name":"signature","type":"object","raw":"{\n  route: Route;\n  jumpTo: (key: string) => void;\n}","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}},{"key":"jumpTo","value":{"name":"signature","type":"function","raw":"(key: string) => void","signature":{"arguments":[{"name":"key","type":{"name":"string"}}],"return":{"name":"void"}},"required":true}}]}}],"required":true}}]}}}],"returns":null,"description":"Function which takes a map of route keys to components.\nPure components are used to minimize re-rendering of the pages.\nThis drastically improves the animation performance."}],"statics":[],"props":{"shifting":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the shifting style is used, the active tab icon shifts up to show the label and the inactive tabs won't have a label.\n\nBy default, this is `false` with theme version 3 and `true` when you have more than 3 tabs.\nPass `shifting={false}` to explicitly disable this animation, or `shifting={true}` to always use this animation.\nNote that you need at least 2 tabs be able to run this animation."},"labeled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to show labels in tabs. When `false`, only icons will be displayed.","defaultValue":{"value":"true","computed":false}},"compact":{"required":false,"tsType":{"name":"boolean"},"description":"Whether tabs should be spread across the entire width."},"navigationState":{"required":true,"tsType":{"name":"signature","type":"object","raw":"{\n  index: number;\n  routes: Route[];\n}","signature":{"properties":[{"key":"index","value":{"name":"number","required":true}},{"key":"routes","value":{"name":"Array","elements":[{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]}}],"raw":"Route[]","required":true}}]}},"description":"State for the bottom navigation. The state should contain the following properties:\n\n- `index`: a number representing the index of the active route in the `routes` array\n- `routes`: an array containing a list of route objects used for rendering the tabs\n\nEach route object should contain the following properties:\n\n- `key`: a unique key to identify the route (required)\n- `title`: title of the route to use as the tab label\n- `focusedIcon`:  icon to use as the focused tab icon, can be a string, an image source or a react component @renamed Renamed from 'icon' to 'focusedIcon' in v5.x\n- `unfocusedIcon`:  icon to use as the unfocused tab icon, can be a string, an image source or a react component @supported Available in v5.x with theme version 3\n- `color`: color to use as background color for shifting bottom navigation @deprecated Deprecated in v5.x\n- `badge`: badge to show on the tab icon, can be `true` to show a dot, `string` or `number` to show text.\n- `accessibilityLabel`: accessibility label for the tab button\n- `testID`: test id for the tab button\n\nExample:\n\n```js\n{\n  index: 1,\n  routes: [\n    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},\n    { key: 'albums', title: 'Albums', focusedIcon: 'album' },\n    { key: 'recents', title: 'Recents', focusedIcon: 'history' },\n    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },\n  ]\n}\n```\n\n`BottomNavigation` is a controlled component, which means the `index` needs to be updated via the `onIndexChange` callback."},"onIndexChange":{"required":true,"tsType":{"name":"signature","type":"function","raw":"(index: number) => void","signature":{"arguments":[{"name":"index","type":{"name":"number"}}],"return":{"name":"void"}}},"description":"Callback which is called on tab change, receives the index of the new tab as argument.\nThe navigation state needs to be updated when it's called, otherwise the change is dropped."},"renderScene":{"required":true,"tsType":{"name":"signature","type":"function","raw":"(props: {\n  route: Route;\n  jumpTo: (key: string) => void;\n}) => React.ReactNode | null","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{\n  route: Route;\n  jumpTo: (key: string) => void;\n}","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}},{"key":"jumpTo","value":{"name":"signature","type":"function","raw":"(key: string) => void","signature":{"arguments":[{"name":"key","type":{"name":"string"}}],"return":{"name":"void"}},"required":true}}]}}}],"return":{"name":"union","raw":"React.ReactNode | null","elements":[{"name":"ReactReactNode","raw":"React.ReactNode"},{"name":"null"}]}}},"description":"Callback which returns a react element to render as the page for the tab. Receives an object containing the route as the argument:\n\n```js\nrenderScene = ({ route, jumpTo }) => {\n  switch (route.key) {\n    case 'music':\n      return <MusicRoute jumpTo={jumpTo} />;\n    case 'albums':\n      return <AlbumsRoute jumpTo={jumpTo} />;\n  }\n}\n```\n\nPages are lazily rendered, which means that a page will be rendered the first time you navigate to it.\nAfter initial render, all the pages stay rendered to preserve their state.\n\nYou need to make sure that your individual routes implement a `shouldComponentUpdate` to improve the performance.\nTo make it easier to specify the components, you can use the `SceneMap` helper:\n\n```js\nrenderScene = BottomNavigation.SceneMap({\n  music: MusicRoute,\n  albums: AlbumsRoute,\n});\n```\n\nSpecifying the components this way is easier and takes care of implementing a `shouldComponentUpdate` method.\nEach component will receive the current route and a `jumpTo` method as it's props.\nThe `jumpTo` method can be used to navigate to other tabs programmatically:\n\n```js\nthis.props.jumpTo('albums')\n```"},"renderIcon":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: {\n  route: Route;\n  focused: boolean;\n  color: string;\n}) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{\n  route: Route;\n  focused: boolean;\n  color: string;\n}","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}},{"key":"focused","value":{"name":"boolean","required":true}},{"key":"color","value":{"name":"string","required":true}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React Element to be used as tab icon."},"renderLabel":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: {\n  route: Route;\n  focused: boolean;\n  color: string;\n}) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{\n  route: Route;\n  focused: boolean;\n  color: string;\n}","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}},{"key":"focused","value":{"name":"boolean","required":true}},{"key":"color","value":{"name":"string","required":true}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which React Element to be used as tab label."},"renderTouchable":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: TouchableProps) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"intersection","raw":"TouchableWithoutFeedbackProps & {\n  key: string;\n  route: Route;\n  children: React.ReactNode;\n  borderless?: boolean;\n  centered?: boolean;\n  rippleColor?: string;\n}","elements":[{"name":"TouchableWithoutFeedbackProps"},{"name":"signature","type":"object","raw":"{\n  key: string;\n  route: Route;\n  children: React.ReactNode;\n  borderless?: boolean;\n  centered?: boolean;\n  rippleColor?: string;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}},{"key":"children","value":{"name":"ReactReactNode","raw":"React.ReactNode","required":true}},{"key":"borderless","value":{"name":"boolean","required":false}},{"key":"centered","value":{"name":"boolean","required":false}},{"key":"rippleColor","value":{"name":"string","required":false}}]}}]}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React element to be used as the touchable for the tab item.\nRenders a `TouchableRipple` on Android and `TouchableWithoutFeedback` with `View` on iOS.","defaultValue":{"value":"(props: TouchableProps) => <Touchable {...props} />","computed":false}},"getAccessibilityLabel":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { route: Route }) => string | undefined","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ route: Route }","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}}]}}}],"return":{"name":"union","raw":"string | undefined","elements":[{"name":"string"},{"name":"undefined"}]}}},"description":"Get accessibility label for the tab button. This is read by the screen reader when the user taps the tab.\nUses `route.accessibilityLabel` by default.","defaultValue":{"value":"({ route }: { route: Route }) =>\nroute.accessibilityLabel","computed":false}},"getBadge":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { route: Route }) => boolean | number | string | undefined","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ route: Route }","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}}]}}}],"return":{"name":"union","raw":"boolean | number | string | undefined","elements":[{"name":"boolean"},{"name":"number"},{"name":"string"},{"name":"undefined"}]}}},"description":"Get badge for the tab, uses `route.badge` by default.","defaultValue":{"value":"({ route }: { route: Route }) => route.badge","computed":false}},"getColor":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { route: Route }) => string | undefined","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ route: Route }","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}}]}}}],"return":{"name":"union","raw":"string | undefined","elements":[{"name":"string"},{"name":"undefined"}]}}},"description":"Get color for the tab, uses `route.color` by default.","defaultValue":{"value":"({ route }: { route: Route }) => route.color","computed":false}},"getLabelText":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { route: Route }) => string | undefined","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ route: Route }","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}}]}}}],"return":{"name":"union","raw":"string | undefined","elements":[{"name":"string"},{"name":"undefined"}]}}},"description":"Get label text for the tab, uses `route.title` by default. Use `renderLabel` to replace label component.","defaultValue":{"value":"({ route }: { route: Route }) => route.title","computed":false}},"getLazy":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { route: Route }) => boolean | undefined","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ route: Route }","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}}]}}}],"return":{"name":"union","raw":"boolean | undefined","elements":[{"name":"boolean"},{"name":"undefined"}]}}},"description":"Get lazy for the current screen. Uses true by default.","defaultValue":{"value":"({ route }: { route: Route }) => route.lazy","computed":false}},"getTestID":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { route: Route }) => string | undefined","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ route: Route }","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}}]}}}],"return":{"name":"union","raw":"string | undefined","elements":[{"name":"string"},{"name":"undefined"}]}}},"description":"Get the id to locate this tab button in tests, uses `route.testID` by default.","defaultValue":{"value":"({ route }: { route: Route }) => route.testID","computed":false}},"onTabPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { route: Route } & TabPressEvent) => void","signature":{"arguments":[{"name":"props","type":{"name":"intersection","raw":"{ route: Route } & TabPressEvent","elements":[{"name":"signature","type":"object","raw":"{ route: Route }","signature":{"properties":[{"key":"route","value":{"name":"signature","type":"object","raw":"{\n  key: string;\n  title?: string;\n  focusedIcon?: IconSource;\n  unfocusedIcon?: IconSource;\n  badge?: string | number | boolean;\n  color?: string;\n  accessibilityLabel?: string;\n  testID?: string;\n  lazy?: boolean;\n}","signature":{"properties":[{"key":"key","value":{"name":"string","required":true}},{"key":"title","value":{"name":"string","required":false}},{"key":"focusedIcon","value":{"name":"IconSource","required":false}},{"key":"unfocusedIcon","value":{"name":"IconSource","required":false}},{"key":"badge","value":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}],"required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"testID","value":{"name":"string","required":false}},{"key":"lazy","value":{"name":"boolean","required":false}}]},"required":true}}]}},{"name":"signature","type":"object","raw":"{\n  defaultPrevented: boolean;\n  preventDefault(): void;\n}","signature":{"properties":[{"key":"defaultPrevented","value":{"name":"boolean","required":true}},{"key":"preventDefault","value":{"name":"void","required":true}}]}}]}}],"return":{"name":"void"}}},"description":"Function to execute on tab press. It receives the route for the pressed tab, useful for things like scroll to top."},"activeColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for icon and label in the active tab."},"inactiveColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for icon and label in the inactive tab."},"sceneAnimationEnabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether animation is enabled for scenes transitions in `shifting` mode.\nBy default, the scenes cross-fade during tab change when `shifting` is enabled.\nSpecify `sceneAnimationEnabled` as `false` to disable the animation.","defaultValue":{"value":"false","computed":false}},"sceneAnimationType":{"required":false,"tsType":{"name":"union","raw":"'opacity' | 'shifting'","elements":[{"name":"literal","value":"'opacity'"},{"name":"literal","value":"'shifting'"}]},"description":"The scene animation effect. Specify `'shifting'` for a different effect.\nBy default, 'opacity' will be used.","defaultValue":{"value":"'opacity'","computed":false}},"sceneAnimationEasing":{"required":false,"tsType":{"name":"union","raw":"EasingFunction | undefined","elements":[{"name":"EasingFunction"},{"name":"undefined"}]},"description":"The scene animation Easing."},"keyboardHidesNavigationBar":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the bottom navigation bar is hidden when keyboard is shown.\nOn Android, this works best when [`windowSoftInputMode`](https://developer.android.com/guide/topics/manifest/activity-element#wsoft) is set to `adjustResize`.","defaultValue":{"value":"Platform.OS === 'android'","computed":false}},"safeAreaInsets":{"required":false,"tsType":{"name":"signature","type":"object","raw":"{\n  top?: number;\n  right?: number;\n  bottom?: number;\n  left?: number;\n}","signature":{"properties":[{"key":"top","value":{"name":"number","required":false}},{"key":"right","value":{"name":"number","required":false}},{"key":"bottom","value":{"name":"number","required":false}},{"key":"left","value":{"name":"number","required":false}}]}},"description":"Safe area insets for the tab bar. This can be used to avoid elements like the navigation bar on Android and bottom safe area on iOS.\nThe bottom insets for iOS is added by default. You can override the behavior with this option."},"barStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style for the bottom navigation bar.  You can pass a custom background color here:\n\n```js\nbarStyle={{ backgroundColor: '#694fad' }}\n```"},"labelMaxFontSizeMultiplier":{"required":false,"tsType":{"name":"number"},"description":"Specifies the largest possible scale a label font can reach.","defaultValue":{"value":"1","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"TestID used for testing purposes","defaultValue":{"value":"'bottom-navigation'","computed":false}}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/BottomNavigation/BottomNavigation.tsx"]},{"filepath":"../src/components/Button/Button.tsx","title":"Button","description":"A button is component that the user can press to trigger an action.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/button-1.png\" />\n    <figcaption>Text button</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/button-2.png\" />\n    <figcaption>Outlined button</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/button-3.png\" />\n    <figcaption>Contained button</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/button-4.png\" />\n    <figcaption>Elevated button</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/button-5.png\" />\n    <figcaption>Contained-tonal button</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Button } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Button icon=\"camera\" mode=\"contained\" onPress={() => console.log('Pressed')}>\n    Press me\n  </Button>\n);\n\nexport default MyComponent;\n```","link":"button","data":{"description":"A button is component that the user can press to trigger an action.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/button-1.png\" />\n    <figcaption>Text button</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/button-2.png\" />\n    <figcaption>Outlined button</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/button-3.png\" />\n    <figcaption>Contained button</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/button-4.png\" />\n    <figcaption>Elevated button</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/button-5.png\" />\n    <figcaption>Contained-tonal button</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Button } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Button icon=\"camera\" mode=\"contained\" onPress={() => console.log('Pressed')}>\n    Press me\n  </Button>\n);\n\nexport default MyComponent;\n```","displayName":"Button","methods":[],"statics":[],"props":{"mode":{"required":false,"tsType":{"name":"union","raw":"'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'","elements":[{"name":"literal","value":"'text'"},{"name":"literal","value":"'outlined'"},{"name":"literal","value":"'contained'"},{"name":"literal","value":"'elevated'"},{"name":"literal","value":"'contained-tonal'"}]},"description":"Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.\n- `text` - flat button without background or outline, used for the lowest priority actions, especially when presenting multiple options.\n- `outlined` - button with an outline without background, typically used for important, but not primary action – represents medium emphasis.\n- `contained` - button with a background color, used for important action, have the most visual impact and high emphasis.\n- `elevated` - button with a background color and elevation, used when absolutely necessary e.g. button requires visual separation from a patterned background. @supported Available in v5.x with theme version 3\n- `contained-tonal` - button with a secondary background color, an alternative middle ground between contained and outlined buttons. @supported Available in v5.x with theme version 3","defaultValue":{"value":"'text'","computed":false}},"dark":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the color is a dark color. A dark button will render light text and vice-versa. Only applicable for:\n * `contained` mode for theme version 2\n * `contained`, `contained-tonal` and `elevated` modes for theme version 3."},"compact":{"required":false,"tsType":{"name":"boolean"},"description":"Use a compact look, useful for `text` buttons in a row."},"color":{"required":false,"tsType":{"name":"string"},"description":"@deprecated Deprecated in v5.x - use `buttonColor` or `textColor` instead.\nCustom text color for flat button, or background color for contained button."},"buttonColor":{"required":false,"tsType":{"name":"string"},"description":"Custom button's background color."},"textColor":{"required":false,"tsType":{"name":"string"},"description":"Custom button's text color."},"loading":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to show a loading indicator."},"icon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon to display for the `Button`."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Label text of the button."},"uppercase":{"required":false,"tsType":{"name":"boolean"},"description":"Make the label text uppercased. Note that this won't work if you pass React elements as children."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the button. This is read by the screen reader when the user taps the button."},"accessibilityHint":{"required":false,"tsType":{"name":"string"},"description":"Accessibility hint for the button. This is read by the screen reader when the user taps the button."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"onPressIn":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute as soon as the touchable element is pressed and invoked even before onPress."},"onPressOut":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute as soon as the touch is released even before onPress."},"onLongPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on long press."},"delayLongPress":{"required":false,"tsType":{"name":"number"},"description":"The number of milliseconds a user must touch the element before executing `onLongPress`."},"contentStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style of button's inner content.\nUse this prop to apply custom height and width and to set the icon on the right with `flexDirection: 'row-reverse'`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"labelStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style for the button text."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests.","defaultValue":{"value":"'button'","computed":false}}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Button/Button.tsx"]},{"filepath":"../src/components/Card/Card.tsx","title":"Card","description":"A card is a sheet of material that serves as an entry point to more detailed information.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/card-1.png\" />\n    <figcaption>Elevated card</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/card-2.png\" />\n    <figcaption>Outlined card</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/card-3.png\" />\n    <figcaption>Contained card</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar, Button, Card, Text } from 'react-native-paper';\n\nconst LeftContent = props => <Avatar.Icon {...props} icon=\"folder\" />\n\nconst MyComponent = () => (\n  <Card>\n    <Card.Title title=\"Card Title\" subtitle=\"Card Subtitle\" left={LeftContent} />\n    <Card.Content>\n      <Text variant=\"titleLarge\">Card title</Text>\n      <Text variant=\"bodyMedium\">Card content</Text>\n    </Card.Content>\n    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />\n    <Card.Actions>\n      <Button>Cancel</Button>\n      <Button>Ok</Button>\n    </Card.Actions>\n  </Card>\n);\n\nexport default MyComponent;\n```","link":"card","data":{"description":"A card is a sheet of material that serves as an entry point to more detailed information.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/card-1.png\" />\n    <figcaption>Elevated card</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/card-2.png\" />\n    <figcaption>Outlined card</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/card-3.png\" />\n    <figcaption>Contained card</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar, Button, Card, Text } from 'react-native-paper';\n\nconst LeftContent = props => <Avatar.Icon {...props} icon=\"folder\" />\n\nconst MyComponent = () => (\n  <Card>\n    <Card.Title title=\"Card Title\" subtitle=\"Card Subtitle\" left={LeftContent} />\n    <Card.Content>\n      <Text variant=\"titleLarge\">Card title</Text>\n      <Text variant=\"bodyMedium\">Card content</Text>\n    </Card.Content>\n    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />\n    <Card.Actions>\n      <Button>Cancel</Button>\n      <Button>Ok</Button>\n    </Card.Actions>\n  </Card>\n);\n\nexport default MyComponent;\n```","displayName":"Card","methods":[],"statics":[],"props":{"mode":{"required":false,"tsType":{"name":"union","raw":"'elevated' | 'outlined' | 'contained'","elements":[{"name":"literal","value":"'elevated'"},{"name":"literal","value":"'outlined'"},{"name":"literal","value":"'contained'"}]},"description":"Mode of the Card.\n- `elevated` - Card with elevation.\n- `contained` - Card without outline and elevation @supported Available in v5.x with theme version 3\n- `outlined` - Card with an outline.","defaultValue":{"value":"'elevated'","computed":false}},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `Card`."},"onLongPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Function to execute on long press."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"delayLongPress":{"required":false,"tsType":{"name":"number"},"description":"The number of milliseconds a user must touch the element before executing `onLongPress`."},"elevation":{"required":false,"tsType":{"name":"union","raw":"0 | 1 | 2 | 3 | 4 | 5 | Animated.Value","elements":[{"name":"literal","value":"0"},{"name":"literal","value":"1"},{"name":"literal","value":"2"},{"name":"literal","value":"3"},{"name":"literal","value":"4"},{"name":"literal","value":"5"},{"name":"Animated.Value"}]},"description":"Changes Card shadow and background on iOS and Android.","defaultValue":{"value":"1","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"Pass down testID from card props to touchable","defaultValue":{"value":"'card'","computed":false}},"accessible":{"required":false,"tsType":{"name":"boolean"},"description":"Pass down accessible from card props to touchable"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Card/Card.tsx"]},{"filepath":"../src/components/Card/CardActions.tsx","title":"Card.Actions","description":"A component to show a list of actions inside a Card.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/card-actions.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Card, Button } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Card>\n    <Card.Actions>\n      <Button>Cancel</Button>\n      <Button>Ok</Button>\n    </Card.Actions>\n  </Card>\n);\n\nexport default MyComponent;\n```","link":"card-actions","data":{"description":"A component to show a list of actions inside a Card.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/card-actions.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Card, Button } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Card>\n    <Card.Actions>\n      <Button>Cancel</Button>\n      <Button>Ok</Button>\n    </Card.Actions>\n  </Card>\n);\n\nexport default MyComponent;\n```","displayName":"Card.Actions","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Items inside the `CardActions`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Card/CardActions.tsx"],"group":"Card"},{"filepath":"../src/components/Card/CardContent.tsx","title":"Card.Content","description":"A component to show content inside a Card.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/card-content-example.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Card, Text } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Card>\n    <Card.Content>\n      <Text variant=\"titleLarge\">Card title</Text>\n      <Text variant=\"bodyMedium\">Card content</Text>\n    </Card.Content>\n  </Card>\n);\n\nexport default MyComponent;\n```","link":"card-content","data":{"description":"A component to show content inside a Card.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/card-content-example.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Card, Text } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Card>\n    <Card.Content>\n      <Text variant=\"titleLarge\">Card title</Text>\n      <Text variant=\"bodyMedium\">Card content</Text>\n    </Card.Content>\n  </Card>\n);\n\nexport default MyComponent;\n```","displayName":"Card.Content","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Items inside the `Card.Content`."},"index":{"required":false,"tsType":{"name":"number"},"description":"@internal"},"total":{"required":false,"tsType":{"name":"number"},"description":"@internal"},"siblings":{"required":false,"tsType":{"name":"Array","elements":[{"name":"string"}],"raw":"Array<string>"},"description":"@internal"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Card/CardContent.tsx"],"group":"Card"},{"filepath":"../src/components/Card/CardCover.tsx","title":"Card.Cover","description":"A component to show a cover image inside a Card.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/card-cover.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Card } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Card>\n    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />\n  </Card>\n);\n\nexport default MyComponent;\n```\n\n@extends Image props https://reactnative.dev/docs/image#props","link":"card-cover","data":{"description":"A component to show a cover image inside a Card.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/card-cover.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Card } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Card>\n    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />\n  </Card>\n);\n\nexport default MyComponent;\n```\n\n@extends Image props https://reactnative.dev/docs/image#props","displayName":"Card.Cover","methods":[],"statics":[],"props":{"index":{"required":false,"tsType":{"name":"number"},"description":"@internal"},"total":{"required":false,"tsType":{"name":"number"},"description":"@internal"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Card/CardCover.tsx"],"group":"Card"},{"filepath":"../src/components/Card/CardTitle.tsx","title":"Card.Title","description":"A component to show a title, subtitle and an avatar inside a Card.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/card-title-1.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar, Card, IconButton } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Card.Title\n    title=\"Card Title\"\n    subtitle=\"Card Subtitle\"\n    left={(props) => <Avatar.Icon {...props} icon=\"folder\" />}\n    right={(props) => <IconButton {...props} icon=\"more-vert\" onPress={() => {}} />}\n  />\n);\n\nexport default MyComponent;\n```","link":"card-title","data":{"description":"A component to show a title, subtitle and an avatar inside a Card.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/card-title-1.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Avatar, Card, IconButton } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Card.Title\n    title=\"Card Title\"\n    subtitle=\"Card Subtitle\"\n    left={(props) => <Avatar.Icon {...props} icon=\"folder\" />}\n    right={(props) => <IconButton {...props} icon=\"more-vert\" onPress={() => {}} />}\n  />\n);\n\nexport default MyComponent;\n```","displayName":"Card.Title","methods":[],"statics":[],"props":{"title":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Text for the title. Note that this will only accept a string or `<Text>`-based node."},"titleStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style for the title."},"titleNumberOfLines":{"required":false,"tsType":{"name":"number"},"description":"Number of lines for the title.","defaultValue":{"value":"1","computed":false}},"titleVariant":{"required":false,"tsType":{"name":"unknown"},"description":"@supported Available in v5.x with theme version 3\n\nTitle text variant defines appropriate text styles for type role and its size.\nAvailable variants:\n\n Display: `displayLarge`, `displayMedium`, `displaySmall`\n\n Headline: `headlineLarge`, `headlineMedium`, `headlineSmall`\n\n Title: `titleLarge`, `titleMedium`, `titleSmall`\n\n Label:  `labelLarge`, `labelMedium`, `labelSmall`\n\n Body: `bodyLarge`, `bodyMedium`, `bodySmall`","defaultValue":{"value":"'bodyLarge'","computed":false}},"subtitle":{"required":false,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Text for the subtitle. Note that this will only accept a string or `<Text>`-based node."},"subtitleStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style for the subtitle."},"subtitleNumberOfLines":{"required":false,"tsType":{"name":"number"},"description":"Number of lines for the subtitle.","defaultValue":{"value":"1","computed":false}},"subtitleVariant":{"required":false,"tsType":{"name":"unknown"},"description":"@supported Available in v5.x with theme version 3\n\nSubtitle text variant defines appropriate text styles for type role and its size.\nAvailable variants:\n\n Display: `displayLarge`, `displayMedium`, `displaySmall`\n\n Headline: `headlineLarge`, `headlineMedium`, `headlineSmall`\n\n Title: `titleLarge`, `titleMedium`, `titleSmall`\n\n Label:  `labelLarge`, `labelMedium`, `labelSmall`\n\n Body: `bodyLarge`, `bodyMedium`, `bodySmall`","defaultValue":{"value":"'bodyMedium'","computed":false}},"left":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { size: number }) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ size: number }","signature":{"properties":[{"key":"size","value":{"name":"number","required":true}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React element to display on the left side."},"leftStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style for the left element wrapper."},"right":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { size: number }) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ size: number }","signature":{"properties":[{"key":"size","value":{"name":"number","required":true}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React element to display on the right side."},"rightStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style for the right element wrapper."},"index":{"required":false,"tsType":{"name":"number"},"description":"@internal"},"total":{"required":false,"tsType":{"name":"number"},"description":"@internal"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Card/CardTitle.tsx"],"group":"Card"},{"filepath":"../src/components/Checkbox/Checkbox.tsx","title":"Checkbox","description":"Checkboxes allow the selection of multiple options from a set.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/checkbox-enabled.android.png\" />\n    <figcaption>Android (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-disabled.android.png\" />\n    <figcaption>Android (disabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-enabled.ios.png\" />\n    <figcaption>iOS (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-disabled.ios.png\" />\n    <figcaption>iOS (disabled)</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Checkbox } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [checked, setChecked] = React.useState(false);\n\n  return (\n    <Checkbox\n      status={checked ? 'checked' : 'unchecked'}\n      onPress={() => {\n        setChecked(!checked);\n      }}\n    />\n  );\n};\n\nexport default MyComponent;\n```","link":"checkbox","data":{"description":"Checkboxes allow the selection of multiple options from a set.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/checkbox-enabled.android.png\" />\n    <figcaption>Android (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-disabled.android.png\" />\n    <figcaption>Android (disabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-enabled.ios.png\" />\n    <figcaption>iOS (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-disabled.ios.png\" />\n    <figcaption>iOS (disabled)</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Checkbox } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [checked, setChecked] = React.useState(false);\n\n  return (\n    <Checkbox\n      status={checked ? 'checked' : 'unchecked'}\n      onPress={() => {\n        setChecked(!checked);\n      }}\n    />\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Checkbox","methods":[],"statics":[],"props":{"status":{"required":true,"tsType":{"name":"union","raw":"'checked' | 'unchecked' | 'indeterminate'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"},{"name":"literal","value":"'indeterminate'"}]},"description":"Status of checkbox."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether checkbox is disabled."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"uncheckedColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for unchecked checkbox."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for checkbox."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Checkbox/Checkbox.tsx"]},{"filepath":"../src/components/Checkbox/CheckboxAndroid.tsx","title":"Checkbox.Android","description":"Checkboxes allow the selection of multiple options from a set.\nThis component follows platform guidelines for Android, but can be used\non any platform.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/checkbox-enabled.android.png\" />\n    <figcaption>Enabled</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-disabled.android.png\" />\n    <figcaption>Disabled</figcaption>\n  </figure>\n</div>","link":"checkbox-android","data":{"description":"Checkboxes allow the selection of multiple options from a set.\nThis component follows platform guidelines for Android, but can be used\non any platform.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/checkbox-enabled.android.png\" />\n    <figcaption>Enabled</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-disabled.android.png\" />\n    <figcaption>Disabled</figcaption>\n  </figure>\n</div>","displayName":"Checkbox.Android","methods":[],"statics":[],"props":{"status":{"required":true,"tsType":{"name":"union","raw":"'checked' | 'unchecked' | 'indeterminate'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"},{"name":"literal","value":"'indeterminate'"}]},"description":"Status of checkbox."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether checkbox is disabled."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"uncheckedColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for unchecked checkbox."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for checkbox."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Checkbox/CheckboxAndroid.tsx"],"group":"Checkbox"},{"filepath":"../src/components/Checkbox/CheckboxIOS.tsx","title":"Checkbox.IOS","description":"Checkboxes allow the selection of multiple options from a set.\nThis component follows platform guidelines for iOS, but can be used\non any platform.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/checkbox-enabled.ios.png\" />\n    <figcaption>Enabled</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-disabled.ios.png\" />\n    <figcaption>Disabled</figcaption>\n  </figure>\n</div>","link":"checkbox-ios","data":{"description":"Checkboxes allow the selection of multiple options from a set.\nThis component follows platform guidelines for iOS, but can be used\non any platform.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/checkbox-enabled.ios.png\" />\n    <figcaption>Enabled</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/checkbox-disabled.ios.png\" />\n    <figcaption>Disabled</figcaption>\n  </figure>\n</div>","displayName":"Checkbox.IOS","methods":[],"statics":[],"props":{"status":{"required":true,"tsType":{"name":"union","raw":"'checked' | 'unchecked' | 'indeterminate'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"},{"name":"literal","value":"'indeterminate'"}]},"description":"Status of checkbox."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether checkbox is disabled."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for checkbox."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Checkbox/CheckboxIOS.tsx"],"group":"Checkbox"},{"filepath":"../src/components/Checkbox/CheckboxItem.tsx","title":"Checkbox.Item","description":"Checkbox.Item allows you to press the whole row (item) instead of only the Checkbox.\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Checkbox } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <View>\n    <Checkbox.Item label=\"Item\" status=\"checked\" />\n  </View>\n);\n\nexport default MyComponent;\n```","link":"checkbox-item","data":{"description":"Checkbox.Item allows you to press the whole row (item) instead of only the Checkbox.\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Checkbox } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <View>\n    <Checkbox.Item label=\"Item\" status=\"checked\" />\n  </View>\n);\n\nexport default MyComponent;\n```","displayName":"Checkbox.Item","methods":[],"statics":[],"props":{"status":{"required":true,"tsType":{"name":"union","raw":"'checked' | 'unchecked' | 'indeterminate'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"},{"name":"literal","value":"'indeterminate'"}]},"description":"Status of checkbox."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether checkbox is disabled."},"label":{"required":true,"tsType":{"name":"string"},"description":"Label to be displayed on the item."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the touchable. This is read by the screen reader when the user taps the touchable.","defaultValue":{"value":"label","computed":true}},"uncheckedColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for unchecked checkbox."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for checkbox."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Additional styles for container View."},"labelStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to Label element."},"labelVariant":{"required":false,"tsType":{"name":"unknown"},"description":"@supported Available in v5.x with theme version 3\n\nLabel text variant defines appropriate text styles for type role and its size.\nAvailable variants:\n\n Display: `displayLarge`, `displayMedium`, `displaySmall`\n\n Headline: `headlineLarge`, `headlineMedium`, `headlineSmall`\n\n Title: `titleLarge`, `titleMedium`, `titleSmall`\n\n Label:  `labelLarge`, `labelMedium`, `labelSmall`\n\n Body: `bodyLarge`, `bodyMedium`, `bodySmall`","defaultValue":{"value":"'bodyLarge'","computed":false}},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."},"position":{"required":false,"tsType":{"name":"union","raw":"'leading' | 'trailing'","elements":[{"name":"literal","value":"'leading'"},{"name":"literal","value":"'trailing'"}]},"description":"Checkbox control position.","defaultValue":{"value":"'trailing'","computed":false}},"mode":{"required":false,"tsType":{"name":"union","raw":"'android' | 'ios'","elements":[{"name":"literal","value":"'android'"},{"name":"literal","value":"'ios'"}]},"description":"Whether `<Checkbox.Android />` or `<Checkbox.IOS />` should be used.\nLeft undefined `<Checkbox />` will be used."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Checkbox/CheckboxItem.tsx"],"group":"Checkbox"},{"filepath":"../src/components/Chip/Chip.tsx","title":"Chip","description":"Chips can be used to display entities in small blocks.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/chip-1.png\" />\n    <figcaption>Flat chip</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/chip-2.png\" />\n    <figcaption>Outlined chip</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Chip } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Chip icon=\"information\" onPress={() => console.log('Pressed')}>Example Chip</Chip>\n);\n\nexport default MyComponent;\n```","link":"chip","data":{"description":"Chips can be used to display entities in small blocks.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/chip-1.png\" />\n    <figcaption>Flat chip</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/chip-2.png\" />\n    <figcaption>Outlined chip</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Chip } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Chip icon=\"information\" onPress={() => console.log('Pressed')}>Example Chip</Chip>\n);\n\nexport default MyComponent;\n```","displayName":"Chip","methods":[],"statics":[],"props":{"mode":{"required":false,"tsType":{"name":"union","raw":"'flat' | 'outlined'","elements":[{"name":"literal","value":"'flat'"},{"name":"literal","value":"'outlined'"}]},"description":"Mode of the chip.\n- `flat` - flat chip without outline.\n- `outlined` - chip with an outline.","defaultValue":{"value":"'flat'","computed":false}},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Text content of the `Chip`."},"icon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon to display for the `Chip`. Both icon and avatar cannot be specified."},"avatar":{"required":false,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Avatar to display for the `Chip`. Both icon and avatar cannot be specified."},"closeIcon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon to display as the close button for the `Chip`. The icon appears only when the onClose prop is specified."},"selected":{"required":false,"tsType":{"name":"boolean"},"description":"Whether chip is selected.","defaultValue":{"value":"false","computed":false}},"selectedColor":{"required":false,"tsType":{"name":"string"},"description":"Whether to style the chip color as selected.\nNote: With theme version 3 `selectedColor` doesn't apply to the `icon`.\n      If you want specify custom color for the `icon`, render your own `Icon` component."},"showSelectedOverlay":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\nWhether to display overlay on selected chip","defaultValue":{"value":"false","computed":false}},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.","defaultValue":{"value":"false","computed":false}},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the chip. This is read by the screen reader when the user taps the chip."},"closeIconAccessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the close icon. This is read by the screen reader when the user taps the close icon.","defaultValue":{"value":"'Close'","computed":false}},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"compact":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\nSets smaller horizontal paddings `12dp` around label, when there is only label."},"elevated":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\nWhether chip should have the elevation.","defaultValue":{"value":"false","computed":false}},"onLongPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Function to execute on long press."},"delayLongPress":{"required":false,"tsType":{"name":"number"},"description":"The number of milliseconds a user must touch the element before executing `onLongPress`."},"onClose":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Function to execute on close button press. The close button appears only when this prop is specified."},"textStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style of chip's text"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"Pass down testID from chip props to touchable for Detox tests."},"ellipsizeMode":{"required":false,"tsType":{"name":"EllipsizeProp"},"description":"Ellipsize Mode for the children text"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Chip/Chip.tsx"]},{"filepath":"../src/components/DataTable/DataTable.tsx","title":"DataTable","description":"Data tables allow displaying sets of data.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"large\" src=\"screenshots/data-table.png\" />\n    <figcaption>Data table</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst optionsPerPage = [2, 3, 4];\n\nconst MyComponent = () => {\n  const [page, setPage] = React.useState<number>(0);\n  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);\n\n  React.useEffect(() => {\n    setPage(0);\n  }, [itemsPerPage]);\n\n  return (\n    <DataTable>\n      <DataTable.Header>\n        <DataTable.Title>Dessert</DataTable.Title>\n        <DataTable.Title numeric>Calories</DataTable.Title>\n        <DataTable.Title numeric>Fat</DataTable.Title>\n      </DataTable.Header>\n\n      <DataTable.Row>\n        <DataTable.Cell>Frozen yogurt</DataTable.Cell>\n        <DataTable.Cell numeric>159</DataTable.Cell>\n        <DataTable.Cell numeric>6.0</DataTable.Cell>\n      </DataTable.Row>\n\n      <DataTable.Row>\n        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>\n        <DataTable.Cell numeric>237</DataTable.Cell>\n        <DataTable.Cell numeric>8.0</DataTable.Cell>\n      </DataTable.Row>\n\n      <DataTable.Pagination\n        page={page}\n        numberOfPages={3}\n        onPageChange={(page) => setPage(page)}\n        label=\"1-2 of 6\"\n        optionsPerPage={optionsPerPage}\n        itemsPerPage={itemsPerPage}\n        setItemsPerPage={setItemsPerPage}\n        showFastPagination\n        optionsLabel={'Rows per page'}\n      />\n    </DataTable>\n  );\n}\n\nexport default MyComponent;\n```","link":"data-table","data":{"description":"Data tables allow displaying sets of data.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"large\" src=\"screenshots/data-table.png\" />\n    <figcaption>Data table</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst optionsPerPage = [2, 3, 4];\n\nconst MyComponent = () => {\n  const [page, setPage] = React.useState<number>(0);\n  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);\n\n  React.useEffect(() => {\n    setPage(0);\n  }, [itemsPerPage]);\n\n  return (\n    <DataTable>\n      <DataTable.Header>\n        <DataTable.Title>Dessert</DataTable.Title>\n        <DataTable.Title numeric>Calories</DataTable.Title>\n        <DataTable.Title numeric>Fat</DataTable.Title>\n      </DataTable.Header>\n\n      <DataTable.Row>\n        <DataTable.Cell>Frozen yogurt</DataTable.Cell>\n        <DataTable.Cell numeric>159</DataTable.Cell>\n        <DataTable.Cell numeric>6.0</DataTable.Cell>\n      </DataTable.Row>\n\n      <DataTable.Row>\n        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>\n        <DataTable.Cell numeric>237</DataTable.Cell>\n        <DataTable.Cell numeric>8.0</DataTable.Cell>\n      </DataTable.Row>\n\n      <DataTable.Pagination\n        page={page}\n        numberOfPages={3}\n        onPageChange={(page) => setPage(page)}\n        label=\"1-2 of 6\"\n        optionsPerPage={optionsPerPage}\n        itemsPerPage={itemsPerPage}\n        setItemsPerPage={setItemsPerPage}\n        showFastPagination\n        optionsLabel={'Rows per page'}\n      />\n    </DataTable>\n  );\n}\n\nexport default MyComponent;\n```","displayName":"DataTable","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `DataTable`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/DataTable/DataTable.tsx"]},{"filepath":"../src/components/DataTable/DataTableCell.tsx","title":"DataTable.Cell","description":"A component to show a single cell inside of a table.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-row-cell.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst MyComponent = () => (\n     <DataTable.Row>\n       <DataTable.Cell numeric>1</DataTable.Cell>\n       <DataTable.Cell numeric>2</DataTable.Cell>\n       <DataTable.Cell numeric>3</DataTable.Cell>\n       <DataTable.Cell numeric>4</DataTable.Cell>\n     </DataTable.Row>\n);\n\nexport default MyComponent;\n```\n\nIf you want to support multiline text, please use View instead, as multiline text doesn't comply with\nMD Guidelines (https://github.com/callstack/react-native-paper/issues/2381).","link":"data-table-cell","data":{"description":"A component to show a single cell inside of a table.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-row-cell.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst MyComponent = () => (\n     <DataTable.Row>\n       <DataTable.Cell numeric>1</DataTable.Cell>\n       <DataTable.Cell numeric>2</DataTable.Cell>\n       <DataTable.Cell numeric>3</DataTable.Cell>\n       <DataTable.Cell numeric>4</DataTable.Cell>\n     </DataTable.Row>\n);\n\nexport default MyComponent;\n```\n\nIf you want to support multiline text, please use View instead, as multiline text doesn't comply with\nMD Guidelines (https://github.com/callstack/react-native-paper/issues/2381).","displayName":"DataTable.Cell","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `DataTableCell`."},"numeric":{"required":false,"tsType":{"name":"boolean"},"description":"Align the text to the right. Generally monetary or number fields are aligned to right."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"textStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Text content style of the `DataTableCell`."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/DataTable/DataTableCell.tsx"],"group":"DataTable"},{"filepath":"../src/components/DataTable/DataTableHeader.tsx","title":"DataTable.Header","description":"A component to display title in table header.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-header.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst MyComponent = () => (\n      <DataTable>\n        <DataTable.Header>\n          <DataTable.Title\n            sortDirection='descending'\n          >\n            Dessert\n          </DataTable.Title>\n          <DataTable.Title numeric>Calories</DataTable.Title>\n          <DataTable.Title numeric>Fat (g)</DataTable.Title>\n        </DataTable.Header>\n      </DataTable>\n);\n\nexport default MyComponent;\n```","link":"data-table-header","data":{"description":"A component to display title in table header.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-header.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst MyComponent = () => (\n      <DataTable>\n        <DataTable.Header>\n          <DataTable.Title\n            sortDirection='descending'\n          >\n            Dessert\n          </DataTable.Title>\n          <DataTable.Title numeric>Calories</DataTable.Title>\n          <DataTable.Title numeric>Fat (g)</DataTable.Title>\n        </DataTable.Header>\n      </DataTable>\n);\n\nexport default MyComponent;\n```","displayName":"DataTable.Header","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `DataTableHeader`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/DataTable/DataTableHeader.tsx"],"group":"DataTable"},{"filepath":"../src/components/DataTable/DataTablePagination.tsx","title":"DataTable.Pagination","description":"A component to show pagination for data table.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-pagination.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst numberOfItemsPerPageList = [2, 3, 4];\n\nconst items = [\n  {\n    key: 1,\n    name: 'Page 1',\n  },\n  {\n    key: 2,\n    name: 'Page 2',\n  },\n  {\n    key: 3,\n    name: 'Page 3',\n  },\n];\n\nconst MyComponent = () => {\n  const [page, setPage] = React.useState(0);\n  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);\n  const from = page * numberOfItemsPerPage;\n  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);\n\n  React.useEffect(() => {\n     setPage(0);\n  }, [numberOfItemsPerPage]);\n\n  return (\n    <DataTable>\n      <DataTable.Pagination\n        page={page}\n        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}\n        onPageChange={page => setPage(page)}\n        label={`${from + 1}-${to} of ${items.length}`}\n        showFastPaginationControls\n        numberOfItemsPerPageList={numberOfItemsPerPageList}\n        numberOfItemsPerPage={numberOfItemsPerPage}\n        onItemsPerPageChange={onItemsPerPageChange}\n        selectPageDropdownLabel={'Rows per page'}\n      />\n    </DataTable>\n  );\n};\n\nexport default MyComponent;\n```","link":"data-table-pagination","data":{"description":"A component to show pagination for data table.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-pagination.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst numberOfItemsPerPageList = [2, 3, 4];\n\nconst items = [\n  {\n    key: 1,\n    name: 'Page 1',\n  },\n  {\n    key: 2,\n    name: 'Page 2',\n  },\n  {\n    key: 3,\n    name: 'Page 3',\n  },\n];\n\nconst MyComponent = () => {\n  const [page, setPage] = React.useState(0);\n  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);\n  const from = page * numberOfItemsPerPage;\n  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);\n\n  React.useEffect(() => {\n     setPage(0);\n  }, [numberOfItemsPerPage]);\n\n  return (\n    <DataTable>\n      <DataTable.Pagination\n        page={page}\n        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}\n        onPageChange={page => setPage(page)}\n        label={`${from + 1}-${to} of ${items.length}`}\n        showFastPaginationControls\n        numberOfItemsPerPageList={numberOfItemsPerPageList}\n        numberOfItemsPerPage={numberOfItemsPerPage}\n        onItemsPerPageChange={onItemsPerPageChange}\n        selectPageDropdownLabel={'Rows per page'}\n      />\n    </DataTable>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"DataTable.Pagination","methods":[],"statics":[],"props":{"page":{"required":true,"tsType":{"name":"number"},"description":"The currently visible page (starting with 0)."},"numberOfPages":{"required":true,"tsType":{"name":"number"},"description":"The total number of pages."},"onPageChange":{"required":true,"tsType":{"name":"signature","type":"function","raw":"(page: number) => void","signature":{"arguments":[{"name":"page","type":{"name":"number"}}],"return":{"name":"void"}}},"description":"Function to execute on page change."},"showFastPaginationControls":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to show fast forward and fast rewind buttons in pagination. False by default.","defaultValue":{"value":"false","computed":false}},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"numberOfItemsPerPage":{"required":false,"tsType":{"name":"number"},"description":"The current number of rows per page."},"numberOfItemsPerPageList":{"required":false,"tsType":{"name":"Array","elements":[{"name":"number"}],"raw":"Array<number>"},"description":"Options for a number of rows per page to choose from."},"onItemsPerPageChange":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(numberOfItemsPerPage: number) => void","signature":{"arguments":[{"name":"numberOfItemsPerPage","type":{"name":"number"}}],"return":{"name":"void"}}},"description":"The function to set the number of rows per page."},"label":{"required":false,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Label text to display which indicates current pagination."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"AccessibilityLabel for `label`."},"selectPageDropdownLabel":{"required":false,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Label text for select page dropdown to display."},"selectPageDropdownAccessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"AccessibilityLabel for `selectPageDropdownLabel`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/DataTable/DataTablePagination.tsx"],"group":"DataTable"},{"filepath":"../src/components/DataTable/DataTableRow.tsx","title":"DataTable.Row","description":"A component to show a single row inside of a table.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-row-cell.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst MyComponent = () => (\n     <DataTable.Row>\n       <DataTable.Cell numeric>1</DataTable.Cell>\n       <DataTable.Cell numeric>2</DataTable.Cell>\n       <DataTable.Cell numeric>3</DataTable.Cell>\n       <DataTable.Cell numeric>4</DataTable.Cell>\n     </DataTable.Row>\n);\n\nexport default MyComponent;\n```","link":"data-table-row","data":{"description":"A component to show a single row inside of a table.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-row-cell.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst MyComponent = () => (\n     <DataTable.Row>\n       <DataTable.Cell numeric>1</DataTable.Cell>\n       <DataTable.Cell numeric>2</DataTable.Cell>\n       <DataTable.Cell numeric>3</DataTable.Cell>\n       <DataTable.Cell numeric>4</DataTable.Cell>\n     </DataTable.Row>\n);\n\nexport default MyComponent;\n```","displayName":"DataTable.Row","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `DataTableRow`."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"pointerEvents":{"required":false,"tsType":{"name":"ViewProps['pointerEvents']","raw":"ViewProps['pointerEvents']"},"description":"`pointerEvents` passed to the `View` container, which is wrapping children within `TouchableRipple`."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/DataTable/DataTableRow.tsx"],"group":"DataTable"},{"filepath":"../src/components/DataTable/DataTableTitle.tsx","title":"DataTable.Title","description":"A component to display title in table header.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-header.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst MyComponent = () => (\n      <DataTable>\n        <DataTable.Header>\n          <DataTable.Title\n            sortDirection='descending'\n          >\n            Dessert\n          </DataTable.Title>\n          <DataTable.Title numeric>Calories</DataTable.Title>\n          <DataTable.Title numeric>Fat (g)</DataTable.Title>\n        </DataTable.Header>\n      </DataTable>\n);\n\nexport default MyComponent;\n```","link":"data-table-title","data":{"description":"A component to display title in table header.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/data-table-header.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { DataTable } from 'react-native-paper';\n\nconst MyComponent = () => (\n      <DataTable>\n        <DataTable.Header>\n          <DataTable.Title\n            sortDirection='descending'\n          >\n            Dessert\n          </DataTable.Title>\n          <DataTable.Title numeric>Calories</DataTable.Title>\n          <DataTable.Title numeric>Fat (g)</DataTable.Title>\n        </DataTable.Header>\n      </DataTable>\n);\n\nexport default MyComponent;\n```","displayName":"DataTable.Title","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Text content of the `DataTableTitle`."},"numeric":{"required":false,"tsType":{"name":"boolean"},"description":"Align the text to the right. Generally monetary or number fields are aligned to right."},"sortDirection":{"required":false,"tsType":{"name":"union","raw":"'ascending' | 'descending'","elements":[{"name":"literal","value":"'ascending'"},{"name":"literal","value":"'descending'"}]},"description":"Direction of sorting. An arrow indicating the direction is displayed when this is given."},"numberOfLines":{"required":false,"tsType":{"name":"number"},"description":"The number of lines to show.","defaultValue":{"value":"1","computed":false}},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"textStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Text content style of the `DataTableTitle`."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/DataTable/DataTableTitle.tsx"],"group":"DataTable"},{"filepath":"../src/components/Dialog/Dialog.tsx","title":"Dialog","description":"Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.\nTo render the `Dialog` above other components, you'll need to wrap it with the [`Portal`](portal.html) component.\n\n <div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/dialog-1.png\" />\n  <img class=\"small\" src=\"screenshots/dialog-2.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const showDialog = () => setVisible(true);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Provider>\n      <View>\n        <Button onPress={showDialog}>Show Dialog</Button>\n        <Portal>\n          <Dialog visible={visible} onDismiss={hideDialog}>\n            <Dialog.Title>Alert</Dialog.Title>\n            <Dialog.Content>\n              <Text variant=\"bodyMedium\">This is simple dialog</Text>\n            </Dialog.Content>\n            <Dialog.Actions>\n              <Button onPress={hideDialog}>Done</Button>\n            </Dialog.Actions>\n          </Dialog>\n        </Portal>\n      </View>\n    </Provider>\n  );\n};\n\nexport default MyComponent;\n```","link":"dialog","data":{"description":"Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.\nTo render the `Dialog` above other components, you'll need to wrap it with the [`Portal`](portal.html) component.\n\n <div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/dialog-1.png\" />\n  <img class=\"small\" src=\"screenshots/dialog-2.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const showDialog = () => setVisible(true);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Provider>\n      <View>\n        <Button onPress={showDialog}>Show Dialog</Button>\n        <Portal>\n          <Dialog visible={visible} onDismiss={hideDialog}>\n            <Dialog.Title>Alert</Dialog.Title>\n            <Dialog.Content>\n              <Text variant=\"bodyMedium\">This is simple dialog</Text>\n            </Dialog.Content>\n            <Dialog.Actions>\n              <Button onPress={hideDialog}>Done</Button>\n            </Dialog.Actions>\n          </Dialog>\n        </Portal>\n      </View>\n    </Provider>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Dialog","methods":[],"statics":[],"props":{"dismissable":{"required":false,"tsType":{"name":"boolean"},"description":"Determines whether clicking outside the dialog dismiss it.","defaultValue":{"value":"true","computed":false}},"onDismiss":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Callback that is called when the user dismisses the dialog."},"visible":{"required":false,"tsType":{"name":"boolean"},"description":"Determines Whether the dialog is visible.","defaultValue":{"value":"false","computed":false}},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `Dialog`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Dialog/Dialog.tsx"]},{"filepath":"../src/components/Dialog/DialogActions.tsx","title":"Dialog.Actions","description":"A component to show a list of actions in a Dialog.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/dialog-actions.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Button, Dialog, Portal } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.Actions>\n          <Button onPress={() => console.log('Cancel')}>Cancel</Button>\n          <Button onPress={() => console.log('Ok')}>Ok</Button>\n        </Dialog.Actions>\n      </Dialog>\n    </Portal>\n  );\n};\n\nexport default MyComponent;\n```","link":"dialog-actions","data":{"description":"A component to show a list of actions in a Dialog.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/dialog-actions.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Button, Dialog, Portal } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.Actions>\n          <Button onPress={() => console.log('Cancel')}>Cancel</Button>\n          <Button onPress={() => console.log('Ok')}>Ok</Button>\n        </Dialog.Actions>\n      </Dialog>\n    </Portal>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Dialog.Actions","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `DialogActions`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Dialog/DialogActions.tsx"],"group":"Dialog"},{"filepath":"../src/components/Dialog/DialogContent.tsx","title":"Dialog.Content","description":"A component to show content in a Dialog.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/dialog-content.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Dialog, Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.Content>\n          <Text variant=\"bodyMedium\">This is simple dialog</Text>\n        </Dialog.Content>\n      </Dialog>\n    </Portal>\n  );\n};\n\nexport default MyComponent;\n```","link":"dialog-content","data":{"description":"A component to show content in a Dialog.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/dialog-content.png\" />\n  </figure>\n</div>\n\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Dialog, Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.Content>\n          <Text variant=\"bodyMedium\">This is simple dialog</Text>\n        </Dialog.Content>\n      </Dialog>\n    </Portal>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Dialog.Content","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `DialogContent`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Dialog/DialogContent.tsx"],"group":"Dialog"},{"filepath":"../src/components/Dialog/DialogIcon.tsx","title":"Dialog.Icon","description":"@supported Available in v5.x with theme version 3\nA component to show an icon in a Dialog.\n\n <div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/dialog-icon.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { StyleSheet } from 'react-native';\nimport { Dialog, Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.Icon icon=\"alert\" />\n        <Dialog.Title style={styles.title}>This is a title</Dialog.Title>\n        <Dialog.Content>\n          <Text variant=\"bodyMedium\">This is simple dialog</Text>\n        </Dialog.Content>\n      </Dialog>\n    </Portal>\n  );\n};\n\nconst styles = StyleSheet.create({\n  title: {\n    textAlign: 'center',\n  },\n})\n\nexport default MyComponent;\n```","link":"dialog-icon","data":{"description":"@supported Available in v5.x with theme version 3\nA component to show an icon in a Dialog.\n\n <div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/dialog-icon.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { StyleSheet } from 'react-native';\nimport { Dialog, Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.Icon icon=\"alert\" />\n        <Dialog.Title style={styles.title}>This is a title</Dialog.Title>\n        <Dialog.Content>\n          <Text variant=\"bodyMedium\">This is simple dialog</Text>\n        </Dialog.Content>\n      </Dialog>\n    </Portal>\n  );\n};\n\nconst styles = StyleSheet.create({\n  title: {\n    textAlign: 'center',\n  },\n})\n\nexport default MyComponent;\n```","displayName":"Dialog.Icon","methods":[],"statics":[],"props":{"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for action icon."},"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"Name of the icon to show."},"size":{"required":false,"tsType":{"name":"number"},"description":"Optional icon size.","defaultValue":{"value":"24","computed":false}},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Dialog/DialogIcon.tsx"],"group":"Dialog"},{"filepath":"../src/components/Dialog/DialogScrollArea.tsx","title":"Dialog.ScrollArea","description":"A component to show a scrollable content in a Dialog. The component only provides appropriate styling.\nFor the scrollable content you can use `ScrollView`, `FlatList` etc. depending on your requirement.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/dialog-scroll-area.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ScrollView } from 'react-native';\nimport { Dialog, Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.ScrollArea>\n          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>\n            <Text>This is a scrollable area</Text>\n          </ScrollView>\n        </Dialog.ScrollArea>\n      </Dialog>\n    </Portal>\n  );\n};\n\nexport default MyComponent;\n```","link":"dialog-scroll-area","data":{"description":"A component to show a scrollable content in a Dialog. The component only provides appropriate styling.\nFor the scrollable content you can use `ScrollView`, `FlatList` etc. depending on your requirement.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/dialog-scroll-area.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ScrollView } from 'react-native';\nimport { Dialog, Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.ScrollArea>\n          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>\n            <Text>This is a scrollable area</Text>\n          </ScrollView>\n        </Dialog.ScrollArea>\n      </Dialog>\n    </Portal>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Dialog.ScrollArea","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `DialogScrollArea`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Dialog/DialogScrollArea.tsx"],"group":"Dialog"},{"filepath":"../src/components/Dialog/DialogTitle.tsx","title":"Dialog.Title","description":"A component to show a title in a Dialog.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/dialog-title.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Dialog, Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.Title>This is a title</Dialog.Title>\n        <Dialog.Content>\n          <Text variant=\"bodyMedium\">This is simple dialog</Text>\n        </Dialog.Content>\n      </Dialog>\n    </Portal>\n  );\n};\n\nexport default MyComponent;\n```","link":"dialog-title","data":{"description":"A component to show a title in a Dialog.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/dialog-title.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Dialog, Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const hideDialog = () => setVisible(false);\n\n  return (\n    <Portal>\n      <Dialog visible={visible} onDismiss={hideDialog}>\n        <Dialog.Title>This is a title</Dialog.Title>\n        <Dialog.Content>\n          <Text variant=\"bodyMedium\">This is simple dialog</Text>\n        </Dialog.Content>\n      </Dialog>\n    </Portal>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Dialog.Title","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Title text for the `DialogTitle`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Dialog/DialogTitle.tsx"],"group":"Dialog"},{"filepath":"../src/components/Divider.tsx","title":"Divider","description":"A divider is a thin, lightweight separator that groups content in lists and page layouts.\n\n<div class=\"screenshots\">\n <figure>\n   <img class=\"medium\" src=\"screenshots/divider.png\" />\n </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Divider, Text } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <View>\n    <Text>Lemon</Text>\n    <Divider />\n    <Text>Mango</Text>\n    <Divider />\n  </View>\n);\n\nexport default MyComponent;\n```","link":"divider","data":{"description":"A divider is a thin, lightweight separator that groups content in lists and page layouts.\n\n<div class=\"screenshots\">\n <figure>\n   <img class=\"medium\" src=\"screenshots/divider.png\" />\n </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Divider, Text } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <View>\n    <Text>Lemon</Text>\n    <Divider />\n    <Text>Mango</Text>\n    <Divider />\n  </View>\n);\n\nexport default MyComponent;\n```","displayName":"Divider","methods":[],"statics":[],"props":{"leftInset":{"required":false,"tsType":{"name":"boolean"},"description":"@renamed Renamed from 'inset' to 'leftInset` in v5.x\nWhether divider has a left inset."},"horizontalInset":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\n Whether divider has a horizontal inset on both sides.","defaultValue":{"value":"false","computed":false}},"bold":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\n Whether divider should be bolded.","defaultValue":{"value":"false","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Divider.tsx"]},{"filepath":"../src/components/Drawer/DrawerCollapsedItem.tsx","title":"Drawer.CollapsedItem","description":"@supported Available in v5.x with theme version 3\nCollapsed component used to show an action item with an icon and optionally label in a navigation drawer.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/drawer-collapsed.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Drawer } from 'react-native-paper';\n\nconst MyComponent = () => (\n   <Drawer.CollapsedItem\n     focusedIcon=\"inbox\"\n     unfocusedIcon=\"inbox-outline\"\n     label=\"Inbox\"\n   />\n);\n\nexport default MyComponent;\n```","link":"drawer-collapsed-item","data":{"description":"@supported Available in v5.x with theme version 3\nCollapsed component used to show an action item with an icon and optionally label in a navigation drawer.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/drawer-collapsed.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Drawer } from 'react-native-paper';\n\nconst MyComponent = () => (\n   <Drawer.CollapsedItem\n     focusedIcon=\"inbox\"\n     unfocusedIcon=\"inbox-outline\"\n     label=\"Inbox\"\n   />\n);\n\nexport default MyComponent;\n```","displayName":"Drawer.CollapsedItem","methods":[],"statics":[],"props":{"label":{"required":false,"tsType":{"name":"string"},"description":"The label text of the item."},"badge":{"required":false,"tsType":{"name":"union","raw":"string | number | boolean","elements":[{"name":"string"},{"name":"number"},{"name":"boolean"}]},"description":"Badge to show on the icon, can be `true` to show a dot, `string` or `number` to show text.","defaultValue":{"value":"false","computed":false}},"focusedIcon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon to use as the focused destination icon, can be a string, an image source or a react component @renamed Renamed from 'icon' to 'focusedIcon' in v5.x"},"unfocusedIcon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon to use as the unfocused destination icon, can be a string, an image source or a react component @renamed Renamed from 'icon' to 'focusedIcon' in v5.x"},"active":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to highlight the drawer item as active."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the button. This is read by the screen reader when the user taps the button."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"TestID used for testing purposes","defaultValue":{"value":"'drawer-collapsed-item'","computed":false}}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Drawer/DrawerCollapsedItem.tsx"],"group":"Drawer"},{"filepath":"../src/components/Drawer/DrawerItem.tsx","title":"Drawer.Item","description":"A component used to show an action item with an icon and a label in a navigation drawer.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/drawer-item.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Drawer } from 'react-native-paper';\n\nconst MyComponent = () => (\n   <Drawer.Item\n     style={{ backgroundColor: '#64ffda' }}\n     icon=\"star\"\n     label=\"First Item\"\n   />\n);\n\nexport default MyComponent;\n```","link":"drawer-item","data":{"description":"A component used to show an action item with an icon and a label in a navigation drawer.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/drawer-item.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Drawer } from 'react-native-paper';\n\nconst MyComponent = () => (\n   <Drawer.Item\n     style={{ backgroundColor: '#64ffda' }}\n     icon=\"star\"\n     label=\"First Item\"\n   />\n);\n\nexport default MyComponent;\n```","displayName":"Drawer.Item","methods":[],"statics":[],"props":{"label":{"required":true,"tsType":{"name":"string"},"description":"The label text of the item."},"icon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon to display for the `DrawerItem`."},"active":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to highlight the drawer item as active."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the button. This is read by the screen reader when the user taps the button."},"right":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { color: string }) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ color: string }","signature":{"properties":[{"key":"color","value":{"name":"string","required":true}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React element to display on the right side. For instance a Badge."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Drawer/DrawerItem.tsx"],"group":"Drawer"},{"filepath":"../src/components/Drawer/DrawerSection.tsx","title":"Drawer.Section","description":"A component to group content inside a navigation drawer.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/drawer-section.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Drawer } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [active, setActive] = React.useState('');\n\n  return (\n    <Drawer.Section title=\"Some title\">\n      <Drawer.Item\n        label=\"First Item\"\n        active={active === 'first'}\n        onPress={() => setActive('first')}\n      />\n      <Drawer.Item\n        label=\"Second Item\"\n        active={active === 'second'}\n        onPress={() => setActive('second')}\n      />\n    </Drawer.Section>\n  );\n};\n\nexport default MyComponent;\n```","link":"drawer-section","data":{"description":"A component to group content inside a navigation drawer.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/drawer-section.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Drawer } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [active, setActive] = React.useState('');\n\n  return (\n    <Drawer.Section title=\"Some title\">\n      <Drawer.Item\n        label=\"First Item\"\n        active={active === 'first'}\n        onPress={() => setActive('first')}\n      />\n      <Drawer.Item\n        label=\"Second Item\"\n        active={active === 'second'}\n        onPress={() => setActive('second')}\n      />\n    </Drawer.Section>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Drawer.Section","methods":[],"statics":[],"props":{"title":{"required":false,"tsType":{"name":"string"},"description":"Title to show as the header for the section."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `Drawer.Section`."},"showDivider":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to show `Divider` at the end of the section. True by default.","defaultValue":{"value":"true","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Drawer/DrawerSection.tsx"],"group":"Drawer"},{"filepath":"../src/components/FAB/FAB.tsx","title":"FAB","description":"A floating action button represents the primary action in an application.\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/fab-1.png\" />\n  <img class=\"small\" src=\"screenshots/fab-2.png\" />\n  <img class=\"small\" src=\"screenshots/fab-3.png\" />\n  <img class=\"small\" src=\"screenshots/fab-4.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { StyleSheet } from 'react-native';\nimport { FAB } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <FAB\n    icon=\"plus\"\n    style={styles.fab}\n    onPress={() => console.log('Pressed')}\n  />\n);\n\nconst styles = StyleSheet.create({\n  fab: {\n    position: 'absolute',\n    margin: 16,\n    right: 0,\n    bottom: 0,\n  },\n})\n\nexport default MyComponent;\n```","link":"fab","data":{"description":"A floating action button represents the primary action in an application.\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/fab-1.png\" />\n  <img class=\"small\" src=\"screenshots/fab-2.png\" />\n  <img class=\"small\" src=\"screenshots/fab-3.png\" />\n  <img class=\"small\" src=\"screenshots/fab-4.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { StyleSheet } from 'react-native';\nimport { FAB } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <FAB\n    icon=\"plus\"\n    style={styles.fab}\n    onPress={() => console.log('Pressed')}\n  />\n);\n\nconst styles = StyleSheet.create({\n  fab: {\n    position: 'absolute',\n    margin: 16,\n    right: 0,\n    bottom: 0,\n  },\n})\n\nexport default MyComponent;\n```","displayName":"FAB","methods":[],"statics":[],"props":{"icon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon to display for the `FAB`. It's optional only if `label` is defined."},"label":{"required":false,"tsType":{"name":"string"},"description":"Optional label for extended `FAB`. It's optional only if `icon` is defined."},"uppercase":{"required":false,"tsType":{"name":"boolean"},"description":"Make the label text uppercased."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the FAB. This is read by the screen reader when the user taps the FAB.\nUses `label` by default if specified.","defaultValue":{"value":"label","computed":true}},"accessibilityState":{"required":false,"tsType":{"name":"AccessibilityState"},"description":"Accessibility state for the FAB. This is read by the screen reader when the user taps the FAB."},"animated":{"required":false,"tsType":{"name":"boolean"},"description":"Whether an icon change is animated.","defaultValue":{"value":"true","computed":false}},"small":{"required":false,"tsType":{"name":"boolean"},"description":"@deprecated Deprecated in v.3x - use prop size=\"small\".\n\n Whether FAB is mini-sized, used to create visual continuity with other elements. This has no effect if `label` is specified."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for the icon and label of the `FAB`."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether `FAB` is disabled. A disabled button is greyed out and `onPress` is not called on touch."},"visible":{"required":false,"tsType":{"name":"boolean"},"description":"Whether `FAB` is currently visible.","defaultValue":{"value":"true","computed":false}},"loading":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to show a loading indicator."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"onLongPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Function to execute on long press."},"delayLongPress":{"required":false,"tsType":{"name":"number"},"description":"The number of milliseconds a user must touch the element before executing `onLongPress`."},"size":{"required":false,"tsType":{"name":"union","raw":"'small' | 'medium' | 'large'","elements":[{"name":"literal","value":"'small'"},{"name":"literal","value":"'medium'"},{"name":"literal","value":"'large'"}]},"description":"@supported Available in v5.x with theme version 3\n\nSize of the `FAB`.\n- `small` - FAB with small height (40).\n- `medium` - FAB with default medium height (56).\n- `large` - FAB with large height (96).","defaultValue":{"value":"'medium'","computed":false}},"customSize":{"required":false,"tsType":{"name":"number"},"description":"Custom size for the `FAB`. This prop takes precedence over size prop"},"mode":{"required":false,"tsType":{"name":"union","raw":"'flat' | 'elevated'","elements":[{"name":"literal","value":"'flat'"},{"name":"literal","value":"'elevated'"}]},"description":"@supported Available in v5.x with theme version 3\n\nMode of the `FAB`. You can change the mode to adjust the the shadow:\n- `flat` - button without a shadow.\n- `elevated` - button with a shadow.","defaultValue":{"value":"'elevated'","computed":false}},"variant":{"required":false,"tsType":{"name":"union","raw":"'primary' | 'secondary' | 'tertiary' | 'surface'","elements":[{"name":"literal","value":"'primary'"},{"name":"literal","value":"'secondary'"},{"name":"literal","value":"'tertiary'"},{"name":"literal","value":"'surface'"}]},"description":"@supported Available in v5.x with theme version 3\n\nColor mappings variant for combinations of container and icon colors.","defaultValue":{"value":"'primary'","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"","defaultValue":{"value":"'fab'","computed":false}},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<View>","elements":[{"name":"View"}]},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/FAB/FAB.tsx"]},{"filepath":"../src/components/FAB/FABGroup.tsx","title":"FAB.Group","description":"A component to display a stack of FABs with related actions in a speed dial.\nTo render the group above other components, you'll need to wrap it with the [`Portal`](portal.html) component.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/fab-group.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { FAB, Portal, Provider } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [state, setState] = React.useState({ open: false });\n\n  const onStateChange = ({ open }) => setState({ open });\n\n  const { open } = state;\n\n  return (\n    <Provider>\n      <Portal>\n        <FAB.Group\n          open={open}\n          visible\n          icon={open ? 'calendar-today' : 'plus'}\n          actions={[\n            { icon: 'plus', onPress: () => console.log('Pressed add') },\n            {\n              icon: 'star',\n              label: 'Star',\n              onPress: () => console.log('Pressed star'),\n            },\n            {\n              icon: 'email',\n              label: 'Email',\n              onPress: () => console.log('Pressed email'),\n            },\n            {\n              icon: 'bell',\n              label: 'Remind',\n              onPress: () => console.log('Pressed notifications'),\n            },\n          ]}\n          onStateChange={onStateChange}\n          onPress={() => {\n            if (open) {\n              // do something if the speed dial is open\n            }\n          }}\n        />\n      </Portal>\n    </Provider>\n  );\n};\n\nexport default MyComponent;\n```","link":"fab-group","data":{"description":"A component to display a stack of FABs with related actions in a speed dial.\nTo render the group above other components, you'll need to wrap it with the [`Portal`](portal.html) component.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/fab-group.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { FAB, Portal, Provider } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [state, setState] = React.useState({ open: false });\n\n  const onStateChange = ({ open }) => setState({ open });\n\n  const { open } = state;\n\n  return (\n    <Provider>\n      <Portal>\n        <FAB.Group\n          open={open}\n          visible\n          icon={open ? 'calendar-today' : 'plus'}\n          actions={[\n            { icon: 'plus', onPress: () => console.log('Pressed add') },\n            {\n              icon: 'star',\n              label: 'Star',\n              onPress: () => console.log('Pressed star'),\n            },\n            {\n              icon: 'email',\n              label: 'Email',\n              onPress: () => console.log('Pressed email'),\n            },\n            {\n              icon: 'bell',\n              label: 'Remind',\n              onPress: () => console.log('Pressed notifications'),\n            },\n          ]}\n          onStateChange={onStateChange}\n          onPress={() => {\n            if (open) {\n              // do something if the speed dial is open\n            }\n          }}\n        />\n      </Portal>\n    </Provider>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"FAB.Group","methods":[],"statics":[],"props":{"actions":{"required":true,"tsType":{"name":"Array","elements":[{"name":"signature","type":"object","raw":"{\n  icon: IconSource;\n  label?: string;\n  color?: string;\n  labelTextColor?: string;\n  accessibilityLabel?: string;\n  accessibilityHint?: string;\n  style?: StyleProp<ViewStyle>;\n  containerStyle?: StyleProp<ViewStyle>;\n  labelStyle?: StyleProp<TextStyle>;\n  onPress: (e: GestureResponderEvent) => void;\n  size?: 'small' | 'medium';\n  testID?: string;\n}","signature":{"properties":[{"key":"icon","value":{"name":"IconSource","required":true}},{"key":"label","value":{"name":"string","required":false}},{"key":"color","value":{"name":"string","required":false}},{"key":"labelTextColor","value":{"name":"string","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"accessibilityHint","value":{"name":"string","required":false}},{"key":"style","value":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>","required":false}},{"key":"containerStyle","value":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>","required":false}},{"key":"labelStyle","value":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>","required":false}},{"key":"onPress","value":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}},"required":true}},{"key":"size","value":{"name":"union","raw":"'small' | 'medium'","elements":[{"name":"literal","value":"'small'"},{"name":"literal","value":"'medium'"}],"required":false}},{"key":"testID","value":{"name":"string","required":false}}]}}],"raw":"Array<{\n  icon: IconSource;\n  label?: string;\n  color?: string;\n  labelTextColor?: string;\n  accessibilityLabel?: string;\n  accessibilityHint?: string;\n  style?: StyleProp<ViewStyle>;\n  containerStyle?: StyleProp<ViewStyle>;\n  labelStyle?: StyleProp<TextStyle>;\n  onPress: (e: GestureResponderEvent) => void;\n  size?: 'small' | 'medium';\n  testID?: string;\n}>"},"description":"Action items to display in the form of a speed dial.\nAn action item should contain the following properties:\n- `icon`: icon to display (required)\n- `label`: optional label text\n- `color`: custom icon color of the action item\n- `labelTextColor`: custom label text color of the action item\n- `accessibilityLabel`: accessibility label for the action, uses label by default if specified\n- `accessibilityHint`: accessibility hint for the action\n- `style`: pass additional styles for the fab item, for example, `backgroundColor`\n- `containerStyle`: pass additional styles for the fab item label container, for example, `backgroundColor` @supported Available in 5.x\n- `labelStyle`: pass additional styles for the fab item label, for example, `fontSize`\n- `onPress`: callback that is called when `FAB` is pressed (required)\n- `size`: size of action item. Defaults to `small`. @supported Available in v5.x\n- `testID`: testID to be used on tests"},"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"Icon to display for the `FAB`.\nYou can toggle it based on whether the speed dial is open to display a different icon."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the FAB. This is read by the screen reader when the user taps the FAB."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for the `FAB`."},"backdropColor":{"required":false,"tsType":{"name":"string"},"description":"Custom backdrop color for opened speed dial background."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on pressing the `FAB`."},"open":{"required":true,"tsType":{"name":"boolean"},"description":"Whether the speed dial is open."},"onStateChange":{"required":true,"tsType":{"name":"signature","type":"function","raw":"(state: { open: boolean }) => void","signature":{"arguments":[{"name":"state","type":{"name":"signature","type":"object","raw":"{ open: boolean }","signature":{"properties":[{"key":"open","value":{"name":"boolean","required":true}}]}}}],"return":{"name":"void"}}},"description":"Callback which is called on opening and closing the speed dial.\nThe open state needs to be updated when it's called, otherwise the change is dropped."},"visible":{"required":true,"tsType":{"name":"boolean"},"description":"Whether `FAB` is currently visible."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style for the group. You can use it to pass additional styles if you need.\nFor example, you can set an additional padding if you have a tab bar at the bottom."},"fabStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style for the FAB. It allows to pass the FAB button styles, such as backgroundColor."},"variant":{"required":false,"tsType":{"name":"union","raw":"'primary' | 'secondary' | 'tertiary' | 'surface'","elements":[{"name":"literal","value":"'primary'"},{"name":"literal","value":"'secondary'"},{"name":"literal","value":"'tertiary'"},{"name":"literal","value":"'surface'"}]},"description":"@supported Available in v5.x with theme version 3\n\nColor mappings variant for combinations of container and icon colors.","defaultValue":{"value":"'primary'","computed":false}},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"label":{"required":false,"tsType":{"name":"string"},"description":"Optional label for `FAB`."},"testID":{"required":false,"tsType":{"name":"string"},"description":"Pass down testID from Group props to FAB."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/FAB/FABGroup.tsx"],"group":"FAB"},{"filepath":"../src/components/HelperText.tsx","title":"HelperText","description":"Helper text is used in conjuction with input elements to provide additional hints for the user.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/helper-text.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { HelperText, TextInput } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [text, setText] = React.useState('');\n\n   const onChangeText = text => setText(text);\n\n  const hasErrors = () => {\n    return !text.includes('@');\n  };\n\n return (\n    <View>\n      <TextInput label=\"Email\" value={text} onChangeText={onChangeText} />\n      <HelperText type=\"error\" visible={hasErrors()}>\n        Email address is invalid!\n      </HelperText>\n    </View>\n  );\n};\n\nexport default MyComponent;\n```","link":"helper-text","data":{"description":"Helper text is used in conjuction with input elements to provide additional hints for the user.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/helper-text.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { HelperText, TextInput } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [text, setText] = React.useState('');\n\n   const onChangeText = text => setText(text);\n\n  const hasErrors = () => {\n    return !text.includes('@');\n  };\n\n return (\n    <View>\n      <TextInput label=\"Email\" value={text} onChangeText={onChangeText} />\n      <HelperText type=\"error\" visible={hasErrors()}>\n        Email address is invalid!\n      </HelperText>\n    </View>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"HelperText","methods":[],"statics":[],"props":{"type":{"required":false,"tsType":{"name":"union","raw":"'error' | 'info'","elements":[{"name":"literal","value":"'error'"},{"name":"literal","value":"'info'"}]},"description":"Type of the helper text.","defaultValue":{"value":"'info'","computed":false}},"visible":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to display the helper text.","defaultValue":{"value":"true","computed":false}},"padding":{"required":false,"tsType":{"name":"union","raw":"'none' | 'normal'","elements":[{"name":"literal","value":"'none'"},{"name":"literal","value":"'normal'"}]},"description":"Whether to apply padding to the helper text.","defaultValue":{"value":"'normal'","computed":false}},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Text content of the HelperText."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"TestID used for testing purposes"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/HelperText.tsx"]},{"filepath":"../src/components/IconButton/IconButton.tsx","title":"IconButton","description":"An icon button is a button which displays only an icon without a label.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/icon-button-1.png\" />\n    <figcaption>Default icon button</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/icon-button-2.png\" />\n    <figcaption>Contained icon button</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/icon-button-3.png\" />\n    <figcaption>Contained-tonal icon button</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/icon-button-4.png\" />\n    <figcaption>Outlined icon button</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { IconButton, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <IconButton\n    icon=\"camera\"\n    iconColor={MD3Colors.error50}\n    size={20}\n    onPress={() => console.log('Pressed')}\n  />\n);\n\nexport default MyComponent;\n```\n\n@extends TouchableRipple props https://callstack.github.io/react-native-paper/touchable-ripple.html","link":"icon-button","data":{"description":"An icon button is a button which displays only an icon without a label.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/icon-button-1.png\" />\n    <figcaption>Default icon button</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/icon-button-2.png\" />\n    <figcaption>Contained icon button</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/icon-button-3.png\" />\n    <figcaption>Contained-tonal icon button</figcaption>\n  </figure>\n  <figure>\n    <img class=\"small\" src=\"screenshots/icon-button-4.png\" />\n    <figcaption>Outlined icon button</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { IconButton, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <IconButton\n    icon=\"camera\"\n    iconColor={MD3Colors.error50}\n    size={20}\n    onPress={() => console.log('Pressed')}\n  />\n);\n\nexport default MyComponent;\n```\n\n@extends TouchableRipple props https://callstack.github.io/react-native-paper/touchable-ripple.html","displayName":"IconButton","methods":[],"statics":[],"props":{"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"Icon to display."},"mode":{"required":false,"tsType":{"name":"union","raw":"'outlined' | 'contained' | 'contained-tonal'","elements":[{"name":"literal","value":"'outlined'"},{"name":"literal","value":"'contained'"},{"name":"literal","value":"'contained-tonal'"}]},"description":"@supported Available in v5.x with theme version 3\nMode of the icon button. By default there is no specified mode - only pressable icon will be rendered."},"iconColor":{"required":false,"tsType":{"name":"string"},"description":"@renamed Renamed from 'color' to 'iconColor' in v5.x\nColor of the icon."},"containerColor":{"required":false,"tsType":{"name":"string"},"description":"Background color of the icon container."},"selected":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\nWhether icon button is selected. A selected button receives alternative combination of icon and container colors.","defaultValue":{"value":"false","computed":false}},"size":{"required":false,"tsType":{"name":"number"},"description":"Size of the icon.","defaultValue":{"value":"24","computed":false}},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch."},"animated":{"required":false,"tsType":{"name":"boolean"},"description":"Whether an icon change is animated.","defaultValue":{"value":"false","computed":false}},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the button. This is read by the screen reader when the user taps the button."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<View>","elements":[{"name":"View"}]},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/IconButton/IconButton.tsx"]},{"filepath":"../src/components/List/ListAccordion.tsx","title":"List.Accordion","description":"A component used to display an expandable list item.\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/list-accordion-1.png\" />\n  <img class=\"medium\" src=\"screenshots/list-accordion-2.png\" />\n  <img class=\"medium\" src=\"screenshots/list-accordion-3.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [expanded, setExpanded] = React.useState(true);\n\n  const handlePress = () => setExpanded(!expanded);\n\n  return (\n    <List.Section title=\"Accordions\">\n      <List.Accordion\n        title=\"Uncontrolled Accordion\"\n        left={props => <List.Icon {...props} icon=\"folder\" />}>\n        <List.Item title=\"First item\" />\n        <List.Item title=\"Second item\" />\n      </List.Accordion>\n\n      <List.Accordion\n        title=\"Controlled Accordion\"\n        left={props => <List.Icon {...props} icon=\"folder\" />}\n        expanded={expanded}\n        onPress={handlePress}>\n        <List.Item title=\"First item\" />\n        <List.Item title=\"Second item\" />\n      </List.Accordion>\n    </List.Section>\n  );\n};\n\nexport default MyComponent;\n```","link":"list-accordion","data":{"description":"A component used to display an expandable list item.\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/list-accordion-1.png\" />\n  <img class=\"medium\" src=\"screenshots/list-accordion-2.png\" />\n  <img class=\"medium\" src=\"screenshots/list-accordion-3.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [expanded, setExpanded] = React.useState(true);\n\n  const handlePress = () => setExpanded(!expanded);\n\n  return (\n    <List.Section title=\"Accordions\">\n      <List.Accordion\n        title=\"Uncontrolled Accordion\"\n        left={props => <List.Icon {...props} icon=\"folder\" />}>\n        <List.Item title=\"First item\" />\n        <List.Item title=\"Second item\" />\n      </List.Accordion>\n\n      <List.Accordion\n        title=\"Controlled Accordion\"\n        left={props => <List.Icon {...props} icon=\"folder\" />}\n        expanded={expanded}\n        onPress={handlePress}>\n        <List.Item title=\"First item\" />\n        <List.Item title=\"Second item\" />\n      </List.Accordion>\n    </List.Section>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"List.Accordion","methods":[],"statics":[],"props":{"title":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Title text for the list accordion."},"description":{"required":false,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Description text for the list accordion."},"left":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { color: string }) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ color: string }","signature":{"properties":[{"key":"color","value":{"name":"string","required":true}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React element to display on the left side."},"right":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { isExpanded: boolean }) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ isExpanded: boolean }","signature":{"properties":[{"key":"isExpanded","value":{"name":"boolean","required":true}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React element to display on the right side."},"expanded":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the accordion is expanded\nIf this prop is provided, the accordion will behave as a \"controlled component\".\nYou'll need to update this prop when you want to toggle the component or on `onPress`."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"onLongPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on long press."},"delayLongPress":{"required":false,"tsType":{"name":"number"},"description":"The number of milliseconds a user must touch the element before executing `onLongPress`."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the section."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style that is passed to the wrapping TouchableRipple element."},"titleStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to Title element."},"descriptionStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to Description element."},"titleNumberOfLines":{"required":false,"tsType":{"name":"number"},"description":"Truncate Title text such that the total number of lines does not\nexceed this number.","defaultValue":{"value":"1","computed":false}},"descriptionNumberOfLines":{"required":false,"tsType":{"name":"number"},"description":"Truncate Description text such that the total number of lines does not\nexceed this number.","defaultValue":{"value":"2","computed":false}},"id":{"required":false,"tsType":{"name":"union","raw":"string | number","elements":[{"name":"string"},{"name":"number"}]},"description":"Id is used for distinguishing specific accordion when using List.AccordionGroup. Property is required when using List.AccordionGroup and has no impact on behavior when using standalone List.Accordion."},"testID":{"required":false,"tsType":{"name":"string"},"description":"TestID used for testing purposes"},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the TouchableRipple. This is read by the screen reader when the user taps the touchable."},"pointerEvents":{"required":false,"tsType":{"name":"ViewProps['pointerEvents']","raw":"ViewProps['pointerEvents']"},"description":"`pointerEvents` passed to the `View` container","defaultValue":{"value":"'none'","computed":false}}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/List/ListAccordion.tsx"],"group":"List"},{"filepath":"../src/components/List/ListAccordionGroup.tsx","title":"List.AccordionGroup","description":"List.AccordionGroup allows to control a group of List Accordions. `id` prop for List.Accordion is required in order for group to work.\nList.AccordionGroup can be a controlled or uncontrolled component. The example shows the uncontrolled version.\nAt most one Accordion can be expanded at a given time.\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/list-accordion-group.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View, Text } from 'react-native';\nimport { List } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <List.AccordionGroup>\n    <List.Accordion title=\"Accordion 1\" id=\"1\">\n      <List.Item title=\"Item 1\" />\n    </List.Accordion>\n    <List.Accordion title=\"Accordion 2\" id=\"2\">\n      <List.Item title=\"Item 2\" />\n    </List.Accordion>\n    <View>\n      <Text>\n        List.Accordion can be wrapped because implementation uses React.Context.\n      </Text>\n      <List.Accordion title=\"Accordion 3\" id=\"3\">\n        <List.Item title=\"Item 3\" />\n      </List.Accordion>\n    </View>\n  </List.AccordionGroup>\n);\n\nexport default MyComponent;\n```","link":"list-accordion-group","data":{"description":"List.AccordionGroup allows to control a group of List Accordions. `id` prop for List.Accordion is required in order for group to work.\nList.AccordionGroup can be a controlled or uncontrolled component. The example shows the uncontrolled version.\nAt most one Accordion can be expanded at a given time.\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/list-accordion-group.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View, Text } from 'react-native';\nimport { List } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <List.AccordionGroup>\n    <List.Accordion title=\"Accordion 1\" id=\"1\">\n      <List.Item title=\"Item 1\" />\n    </List.Accordion>\n    <List.Accordion title=\"Accordion 2\" id=\"2\">\n      <List.Item title=\"Item 2\" />\n    </List.Accordion>\n    <View>\n      <Text>\n        List.Accordion can be wrapped because implementation uses React.Context.\n      </Text>\n      <List.Accordion title=\"Accordion 3\" id=\"3\">\n        <List.Item title=\"Item 3\" />\n      </List.Accordion>\n    </View>\n  </List.AccordionGroup>\n);\n\nexport default MyComponent;\n```","displayName":"List.AccordionGroup","methods":[],"statics":[],"props":{"onAccordionPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(expandedId: string | number) => void","signature":{"arguments":[{"name":"expandedId","type":{"name":"union","raw":"string | number","elements":[{"name":"string"},{"name":"number"}]}}],"return":{"name":"void"}}},"description":"Function to execute on selection change."},"expandedId":{"required":false,"tsType":{"name":"union","raw":"string | number","elements":[{"name":"string"},{"name":"number"}]},"description":"Id of the currently expanded list accordion"},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"React elements containing list accordions"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/List/ListAccordionGroup.tsx"],"group":"List"},{"filepath":"../src/components/List/ListIcon.tsx","title":"List.Icon","description":"A component to show an icon in a list item.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/list-icon.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <>\n    <List.Icon color={MD3Colors.tertiary70} icon=\"folder\" />\n    <List.Icon color={MD3Colors.tertiary70} icon=\"equal\" />\n    <List.Icon color={MD3Colors.tertiary70} icon=\"calendar\" />\n  </>\n);\n\nexport default MyComponent;\n```","link":"list-icon","data":{"description":"A component to show an icon in a list item.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/list-icon.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <>\n    <List.Icon color={MD3Colors.tertiary70} icon=\"folder\" />\n    <List.Icon color={MD3Colors.tertiary70} icon=\"equal\" />\n    <List.Icon color={MD3Colors.tertiary70} icon=\"calendar\" />\n  </>\n);\n\nexport default MyComponent;\n```","displayName":"List.Icon","methods":[],"statics":[],"props":{"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"Icon to show."},"color":{"required":false,"tsType":{"name":"string"},"description":"Color for the icon."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/List/ListIcon.tsx"],"group":"List"},{"filepath":"../src/components/List/ListImage.tsx","title":"List.Image","description":"A component to show image in a list item.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/list-image.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <>\n    <List.Image variant=\"image\" source={{uri: 'https://www.someurl.com/apple'}} />\n    <List.Image variant=\"video\" source={require('../../some-apple.png')} />\n  </>\n);\n\nexport default MyComponent;\n```","link":"list-image","data":{"description":"A component to show image in a list item.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/list-image.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <>\n    <List.Image variant=\"image\" source={{uri: 'https://www.someurl.com/apple'}} />\n    <List.Image variant=\"video\" source={require('../../some-apple.png')} />\n  </>\n);\n\nexport default MyComponent;\n```","displayName":"List.Image","methods":[],"statics":[],"props":{"source":{"required":true,"tsType":{"name":"ImageSourcePropType"},"description":""},"variant":{"required":false,"tsType":{"name":"union","raw":"'image' | 'video'","elements":[{"name":"literal","value":"'image'"},{"name":"literal","value":"'video'"}]},"description":"","defaultValue":{"value":"'image'","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ImageStyle"}],"raw":"StyleProp<ImageStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/List/ListImage.tsx"],"group":"List"},{"filepath":"../src/components/List/ListItem.tsx","title":"List.Item","description":"A component to show tiles inside a List.\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/list-item-1.png\" />\n  <img class=\"medium\" src=\"screenshots/list-item-2.png\" />\n  <img class=\"medium\" src=\"screenshots/list-item-3.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <List.Item\n    title=\"First Item\"\n    description=\"Item description\"\n    left={props => <List.Icon {...props} icon=\"folder\" />}\n  />\n);\n\nexport default MyComponent;\n```\n\n@extends TouchableRipple props https://callstack.github.io/react-native-paper/touchable-ripple.html","link":"list-item","data":{"description":"A component to show tiles inside a List.\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/list-item-1.png\" />\n  <img class=\"medium\" src=\"screenshots/list-item-2.png\" />\n  <img class=\"medium\" src=\"screenshots/list-item-3.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <List.Item\n    title=\"First Item\"\n    description=\"Item description\"\n    left={props => <List.Icon {...props} icon=\"folder\" />}\n  />\n);\n\nexport default MyComponent;\n```\n\n@extends TouchableRipple props https://callstack.github.io/react-native-paper/touchable-ripple.html","displayName":"List.Item","methods":[],"statics":[],"props":{"title":{"required":true,"tsType":{"name":"union","raw":"React.ReactNode\n| ((props: {\n    selectable: boolean;\n    ellipsizeMode: EllipsizeProp | undefined;\n    color: string;\n    fontSize: number;\n  }) => React.ReactNode)","elements":[{"name":"ReactReactNode","raw":"React.ReactNode"},{"name":"unknown"}]},"description":"Title text for the list item."},"description":{"required":false,"tsType":{"name":"union","raw":"React.ReactNode\n| ((props: {\n    selectable: boolean;\n    ellipsizeMode: EllipsizeProp | undefined;\n    color: string;\n    fontSize: number;\n  }) => React.ReactNode)","elements":[{"name":"ReactReactNode","raw":"React.ReactNode"},{"name":"unknown"}]},"description":"Description text for the list item or callback which returns a React element to display the description."},"left":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { color: string; style: Style }) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ color: string; style: Style }","signature":{"properties":[{"key":"color","value":{"name":"string","required":true}},{"key":"style","value":{"name":"Style","required":true}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React element to display on the left side."},"right":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: { color: string; style?: Style }) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"signature","type":"object","raw":"{ color: string; style?: Style }","signature":{"properties":[{"key":"color","value":{"name":"string","required":true}},{"key":"style","value":{"name":"Style","required":false}}]}}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback which returns a React element to display on the right side."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style that is passed to the wrapping TouchableRipple element."},"titleStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to Title element."},"descriptionStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to Description element."},"titleNumberOfLines":{"required":false,"tsType":{"name":"number"},"description":"Truncate Title text such that the total number of lines does not\nexceed this number.","defaultValue":{"value":"1","computed":false}},"descriptionNumberOfLines":{"required":false,"tsType":{"name":"number"},"description":"Truncate Description text such that the total number of lines does not\nexceed this number.","defaultValue":{"value":"2","computed":false}},"titleEllipsizeMode":{"required":false,"tsType":{"name":"EllipsizeProp"},"description":"Ellipsize Mode for the Title.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.\n\nSee [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)"},"descriptionEllipsizeMode":{"required":false,"tsType":{"name":"EllipsizeProp"},"description":"Ellipsize Mode for the Description.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.\n\nSee [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/List/ListItem.tsx"],"group":"List"},{"filepath":"../src/components/List/ListSection.tsx","title":"List.Section","description":"A component used to group list items.\n\n<div class=\"screenshots\">\n  <img src=\"screenshots/list-section.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <List.Section>\n    <List.Subheader>Some title</List.Subheader>\n    <List.Item title=\"First Item\" left={() => <List.Icon icon=\"folder\" />} />\n    <List.Item\n      title=\"Second Item\"\n      left={() => <List.Icon color={MD3Colors.tertiary70} icon=\"folder\" />}\n    />\n  </List.Section>\n);\n\nexport default MyComponent;\n```","link":"list-section","data":{"description":"A component used to group list items.\n\n<div class=\"screenshots\">\n  <img src=\"screenshots/list-section.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <List.Section>\n    <List.Subheader>Some title</List.Subheader>\n    <List.Item title=\"First Item\" left={() => <List.Icon icon=\"folder\" />} />\n    <List.Item\n      title=\"Second Item\"\n      left={() => <List.Icon color={MD3Colors.tertiary70} icon=\"folder\" />}\n    />\n  </List.Section>\n);\n\nexport default MyComponent;\n```","displayName":"List.Section","methods":[],"statics":[],"props":{"title":{"required":false,"tsType":{"name":"string"},"description":"Title text for the section."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the section."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"titleStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to Title element."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/List/ListSection.tsx"],"group":"List"},{"filepath":"../src/components/List/ListSubheader.tsx","title":"List.Subheader","description":"A component used to display a header in lists.\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List } from 'react-native-paper';\n\nconst MyComponent = () => <List.Subheader>My List Title</List.Subheader>;\n\nexport default MyComponent;\n```","link":"list-subheader","data":{"description":"A component used to display a header in lists.\n\n## Usage\n```js\nimport * as React from 'react';\nimport { List } from 'react-native-paper';\n\nconst MyComponent = () => <List.Subheader>My List Title</List.Subheader>;\n\nexport default MyComponent;\n```","displayName":"List.Subheader","methods":[],"statics":[],"props":{"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to Text element."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/List/ListSubheader.tsx"],"group":"List"},{"filepath":"../src/components/Menu/Menu.tsx","title":"Menu","description":"Menus display a list of choices on temporary elevated surfaces. Their placement varies based on the element that opens them.\n\n <div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/menu-1.png\" />\n  <img class=\"small\" src=\"screenshots/menu-2.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Button, Menu, Divider, Provider } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const openMenu = () => setVisible(true);\n\n  const closeMenu = () => setVisible(false);\n\n  return (\n    <Provider>\n      <View\n        style={{\n          paddingTop: 50,\n          flexDirection: 'row',\n          justifyContent: 'center',\n        }}>\n        <Menu\n          visible={visible}\n          onDismiss={closeMenu}\n          anchor={<Button onPress={openMenu}>Show menu</Button>}>\n          <Menu.Item onPress={() => {}} title=\"Item 1\" />\n          <Menu.Item onPress={() => {}} title=\"Item 2\" />\n          <Divider />\n          <Menu.Item onPress={() => {}} title=\"Item 3\" />\n        </Menu>\n      </View>\n    </Provider>\n  );\n};\n\nexport default MyComponent;\n```\n\n### Note\nWhen using `Menu` within a React Native's `Modal` component, you need to wrap all\n`Modal` contents within a `Provider` in order for the menu to show. This\nwrapping is not necessary if you use Paper's `Modal` instead.","link":"menu","data":{"description":"Menus display a list of choices on temporary elevated surfaces. Their placement varies based on the element that opens them.\n\n <div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/menu-1.png\" />\n  <img class=\"small\" src=\"screenshots/menu-2.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Button, Menu, Divider, Provider } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const openMenu = () => setVisible(true);\n\n  const closeMenu = () => setVisible(false);\n\n  return (\n    <Provider>\n      <View\n        style={{\n          paddingTop: 50,\n          flexDirection: 'row',\n          justifyContent: 'center',\n        }}>\n        <Menu\n          visible={visible}\n          onDismiss={closeMenu}\n          anchor={<Button onPress={openMenu}>Show menu</Button>}>\n          <Menu.Item onPress={() => {}} title=\"Item 1\" />\n          <Menu.Item onPress={() => {}} title=\"Item 2\" />\n          <Divider />\n          <Menu.Item onPress={() => {}} title=\"Item 3\" />\n        </Menu>\n      </View>\n    </Provider>\n  );\n};\n\nexport default MyComponent;\n```\n\n### Note\nWhen using `Menu` within a React Native's `Modal` component, you need to wrap all\n`Modal` contents within a `Provider` in order for the menu to show. This\nwrapping is not necessary if you use Paper's `Modal` instead.","displayName":"Menu","methods":[],"statics":[{"name":"Item","description":null,"docblock":null,"type":{"name":"static"},"link":"menu-item.html"}],"props":{"visible":{"required":true,"tsType":{"name":"boolean"},"description":"Whether the Menu is currently visible."},"anchor":{"required":true,"tsType":{"name":"union","raw":"React.ReactNode | { x: number; y: number }","elements":[{"name":"ReactReactNode","raw":"React.ReactNode"},{"name":"signature","type":"object","raw":"{ x: number; y: number }","signature":{"properties":[{"key":"x","value":{"name":"number","required":true}},{"key":"y","value":{"name":"number","required":true}}]}}]},"description":"The anchor to open the menu from. In most cases, it will be a button that opens the menu."},"anchorPosition":{"required":false,"tsType":{"name":"union","raw":"'top' | 'bottom'","elements":[{"name":"literal","value":"'top'"},{"name":"literal","value":"'bottom'"}]},"description":"Whether the menu should open at the top of the anchor or at its bottom.\nApplied only when anchor is a node, not an x/y position."},"statusBarHeight":{"required":false,"tsType":{"name":"number"},"description":"Extra margin to add at the top of the menu to account for translucent status bar on Android.\nIf you are using Expo, we assume translucent status bar and set a height for status bar automatically.\nPass `0` or a custom value to and customize it.\nThis is automatically handled on iOS.","defaultValue":{"value":"APPROX_STATUSBAR_HEIGHT","computed":true}},"onDismiss":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Callback called when Menu is dismissed. The `visible` prop needs to be updated when this is called."},"overlayAccessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the overlay. This is read by the screen reader when the user taps outside the menu.","defaultValue":{"value":"'Close menu'","computed":false}},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `Menu`."},"contentStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style of menu's inner content."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":true,"tsType":{"name":"InternalTheme"},"description":"@optional"},"keyboardShouldPersistTaps":{"required":false,"tsType":{"name":"ScrollViewProps['keyboardShouldPersistTaps']","raw":"ScrollViewProps['keyboardShouldPersistTaps']"},"description":"Inner ScrollView prop"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Menu/Menu.tsx"]},{"filepath":"../src/components/Menu/MenuItem.tsx","title":"Menu.Item","description":"A component to show a single list item inside a Menu.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/menu-item.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Menu } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <View style={{ flex: 1 }}>\n    <Menu.Item leadingIcon=\"redo\" onPress={() => {}} title=\"Redo\" />\n    <Menu.Item leadingIcon=\"undo\" onPress={() => {}} title=\"Undo\" />\n    <Menu.Item leadingIcon=\"content-cut\" onPress={() => {}} title=\"Cut\" disabled />\n    <Menu.Item leadingIcon=\"content-copy\" onPress={() => {}} title=\"Copy\" disabled />\n    <Menu.Item leadingIcon=\"content-paste\" onPress={() => {}} title=\"Paste\" />\n  </View>\n);\n\nexport default MyComponent;\n```","link":"menu-item","data":{"description":"A component to show a single list item inside a Menu.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/menu-item.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Menu } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <View style={{ flex: 1 }}>\n    <Menu.Item leadingIcon=\"redo\" onPress={() => {}} title=\"Redo\" />\n    <Menu.Item leadingIcon=\"undo\" onPress={() => {}} title=\"Undo\" />\n    <Menu.Item leadingIcon=\"content-cut\" onPress={() => {}} title=\"Cut\" disabled />\n    <Menu.Item leadingIcon=\"content-copy\" onPress={() => {}} title=\"Copy\" disabled />\n    <Menu.Item leadingIcon=\"content-paste\" onPress={() => {}} title=\"Paste\" />\n  </View>\n);\n\nexport default MyComponent;\n```","displayName":"Menu.Item","methods":[],"statics":[],"props":{"title":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Title text for the `MenuItem`."},"leadingIcon":{"required":false,"tsType":{"name":"IconSource"},"description":"@renamed Renamed from 'icon' to 'leadingIcon' in v5.x\n\nLeading icon to display for the `MenuItem`."},"trailingIcon":{"required":false,"tsType":{"name":"IconSource"},"description":"@supported Available in v5.x with theme version 3\n\nTrailing icon to display for the `MenuItem`."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the 'item' is disabled. A disabled 'item' is greyed out and `onPress` is not called on touch."},"dense":{"required":false,"tsType":{"name":"boolean"},"description":"@supported Available in v5.x with theme version 3\n\nSets min height with densed layout."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"@optional"},"contentStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"titleStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"TestID used for testing purposes"},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the Touchable. This is read by the screen reader when the user taps the component."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Menu/MenuItem.tsx"],"group":"Menu"},{"filepath":"../src/components/Modal.tsx","title":"Modal","description":"The Modal component is a simple way to present content above an enclosing view.\nTo render the `Modal` above other components, you'll need to wrap it with the [`Portal`](portal.html) component.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/modal.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Modal, Portal, Text, Button, Provider } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const showModal = () => setVisible(true);\n  const hideModal = () => setVisible(false);\n  const containerStyle = {backgroundColor: 'white', padding: 20};\n\n  return (\n    <Provider>\n      <Portal>\n        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>\n          <Text>Example Modal.  Click outside this area to dismiss.</Text>\n        </Modal>\n      </Portal>\n      <Button style={{marginTop: 30}} onPress={showModal}>\n        Show\n      </Button>\n    </Provider>\n  );\n};\n\nexport default MyComponent;\n```","link":"modal","data":{"description":"The Modal component is a simple way to present content above an enclosing view.\nTo render the `Modal` above other components, you'll need to wrap it with the [`Portal`](portal.html) component.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/modal.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Modal, Portal, Text, Button, Provider } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const showModal = () => setVisible(true);\n  const hideModal = () => setVisible(false);\n  const containerStyle = {backgroundColor: 'white', padding: 20};\n\n  return (\n    <Provider>\n      <Portal>\n        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>\n          <Text>Example Modal.  Click outside this area to dismiss.</Text>\n        </Modal>\n      </Portal>\n      <Button style={{marginTop: 30}} onPress={showModal}>\n        Show\n      </Button>\n    </Provider>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"Modal","methods":[],"statics":[],"props":{"dismissable":{"required":false,"tsType":{"name":"boolean"},"description":"Determines whether clicking outside the modal dismiss it.","defaultValue":{"value":"true","computed":false}},"onDismiss":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Callback that is called when the user dismisses the modal."},"overlayAccessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the overlay. This is read by the screen reader when the user taps outside the modal.","defaultValue":{"value":"'Close modal'","computed":false}},"visible":{"required":false,"tsType":{"name":"boolean"},"description":"Determines Whether the modal is visible.","defaultValue":{"value":"false","computed":false}},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `Modal`."},"contentContainerStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style for the content of the modal"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Style for the wrapper of the modal.\nUse this prop to change the default wrapper style or to override safe area insets with marginTop and marginBottom."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests.","defaultValue":{"value":"'modal'","computed":false}}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Modal.tsx"]},{"filepath":"../src/components/Portal/Portal.tsx","title":"Portal","description":"Portal allows rendering a component at a different place in the parent tree.\nYou can use it to render content which should appear above other elements, similar to `Modal`.\nIt requires a [`Portal.Host`](portal-host.html) component to be rendered somewhere in the parent tree.\nNote that if you're using the `Provider` component, this already includes a `Portal.Host`.\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Portal>\n    <Text>This is rendered at a different place</Text>\n  </Portal>\n);\n\nexport default MyComponent;\n```","link":"portal","data":{"description":"Portal allows rendering a component at a different place in the parent tree.\nYou can use it to render content which should appear above other elements, similar to `Modal`.\nIt requires a [`Portal.Host`](portal-host.html) component to be rendered somewhere in the parent tree.\nNote that if you're using the `Provider` component, this already includes a `Portal.Host`.\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Portal, Text } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Portal>\n    <Text>This is rendered at a different place</Text>\n  </Portal>\n);\n\nexport default MyComponent;\n```","displayName":"Portal","methods":[],"statics":[{"name":"Host","description":null,"docblock":null,"type":{"name":"static"},"link":"portal-host.html"}],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `Portal`."},"theme":{"required":true,"tsType":{"name":"InternalTheme"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Portal/Portal.tsx"]},{"filepath":"../src/components/Portal/PortalHost.tsx","title":"Portal.Host","description":"Portal host renders all of its children `Portal` elements.\nFor example, you can wrap a screen in `Portal.Host` to render items above the screen.\nIf you're using the `Provider` component, it already includes `Portal.Host`.\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Text } from 'react-native';\nimport { Portal } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Portal.Host>\n    <Text>Content of the app</Text>\n  </Portal.Host>\n);\n\nexport default MyComponent;\n```\n\nHere any `Portal` elements under `<App />` are rendered alongside `<App />` and will appear above `<App />` like a `Modal`.","link":"portal-host","data":{"description":"Portal host renders all of its children `Portal` elements.\nFor example, you can wrap a screen in `Portal.Host` to render items above the screen.\nIf you're using the `Provider` component, it already includes `Portal.Host`.\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Text } from 'react-native';\nimport { Portal } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Portal.Host>\n    <Text>Content of the app</Text>\n  </Portal.Host>\n);\n\nexport default MyComponent;\n```\n\nHere any `Portal` elements under `<App />` are rendered alongside `<App />` and will appear above `<App />` like a `Modal`.","displayName":"Portal.Host","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Portal/PortalHost.tsx"],"group":"Portal"},{"filepath":"../src/components/ProgressBar.tsx","title":"ProgressBar","description":"Progress bar is an indicator used to present progress of some activity in the app.\n\n<div class=\"screenshots\">\n  <img src=\"screenshots/progress-bar.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ProgressBar, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <ProgressBar progress={0.5} color={MD3Colors.error50} />\n);\n\nexport default MyComponent;\n```","link":"progress-bar","data":{"description":"Progress bar is an indicator used to present progress of some activity in the app.\n\n<div class=\"screenshots\">\n  <img src=\"screenshots/progress-bar.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ProgressBar, MD3Colors } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <ProgressBar progress={0.5} color={MD3Colors.error50} />\n);\n\nexport default MyComponent;\n```","displayName":"ProgressBar","methods":[],"statics":[],"props":{"animatedValue":{"required":false,"tsType":{"name":"number"},"description":"Animated value (between 0 and 1). This tells the progress bar to rely on this value to animate it.\nNote: It should not be used in parallel with the `progress` prop."},"progress":{"required":false,"tsType":{"name":"number"},"description":"Progress value (between 0 and 1).\nNote: It should not be used in parallel with the `animatedValue` prop.","defaultValue":{"value":"0","computed":false}},"color":{"required":false,"tsType":{"name":"string"},"description":"Color of the progress bar. The background color will be calculated based on this but you can change it by passing `backgroundColor` to `style` prop."},"indeterminate":{"required":false,"tsType":{"name":"boolean"},"description":"If the progress bar will show indeterminate progress."},"visible":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to show the ProgressBar (true, the default) or hide it (false).","defaultValue":{"value":"true","computed":false}},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/ProgressBar.tsx"]},{"filepath":"../src/components/RadioButton/RadioButton.tsx","title":"RadioButton","description":"Radio buttons allow the selection a single option from a set.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/radio-enabled.android.png\" />\n    <figcaption>Android (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-disabled.android.png\" />\n    <figcaption>Android (disabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-enabled.ios.png\" />\n    <figcaption>iOS (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-disabled.ios.png\" />\n    <figcaption>iOS (disabled)</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { RadioButton } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [checked, setChecked] = React.useState('first');\n\n  return (\n    <View>\n      <RadioButton\n        value=\"first\"\n        status={ checked === 'first' ? 'checked' : 'unchecked' }\n        onPress={() => setChecked('first')}\n      />\n      <RadioButton\n        value=\"second\"\n        status={ checked === 'second' ? 'checked' : 'unchecked' }\n        onPress={() => setChecked('second')}\n      />\n    </View>\n  );\n};\n\nexport default MyComponent;\n```","link":"radio-button","data":{"description":"Radio buttons allow the selection a single option from a set.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/radio-enabled.android.png\" />\n    <figcaption>Android (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-disabled.android.png\" />\n    <figcaption>Android (disabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-enabled.ios.png\" />\n    <figcaption>iOS (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-disabled.ios.png\" />\n    <figcaption>iOS (disabled)</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { RadioButton } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [checked, setChecked] = React.useState('first');\n\n  return (\n    <View>\n      <RadioButton\n        value=\"first\"\n        status={ checked === 'first' ? 'checked' : 'unchecked' }\n        onPress={() => setChecked('first')}\n      />\n      <RadioButton\n        value=\"second\"\n        status={ checked === 'second' ? 'checked' : 'unchecked' }\n        onPress={() => setChecked('second')}\n      />\n    </View>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"RadioButton","methods":[],"statics":[],"props":{"value":{"required":true,"tsType":{"name":"string"},"description":"Value of the radio button"},"status":{"required":false,"tsType":{"name":"union","raw":"'checked' | 'unchecked'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"}]},"description":"Status of radio button."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether radio is disabled."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"uncheckedColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for unchecked radio."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for radio."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/RadioButton/RadioButton.tsx"]},{"filepath":"../src/components/RadioButton/RadioButtonAndroid.tsx","title":"RadioButton.Android","description":"Radio buttons allow the selection a single option from a set.\nThis component follows platform guidelines for Android, but can be used\non any platform.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/radio-enabled.android.png\" />\n    <figcaption>Enabled</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-disabled.android.png\" />\n    <figcaption>Disabled</figcaption>\n  </figure>\n</div>","link":"radio-button-android","data":{"description":"Radio buttons allow the selection a single option from a set.\nThis component follows platform guidelines for Android, but can be used\non any platform.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/radio-enabled.android.png\" />\n    <figcaption>Enabled</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-disabled.android.png\" />\n    <figcaption>Disabled</figcaption>\n  </figure>\n</div>","displayName":"RadioButton.Android","methods":[],"statics":[],"props":{"value":{"required":true,"tsType":{"name":"string"},"description":"Value of the radio button"},"status":{"required":false,"tsType":{"name":"union","raw":"'checked' | 'unchecked'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"}]},"description":"Status of radio button."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether radio is disabled."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(param?: any) => void","signature":{"arguments":[{"name":"param","type":{"name":"any"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"uncheckedColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for unchecked radio."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for radio."},"theme":{"required":false,"tsType":{"name":"InternalTheme"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/RadioButton/RadioButtonAndroid.tsx"],"group":"RadioButton"},{"filepath":"../src/components/RadioButton/RadioButtonGroup.tsx","title":"RadioButton.Group","description":"Radio button group allows to control a group of radio buttons.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/radio-button-group-android.gif\" />\n <figcaption>Android</figcaption>\n  </figure>\n  <figure>\n    <img class=\"medium\" src=\"screenshots/radio-button-group-ios.gif\" />\n <figcaption>iOS</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { RadioButton, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('first');\n\n  return (\n    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>\n      <View>\n        <Text>First</Text>\n        <RadioButton value=\"first\" />\n      </View>\n      <View>\n        <Text>Second</Text>\n        <RadioButton value=\"second\" />\n      </View>\n    </RadioButton.Group>\n  );\n};\n\nexport default MyComponent;\n```","link":"radio-button-group","data":{"description":"Radio button group allows to control a group of radio buttons.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/radio-button-group-android.gif\" />\n <figcaption>Android</figcaption>\n  </figure>\n  <figure>\n    <img class=\"medium\" src=\"screenshots/radio-button-group-ios.gif\" />\n <figcaption>iOS</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { RadioButton, Text } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('first');\n\n  return (\n    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>\n      <View>\n        <Text>First</Text>\n        <RadioButton value=\"first\" />\n      </View>\n      <View>\n        <Text>Second</Text>\n        <RadioButton value=\"second\" />\n      </View>\n    </RadioButton.Group>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"RadioButton.Group","methods":[],"statics":[],"props":{"onValueChange":{"required":true,"tsType":{"name":"signature","type":"function","raw":"(value: string) => void","signature":{"arguments":[{"name":"value","type":{"name":"string"}}],"return":{"name":"void"}}},"description":"Function to execute on selection change."},"value":{"required":true,"tsType":{"name":"string"},"description":"Value of the currently selected radio button."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"React elements containing radio buttons."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/RadioButton/RadioButtonGroup.tsx"],"group":"RadioButton"},{"filepath":"../src/components/RadioButton/RadioButtonIOS.tsx","title":"RadioButton.IOS","description":"Radio buttons allow the selection a single option from a set.\nThis component follows platform guidelines for iOS, but can be used\non any platform.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/radio-enabled.ios.png\" />\n    <figcaption>Enabled</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-disabled.ios.png\" />\n    <figcaption>Disabled</figcaption>\n  </figure>\n</div>","link":"radio-button-ios","data":{"description":"Radio buttons allow the selection a single option from a set.\nThis component follows platform guidelines for iOS, but can be used\non any platform.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/radio-enabled.ios.png\" />\n    <figcaption>Enabled</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/radio-disabled.ios.png\" />\n    <figcaption>Disabled</figcaption>\n  </figure>\n</div>","displayName":"RadioButton.IOS","methods":[],"statics":[],"props":{"value":{"required":true,"tsType":{"name":"string"},"description":"Value of the radio button"},"status":{"required":false,"tsType":{"name":"union","raw":"'checked' | 'unchecked'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"}]},"description":"Status of radio button."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether radio is disabled."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for radio."},"theme":{"required":false,"tsType":{"name":"InternalTheme"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/RadioButton/RadioButtonIOS.tsx"],"group":"RadioButton"},{"filepath":"../src/components/RadioButton/RadioButtonItem.tsx","title":"RadioButton.Item","description":"RadioButton.Item allows you to press the whole row (item) instead of only the RadioButton.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/radio-item.ios.png\" />\n    <figcaption>Pressed</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { RadioButton } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('first');\n\n  return (\n    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>\n      <RadioButton.Item label=\"First item\" value=\"first\" />\n      <RadioButton.Item label=\"Second item\" value=\"second\" />\n    </RadioButton.Group>\n  );\n};\n\nexport default MyComponent;\n```","link":"radio-button-item","data":{"description":"RadioButton.Item allows you to press the whole row (item) instead of only the RadioButton.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/radio-item.ios.png\" />\n    <figcaption>Pressed</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { RadioButton } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('first');\n\n  return (\n    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>\n      <RadioButton.Item label=\"First item\" value=\"first\" />\n      <RadioButton.Item label=\"Second item\" value=\"second\" />\n    </RadioButton.Group>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"RadioButton.Item","methods":[],"statics":[],"props":{"value":{"required":true,"tsType":{"name":"string"},"description":"Value of the radio button."},"label":{"required":true,"tsType":{"name":"string"},"description":"Label to be displayed on the item."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether radio is disabled."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the touchable. This is read by the screen reader when the user taps the touchable.","defaultValue":{"value":"label","computed":true}},"uncheckedColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for unchecked radio."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for radio."},"status":{"required":false,"tsType":{"name":"union","raw":"'checked' | 'unchecked'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"}]},"description":"Status of radio button."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Additional styles for container View."},"labelStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to Label element."},"labelVariant":{"required":false,"tsType":{"name":"unknown"},"description":"@supported Available in v5.x with theme version 3\n\nLabel text variant defines appropriate text styles for type role and its size.\nAvailable variants:\n\n Display: `displayLarge`, `displayMedium`, `displaySmall`\n\n Headline: `headlineLarge`, `headlineMedium`, `headlineSmall`\n\n Title: `titleLarge`, `titleMedium`, `titleSmall`\n\n Label:  `labelLarge`, `labelMedium`, `labelSmall`\n\n Body: `bodyLarge`, `bodyMedium`, `bodySmall`","defaultValue":{"value":"'bodyLarge'","computed":false}},"theme":{"required":false,"tsType":{"name":"InternalTheme"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."},"mode":{"required":false,"tsType":{"name":"union","raw":"'android' | 'ios'","elements":[{"name":"literal","value":"'android'"},{"name":"literal","value":"'ios'"}]},"description":"Whether `<RadioButton.Android />` or `<RadioButton.IOS />` should be used.\nLeft undefined `<RadioButton />` will be used."},"position":{"required":false,"tsType":{"name":"union","raw":"'leading' | 'trailing'","elements":[{"name":"literal","value":"'leading'"},{"name":"literal","value":"'trailing'"}]},"description":"Radio button control position.","defaultValue":{"value":"'trailing'","computed":false}}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/RadioButton/RadioButtonItem.tsx"],"group":"RadioButton"},{"filepath":"../src/components/Searchbar.tsx","title":"Searchbar","description":"Searchbar is a simple input box where users can type search queries.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/searchbar.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Searchbar } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [searchQuery, setSearchQuery] = React.useState('');\n\n  const onChangeSearch = query => setSearchQuery(query);\n\n  return (\n    <Searchbar\n      placeholder=\"Search\"\n      onChangeText={onChangeSearch}\n      value={searchQuery}\n    />\n  );\n};\n\nexport default MyComponent;\n\n```","link":"searchbar","data":{"description":"Searchbar is a simple input box where users can type search queries.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/searchbar.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Searchbar } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [searchQuery, setSearchQuery] = React.useState('');\n\n  const onChangeSearch = query => setSearchQuery(query);\n\n  return (\n    <Searchbar\n      placeholder=\"Search\"\n      onChangeText={onChangeSearch}\n      value={searchQuery}\n    />\n  );\n};\n\nexport default MyComponent;\n\n```","displayName":"Searchbar","methods":[],"statics":[],"props":{"clearAccessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the button. This is read by the screen reader when the user taps the button.","defaultValue":{"value":"'clear'","computed":false}},"searchAccessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the button. This is read by the screen reader when the user taps the button.","defaultValue":{"value":"'search'","computed":false}},"placeholder":{"required":false,"tsType":{"name":"string"},"description":"Hint text shown when the input is empty."},"value":{"required":true,"tsType":{"name":"string"},"description":"The value of the text input."},"icon":{"required":false,"tsType":{"name":"IconSource"},"description":"Icon name for the left icon button (see `onIconPress`)."},"onChangeText":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(query: string) => void","signature":{"arguments":[{"name":"query","type":{"name":"string"}}],"return":{"name":"void"}}},"description":"Callback that is called when the text input's text changes."},"onIconPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Callback to execute if we want the left icon to act as button."},"elevation":{"required":false,"tsType":{"name":"union","raw":"0 | 1 | 2 | 3 | 4 | 5 | Animated.Value","elements":[{"name":"literal","value":"0"},{"name":"literal","value":"1"},{"name":"literal","value":"2"},{"name":"literal","value":"3"},{"name":"literal","value":"4"},{"name":"literal","value":"5"},{"name":"Animated.Value"}]},"description":"@supported Available in v5.x with theme version 3\nChanges Searchbar shadow and background on iOS and Android.","defaultValue":{"value":"1","computed":false}},"inputStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Set style of the TextInput component inside the searchbar"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"iconColor":{"required":false,"tsType":{"name":"string"},"description":"Custom color for icon, default will be derived from theme"},"clearIcon":{"required":false,"tsType":{"name":"IconSource"},"description":"Custom icon for clear button, default will be icon close"},"loading":{"required":false,"tsType":{"name":"Boolean"},"description":"Custom flag for replacing clear button with activity indicator.","defaultValue":{"value":"false","computed":false}},"testID":{"required":false,"tsType":{"name":"string"},"description":"TestID used for testing purposes","defaultValue":{"value":"'search-bar'","computed":false}},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Searchbar.tsx"]},{"filepath":"../src/components/SegmentedButtons/SegmentedButtons.tsx","title":"SegmentedButtons","description":"Segmented buttons can be used to select options, switch views or sort elements.</br>\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/segmented-button.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { SafeAreaView, StyleSheet } from 'react-native';\nimport { SegmentedButtons } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('');\n\n  return (\n    <SafeAreaView style={styles.container}>\n      <SegmentedButtons\n        value={value}\n        onValueChange={setValue}\n        buttons={[\n          {\n            value: 'walk',\n            label: 'Walking',\n          },\n          {\n            value: 'train',\n            label: 'Transit',\n          },\n          { value: 'drive', label: 'Driving' },\n        ]}\n      />\n    </SafeAreaView>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: 'center',\n  },\n});\n\nexport default MyComponent;\n```","link":"segmented-buttons","data":{"description":"Segmented buttons can be used to select options, switch views or sort elements.</br>\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/segmented-button.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { SafeAreaView, StyleSheet } from 'react-native';\nimport { SegmentedButtons } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('');\n\n  return (\n    <SafeAreaView style={styles.container}>\n      <SegmentedButtons\n        value={value}\n        onValueChange={setValue}\n        buttons={[\n          {\n            value: 'walk',\n            label: 'Walking',\n          },\n          {\n            value: 'train',\n            label: 'Transit',\n          },\n          { value: 'drive', label: 'Driving' },\n        ]}\n      />\n    </SafeAreaView>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    alignItems: 'center',\n  },\n});\n\nexport default MyComponent;\n```","displayName":"SegmentedButtons","methods":[],"statics":[],"props":{"buttons":{"required":true,"tsType":{"name":"Array","elements":[{"name":"signature","type":"object","raw":"{\n  value: string;\n  icon?: IconSource;\n  disabled?: boolean;\n  accessibilityLabel?: string;\n  onPress?: (event: GestureResponderEvent) => void;\n  label?: string;\n  showSelectedCheck?: boolean;\n  style?: StyleProp<ViewStyle>;\n  testID?: string;\n}","signature":{"properties":[{"key":"value","value":{"name":"string","required":true}},{"key":"icon","value":{"name":"IconSource","required":false}},{"key":"disabled","value":{"name":"boolean","required":false}},{"key":"accessibilityLabel","value":{"name":"string","required":false}},{"key":"onPress","value":{"name":"signature","type":"function","raw":"(event: GestureResponderEvent) => void","signature":{"arguments":[{"name":"event","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}},"required":false}},{"key":"label","value":{"name":"string","required":false}},{"key":"showSelectedCheck","value":{"name":"boolean","required":false}},{"key":"style","value":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>","required":false}},{"key":"testID","value":{"name":"string","required":false}}]}}],"raw":"{\n  value: string;\n  icon?: IconSource;\n  disabled?: boolean;\n  accessibilityLabel?: string;\n  onPress?: (event: GestureResponderEvent) => void;\n  label?: string;\n  showSelectedCheck?: boolean;\n  style?: StyleProp<ViewStyle>;\n  testID?: string;\n}[]"},"description":"Buttons to display as options in toggle button.\nButton should contain the following properties:\n- `value`: value of button (required)\n- `icon`: icon to display for the item\n- `disabled`: whether the button is disabled\n- `accessibilityLabel`: acccessibility label for the button. This is read by the screen reader when the user taps the button.\n- `onPress`: callback that is called when button is pressed\n- `label`: label text of the button\n- `showSelectedCheck`: show optional check icon to indicate selected state\n- `style`: pass additional styles for the button\n- `testID`: testID to be used on tests"},"density":{"required":false,"tsType":{"name":"union","raw":"'regular' | 'small' | 'medium' | 'high'","elements":[{"name":"literal","value":"'regular'"},{"name":"literal","value":"'small'"},{"name":"literal","value":"'medium'"},{"name":"literal","value":"'high'"}]},"description":"Density is applied to the height, to allow usage in denser UIs"},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/SegmentedButtons/SegmentedButtons.tsx"]},{"filepath":"../src/components/Snackbar.tsx","title":"Snackbar","description":"Snackbars provide brief feedback about an operation through a message at the bottom of the screen.\nSnackbar by default uses `onSurface` color from theme.\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/snackbar.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View, StyleSheet } from 'react-native';\nimport { Button, Snackbar } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const onToggleSnackBar = () => setVisible(!visible);\n\n  const onDismissSnackBar = () => setVisible(false);\n\n  return (\n    <View style={styles.container}>\n      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>\n      <Snackbar\n        visible={visible}\n        onDismiss={onDismissSnackBar}\n        action={{\n          label: 'Undo',\n          onPress: () => {\n            // Do something\n          },\n        }}>\n        Hey there! I'm a Snackbar.\n      </Snackbar>\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'space-between',\n  },\n});\n\nexport default MyComponent;\n```","link":"snackbar","data":{"description":"Snackbars provide brief feedback about an operation through a message at the bottom of the screen.\nSnackbar by default uses `onSurface` color from theme.\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/snackbar.gif\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View, StyleSheet } from 'react-native';\nimport { Button, Snackbar } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [visible, setVisible] = React.useState(false);\n\n  const onToggleSnackBar = () => setVisible(!visible);\n\n  const onDismissSnackBar = () => setVisible(false);\n\n  return (\n    <View style={styles.container}>\n      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>\n      <Snackbar\n        visible={visible}\n        onDismiss={onDismissSnackBar}\n        action={{\n          label: 'Undo',\n          onPress: () => {\n            // Do something\n          },\n        }}>\n        Hey there! I'm a Snackbar.\n      </Snackbar>\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'space-between',\n  },\n});\n\nexport default MyComponent;\n```","displayName":"Snackbar","methods":[],"statics":[],"props":{"visible":{"required":true,"tsType":{"name":"boolean"},"description":"Whether the Snackbar is currently visible."},"action":{"required":false,"tsType":{"name":"intersection","raw":"Omit<React.ComponentProps<typeof Button>, 'children'> & {\n  label: string;\n}","elements":[{"name":"Omit","elements":[{"name":"ReactComponentProps","raw":"React.ComponentProps<typeof Button>","elements":[{"name":"Button"}]},{"name":"literal","value":"'children'"}],"raw":"Omit<React.ComponentProps<typeof Button>, 'children'>"},{"name":"signature","type":"object","raw":"{\n  label: string;\n}","signature":{"properties":[{"key":"label","value":{"name":"string","required":true}}]}}]},"description":"Label and press callback for the action button. It should contain the following properties:\n- `label` - Label of the action button\n- `onPress` - Callback that is called when action button is pressed."},"icon":{"required":false,"tsType":{"name":"IconSource"},"description":"@supported Available in v5.x with theme version 3\nIcon to display when `onIconPress` is defined. Default will be `close` icon."},"onIconPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"@supported Available in v5.x with theme version 3\nFunction to execute on icon button press. The icon button appears only when this prop is specified."},"iconAccessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"@supported Available in v5.x with theme version 3\nAccessibility label for the icon button. This is read by the screen reader when the user taps the button.","defaultValue":{"value":"'Close icon'","computed":false}},"duration":{"required":false,"tsType":{"name":"number"},"description":"The duration for which the Snackbar is shown.","defaultValue":{"value":"7000","computed":false}},"onDismiss":{"required":true,"tsType":{"name":"signature","type":"function","raw":"() => void","signature":{"arguments":[],"return":{"name":"void"}}},"description":"Callback called when Snackbar is dismissed. The `visible` prop needs to be updated when this is called."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Text content of the Snackbar."},"elevation":{"required":false,"tsType":{"name":"union","raw":"0 | 1 | 2 | 3 | 4 | 5 | Animated.Value","elements":[{"name":"literal","value":"0"},{"name":"literal","value":"1"},{"name":"literal","value":"2"},{"name":"literal","value":"3"},{"name":"literal","value":"4"},{"name":"literal","value":"5"},{"name":"Animated.Value"}]},"description":"@supported Available in v5.x with theme version 3\nChanges Snackbar shadow and background on iOS and Android.","defaultValue":{"value":"2","computed":false}},"wrapperStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<View>","elements":[{"name":"View"}]},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Snackbar.tsx"]},{"filepath":"../src/components/Surface.tsx","title":"Surface","description":"Surface is a basic container that can give depth to an element with elevation shadow.\nOn dark theme with `adaptive` mode, surface is constructed by also placing a semi-transparent white overlay over a component surface.\nSee [Dark InternalTheme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more information.\nOverlay and shadow can be applied by specifying the `elevation` property both on Android and iOS.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/surface-android.png\" />\n    <figcaption>Surface on Android</figcaption>\n  </figure>\n  <figure>\n    <img class=\"medium\" src=\"screenshots/surface-ios.png\" />\n    <figcaption>Surface on iOS</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Surface, Text } from 'react-native-paper';\nimport { StyleSheet } from 'react-native';\n\nconst MyComponent = () => (\n  <Surface style={styles.surface} elevation={4}>\n     <Text>Surface</Text>\n  </Surface>\n);\n\nexport default MyComponent;\n\nconst styles = StyleSheet.create({\n  surface: {\n    padding: 8,\n    height: 80,\n    width: 80,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n});\n```","link":"surface","data":{"description":"Surface is a basic container that can give depth to an element with elevation shadow.\nOn dark theme with `adaptive` mode, surface is constructed by also placing a semi-transparent white overlay over a component surface.\nSee [Dark InternalTheme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more information.\nOverlay and shadow can be applied by specifying the `elevation` property both on Android and iOS.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/surface-android.png\" />\n    <figcaption>Surface on Android</figcaption>\n  </figure>\n  <figure>\n    <img class=\"medium\" src=\"screenshots/surface-ios.png\" />\n    <figcaption>Surface on iOS</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Surface, Text } from 'react-native-paper';\nimport { StyleSheet } from 'react-native';\n\nconst MyComponent = () => (\n  <Surface style={styles.surface} elevation={4}>\n     <Text>Surface</Text>\n  </Surface>\n);\n\nexport default MyComponent;\n\nconst styles = StyleSheet.create({\n  surface: {\n    padding: 8,\n    height: 80,\n    width: 80,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n});\n```","displayName":"Surface","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `Surface`."},"style":{"required":false,"tsType":{"name":"Animated.WithAnimatedValue","elements":[{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"}],"raw":"Animated.WithAnimatedValue<StyleProp<ViewStyle>>"},"description":""},"elevation":{"required":false,"tsType":{"name":"union","raw":"0 | 1 | 2 | 3 | 4 | 5 | Animated.Value","elements":[{"name":"literal","value":"0"},{"name":"literal","value":"1"},{"name":"literal","value":"2"},{"name":"literal","value":"3"},{"name":"literal","value":"4"},{"name":"literal","value":"5"},{"name":"Animated.Value"}]},"description":"@supported Available in v5.x with theme version 3\nChanges shadows and background on iOS and Android.\nUsed to create UI hierarchy between components.\n\nNote: In version 2 the `elevation` prop was accepted via `style` prop i.e. `style={{ elevation: 4 }}`.\nIt's no longer supported with theme version 3 and you should use `elevation` property instead.","defaultValue":{"value":"1","computed":false}},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"TestID used for testing purposes"},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<View>","elements":[{"name":"View"}]},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Surface.tsx"]},{"filepath":"../src/components/Switch/Switch.tsx","title":"Switch","description":"Switch is a visual toggle between two mutually exclusive states — on and off.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/switch-enabled.android.png\" />\n    <figcaption>Android (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/switch-disabled.android.png\" />\n    <figcaption>Android (disabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/switch-enabled.ios.png\" />\n    <figcaption>iOS (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/switch-disabled.ios.png\" />\n    <figcaption>iOS (disabled)</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Switch } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [isSwitchOn, setIsSwitchOn] = React.useState(false);\n\n  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);\n\n  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;\n};\n\nexport default MyComponent;\n```","link":"switch","data":{"description":"Switch is a visual toggle between two mutually exclusive states — on and off.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/switch-enabled.android.png\" />\n    <figcaption>Android (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/switch-disabled.android.png\" />\n    <figcaption>Android (disabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/switch-enabled.ios.png\" />\n    <figcaption>iOS (enabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/switch-disabled.ios.png\" />\n    <figcaption>iOS (disabled)</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Switch } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [isSwitchOn, setIsSwitchOn] = React.useState(false);\n\n  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);\n\n  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;\n};\n\nexport default MyComponent;\n```","displayName":"Switch","methods":[],"statics":[],"props":{"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Disable toggling the switch."},"value":{"required":false,"tsType":{"name":"boolean"},"description":"Value of the switch, true means 'on', false means 'off'."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom color for switch."},"onValueChange":{"required":false,"tsType":{"name":"Function"},"description":"Callback called with the new value when it changes."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Switch/Switch.tsx"]},{"filepath":"../src/components/TextInput/TextInput.tsx","title":"TextInput","description":"A component to allow users to input text.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/textinput-flat.focused.png\" />\n    <figcaption>Flat (focused)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/textinput-flat.disabled.png\" />\n    <figcaption>Flat (disabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/textinput-outlined.focused.png\" />\n    <figcaption>Outlined (focused)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/textinput-outlined.disabled.png\" />\n    <figcaption>Outlined (disabled)</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { TextInput } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [text, setText] = React.useState(\"\");\n\n  return (\n    <TextInput\n      label=\"Email\"\n      value={text}\n      onChangeText={text => setText(text)}\n    />\n  );\n};\n\nexport default MyComponent;\n```\n\n@extends TextInput props https://reactnative.dev/docs/textinput#props","link":"text-input","data":{"description":"A component to allow users to input text.\n\n<div class=\"screenshots\">\n  <figure>\n    <img src=\"screenshots/textinput-flat.focused.png\" />\n    <figcaption>Flat (focused)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/textinput-flat.disabled.png\" />\n    <figcaption>Flat (disabled)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/textinput-outlined.focused.png\" />\n    <figcaption>Outlined (focused)</figcaption>\n  </figure>\n  <figure>\n    <img src=\"screenshots/textinput-outlined.disabled.png\" />\n    <figcaption>Outlined (disabled)</figcaption>\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { TextInput } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [text, setText] = React.useState(\"\");\n\n  return (\n    <TextInput\n      label=\"Email\"\n      value={text}\n      onChangeText={text => setText(text)}\n    />\n  );\n};\n\nexport default MyComponent;\n```\n\n@extends TextInput props https://reactnative.dev/docs/textinput#props","displayName":"TextInput","methods":[],"statics":[],"props":{"mode":{"required":false,"tsType":{"name":"union","raw":"'flat' | 'outlined'","elements":[{"name":"literal","value":"'flat'"},{"name":"literal","value":"'outlined'"}]},"description":"Mode of the TextInput.\n- `flat` - flat input with an underline.\n- `outlined` - input with an outline.\n\nIn `outlined` mode, the background color of the label is derived from `colors?.background` in theme or the `backgroundColor` style.\nThis component render TextInputOutlined or TextInputFlat based on that props","defaultValue":{"value":"'flat'","computed":false}},"left":{"required":false,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":""},"right":{"required":false,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":""},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"If true, user won't be able to interact with the component.","defaultValue":{"value":"false","computed":false}},"label":{"required":false,"tsType":{"name":"TextInputLabelProp"},"description":"The text or component to use for the floating label."},"placeholder":{"required":false,"tsType":{"name":"string"},"description":"Placeholder for the input."},"error":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to style the TextInput with error style.","defaultValue":{"value":"false","computed":false}},"onChangeText":{"required":false,"tsType":{"name":"Function"},"description":"Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler."},"selectionColor":{"required":false,"tsType":{"name":"string"},"description":"Selection color of the input."},"underlineColor":{"required":false,"tsType":{"name":"string"},"description":"Inactive underline color of the input."},"activeUnderlineColor":{"required":false,"tsType":{"name":"string"},"description":"Active underline color of the input."},"outlineColor":{"required":false,"tsType":{"name":"string"},"description":"Inactive outline color of the input."},"activeOutlineColor":{"required":false,"tsType":{"name":"string"},"description":"Active outline color of the input."},"textColor":{"required":false,"tsType":{"name":"string"},"description":"Color of the text in the input."},"dense":{"required":false,"tsType":{"name":"boolean"},"description":"Sets min height with densed layout. For `TextInput` in `flat` mode\nheight is `64dp` or in dense layout - `52dp` with label or `40dp` without label.\nFor `TextInput` in `outlined` mode\nheight is `56dp` or in dense layout - `40dp` regardless of label.\nWhen you apply `height` prop in style the `dense` prop affects only `paddingVertical` inside `TextInput`","defaultValue":{"value":"false","computed":false}},"multiline":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the input can have multiple lines.","defaultValue":{"value":"false","computed":false}},"numberOfLines":{"required":false,"tsType":{"name":"number"},"description":"The number of lines to show in the input (Android only)."},"onFocus":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(args: any) => void","signature":{"arguments":[{"name":"args","type":{"name":"any"}}],"return":{"name":"void"}}},"description":"Callback that is called when the text input is focused."},"onBlur":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(args: any) => void","signature":{"arguments":[{"name":"args","type":{"name":"any"}}],"return":{"name":"void"}}},"description":"Callback that is called when the text input is blurred."},"render":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(props: RenderProps) => React.ReactNode","signature":{"arguments":[{"name":"props","type":{"name":"RenderProps"}}],"return":{"name":"ReactReactNode","raw":"React.ReactNode"}}},"description":"Callback to render a custom input component such as `react-native-text-input-mask`\ninstead of the default `TextInput` component from `react-native`.\n\nExample:\n```js\n<TextInput\n  label=\"Phone number\"\n  render={props =>\n    <TextInputMask\n      {...props}\n      mask=\"+[00] [000] [000] [000]\"\n    />\n  }\n/>\n```","defaultValue":{"value":"(props: RenderProps) => <NativeTextInput {...props} />","computed":false}},"value":{"required":false,"tsType":{"name":"string"},"description":"Value of the text input."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Pass `fontSize` prop to modify the font size inside `TextInput`.\nPass `height` prop to set `TextInput` height. When `height` is passed,\n`dense` prop will affect only input's `paddingVertical`.\nPass `paddingHorizontal` to modify horizontal padding.\nThis can be used to get MD Guidelines v1 TextInput look."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"testID":{"required":false,"tsType":{"name":"string"},"description":"testID to be used on tests."},"contentStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Pass custom style directly to the input itself.\nOverrides input style\nExample: `paddingLeft`, `backgroundColor`"},"outlineStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Pass style to override the default style of outlined wrapper.\nOverrides style when mode is set to `outlined`\nExample: `borderRadius`, `borderColor`"},"underlineStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":"Pass style to override the default style of underlined wrapper.\nOverrides style when mode is set to `flat`\nExample: `borderRadius`, `borderColor`"},"editable":{"defaultValue":{"value":"true","computed":false},"required":false}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/TextInput/TextInput.tsx"]},{"filepath":"../src/components/TextInput/Adornment/TextInputAffix.tsx","title":"TextInput.Affix","description":"A component to render a leading / trailing text in the TextInput\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/textinput-outline.affix.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { TextInput } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [text, setText] = React.useState('');\n\n  return (\n    <TextInput\n      mode=\"outlined\"\n      label=\"Outlined input\"\n      placeholder=\"Type something\"\n      right={<TextInput.Affix text=\"/100\" />}\n    />\n  );\n};\n\nexport default MyComponent;\n```","link":"text-input-affix","data":{"description":"A component to render a leading / trailing text in the TextInput\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/textinput-outline.affix.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { TextInput } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [text, setText] = React.useState('');\n\n  return (\n    <TextInput\n      mode=\"outlined\"\n      label=\"Outlined input\"\n      placeholder=\"Type something\"\n      right={<TextInput.Affix text=\"/100\" />}\n    />\n  );\n};\n\nexport default MyComponent;\n```","displayName":"TextInput.Affix","methods":[],"statics":[],"props":{"text":{"required":true,"tsType":{"name":"string"},"description":"Text to show."},"onLayout":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(event: LayoutChangeEvent) => void","signature":{"arguments":[{"name":"event","type":{"name":"LayoutChangeEvent"}}],"return":{"name":"void"}}},"description":""},"textStyle":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":"Style that is passed to the Text element."},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/TextInput/Adornment/TextInputAffix.tsx"],"group":"TextInput"},{"filepath":"../src/components/TextInput/Adornment/TextInputIcon.tsx","title":"TextInput.Icon","description":"A component to render a leading / trailing icon in the TextInput\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/textinput-flat.icon.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { TextInput } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [text, setText] = React.useState('');\n\n  return (\n    <TextInput\n      label=\"Password\"\n      secureTextEntry\n      right={<TextInput.Icon icon=\"eye\" />}\n    />\n  );\n};\n\nexport default MyComponent;\n```","link":"text-input-icon","data":{"description":"A component to render a leading / trailing icon in the TextInput\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/textinput-flat.icon.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { TextInput } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [text, setText] = React.useState('');\n\n  return (\n    <TextInput\n      label=\"Password\"\n      secureTextEntry\n      right={<TextInput.Icon icon=\"eye\" />}\n    />\n  );\n};\n\nexport default MyComponent;\n```","displayName":"TextInput.Icon","methods":[],"statics":[],"props":{"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"@renamed Renamed from 'name' to 'icon` in v5.x\nIcon to show."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"forceTextInputFocus":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the TextInput will focus after onPress.","defaultValue":{"value":"true","computed":false}},"color":{"required":false,"tsType":{"name":"union","raw":"((isTextInputFocused: boolean) => string | undefined) | string","elements":[{"name":"unknown"},{"name":"string"}]},"description":"Color of the icon or a function receiving a boolean indicating whether the TextInput is focused and returning the color."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/TextInput/Adornment/TextInputIcon.tsx"],"group":"TextInput"},{"filepath":"../src/components/ToggleButton/ToggleButton.tsx","title":"ToggleButton","description":"Toggle buttons can be used to group related options. To emphasize groups of related toggle buttons,\na group should share a common container.\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/toggle-button.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ToggleButton } from 'react-native-paper';\n\nconst ToggleButtonExample = () => {\n  const [status, setStatus] = React.useState('checked');\n\n  const onButtonToggle = value => {\n    setStatus(status === 'checked' ? 'unchecked' : 'checked');\n  };\n\n  return (\n    <ToggleButton\n      icon=\"bluetooth\"\n      value=\"bluetooth\"\n      status={status}\n      onPress={onButtonToggle}\n    />\n  );\n};\n\nexport default ToggleButtonExample;\n\n```","link":"toggle-button","data":{"description":"Toggle buttons can be used to group related options. To emphasize groups of related toggle buttons,\na group should share a common container.\n\n<div class=\"screenshots\">\n  <img class=\"medium\" src=\"screenshots/toggle-button.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ToggleButton } from 'react-native-paper';\n\nconst ToggleButtonExample = () => {\n  const [status, setStatus] = React.useState('checked');\n\n  const onButtonToggle = value => {\n    setStatus(status === 'checked' ? 'unchecked' : 'checked');\n  };\n\n  return (\n    <ToggleButton\n      icon=\"bluetooth\"\n      value=\"bluetooth\"\n      status={status}\n      onPress={onButtonToggle}\n    />\n  );\n};\n\nexport default ToggleButtonExample;\n\n```","displayName":"ToggleButton","methods":[],"statics":[],"props":{"icon":{"required":true,"tsType":{"name":"IconSource"},"description":"Icon to display for the `ToggleButton`."},"size":{"required":false,"tsType":{"name":"number"},"description":"Size of the icon."},"color":{"required":false,"tsType":{"name":"string"},"description":"Custom text color for button."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether the button is disabled."},"accessibilityLabel":{"required":false,"tsType":{"name":"string"},"description":"Accessibility label for the `ToggleButton`. This is read by the screen reader when the user taps the button."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(value?: GestureResponderEvent | string) => void","signature":{"arguments":[{"name":"value","type":{"name":"union","raw":"GestureResponderEvent | string","elements":[{"name":"GestureResponderEvent"},{"name":"string"}]}}],"return":{"name":"void"}}},"description":"Function to execute on press."},"value":{"required":false,"tsType":{"name":"string"},"description":"Value of button."},"status":{"required":false,"tsType":{"name":"union","raw":"'checked' | 'unchecked'","elements":[{"name":"literal","value":"'checked'"},{"name":"literal","value":"'unchecked'"}]},"description":"Status of button."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"},"ref":{"required":false,"tsType":{"name":"ReactRefObject","raw":"React.RefObject<View>","elements":[{"name":"View"}]},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/ToggleButton/ToggleButton.tsx"]},{"filepath":"../src/components/ToggleButton/ToggleButtonGroup.tsx","title":"ToggleButton.Group","description":"Toggle group allows to control a group of toggle buttons.</br>\nIt doesn't change the appearance of the toggle buttons. If you want to group them in a row, check out <a href=\"toggle-button-row.html\">`ToggleButton.Row`</a>.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/toggle-button-group.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ToggleButton } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('left');\n\n  return (\n    <ToggleButton.Group\n      onValueChange={value => setValue(value)}\n      value={value}>\n      <ToggleButton icon=\"format-align-left\" value=\"left\" />\n      <ToggleButton icon=\"format-align-right\" value=\"right\" />\n    </ToggleButton.Group>\n  );\n};\n\nexport default MyComponent;\n```","link":"toggle-button-group","data":{"description":"Toggle group allows to control a group of toggle buttons.</br>\nIt doesn't change the appearance of the toggle buttons. If you want to group them in a row, check out <a href=\"toggle-button-row.html\">`ToggleButton.Row`</a>.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/toggle-button-group.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ToggleButton } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('left');\n\n  return (\n    <ToggleButton.Group\n      onValueChange={value => setValue(value)}\n      value={value}>\n      <ToggleButton icon=\"format-align-left\" value=\"left\" />\n      <ToggleButton icon=\"format-align-right\" value=\"right\" />\n    </ToggleButton.Group>\n  );\n};\n\nexport default MyComponent;\n```","displayName":"ToggleButton.Group","methods":[],"statics":[],"props":{"onValueChange":{"required":true,"tsType":{"name":"signature","type":"function","raw":"(value: Value) => void","signature":{"arguments":[{"name":"value","type":{"name":"Value"}}],"return":{"name":"void"}}},"description":"Function to execute on selection change."},"value":{"required":true,"tsType":{"name":"union","raw":"Value | null","elements":[{"name":"Value"},{"name":"null"}]},"description":"Value of the currently selected toggle button."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"React elements containing toggle buttons."}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/ToggleButton/ToggleButtonGroup.tsx"],"group":"ToggleButton"},{"filepath":"../src/components/ToggleButton/ToggleButtonRow.tsx","title":"ToggleButton.Row","description":"Toggle button row renders a group of toggle buttons in a row.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/toggle-button-row.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ToggleButton } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('left');\n\n  return (\n    <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>\n      <ToggleButton icon=\"format-align-left\" value=\"left\" />\n      <ToggleButton icon=\"format-align-right\" value=\"right\" />\n    </ToggleButton.Row>\n  );\n};\n\nexport default MyComponent;\n\n```","link":"toggle-button-row","data":{"description":"Toggle button row renders a group of toggle buttons in a row.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"medium\" src=\"screenshots/toggle-button-row.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { ToggleButton } from 'react-native-paper';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('left');\n\n  return (\n    <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>\n      <ToggleButton icon=\"format-align-left\" value=\"left\" />\n      <ToggleButton icon=\"format-align-right\" value=\"right\" />\n    </ToggleButton.Row>\n  );\n};\n\nexport default MyComponent;\n\n```","displayName":"ToggleButton.Row","methods":[],"statics":[],"props":{"onValueChange":{"required":true,"tsType":{"name":"signature","type":"function","raw":"(value: string) => void","signature":{"arguments":[{"name":"value","type":{"name":"string"}}],"return":{"name":"void"}}},"description":"Function to execute on selection change."},"value":{"required":true,"tsType":{"name":"string"},"description":"Value of the currently selected toggle button."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"React elements containing toggle buttons."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/ToggleButton/ToggleButtonRow.tsx"],"group":"ToggleButton"},{"filepath":"../src/components/Tooltip/Tooltip.tsx","title":"Tooltip","description":"Tooltips display informative text when users hover over, focus on, or tap an element.\n\nPlain tooltips, when activated, display a text label identifying an element, such as a description of its function. Tooltips should include only short, descriptive text and avoid restating visible UI text.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/tooltip.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { IconButton, Tooltip } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Tooltip title=\"Selected Camera\">\n    <IconButton icon=\"camera\" selected size={24} onPress={() => {}} />\n  </Tooltip>\n);\n\nexport default MyComponent;\n```","link":"tooltip","data":{"description":"Tooltips display informative text when users hover over, focus on, or tap an element.\n\nPlain tooltips, when activated, display a text label identifying an element, such as a description of its function. Tooltips should include only short, descriptive text and avoid restating visible UI text.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/tooltip.png\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { IconButton, Tooltip } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <Tooltip title=\"Selected Camera\">\n    <IconButton icon=\"camera\" selected size={24} onPress={() => {}} />\n  </Tooltip>\n);\n\nexport default MyComponent;\n```","displayName":"Tooltip","methods":[],"statics":[],"props":{"children":{"required":true,"tsType":{"name":"ReactReactElement","raw":"React.ReactElement"},"description":"Tooltip reference element. Needs to be able to hold a ref."},"enterTouchDelay":{"required":false,"tsType":{"name":"number"},"description":"The number of milliseconds a user must touch the element before showing the tooltip.","defaultValue":{"value":"500","computed":false}},"leaveTouchDelay":{"required":false,"tsType":{"name":"number"},"description":"The number of milliseconds after the user stops touching an element before hiding the tooltip.","defaultValue":{"value":"1500","computed":false}},"title":{"required":true,"tsType":{"name":"string"},"description":"Tooltip title"},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Tooltip/Tooltip.tsx"]},{"filepath":"../src/components/TouchableRipple/TouchableRipple.tsx","title":"TouchableRipple","description":"A wrapper for views that should respond to touches.\nProvides a material \"ink ripple\" interaction effect for supported platforms (>= Android Lollipop).\nOn unsupported platforms, it falls back to a highlight effect.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/touchable-ripple.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Text, TouchableRipple } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <TouchableRipple\n    onPress={() => console.log('Pressed')}\n    rippleColor=\"rgba(0, 0, 0, .32)\"\n  >\n    <Text>Press anywhere</Text>\n  </TouchableRipple>\n);\n\nexport default MyComponent;\n```\n\n@extends Pressable props https://reactnative.dev/docs/Pressable#props","link":"touchable-ripple","data":{"description":"A wrapper for views that should respond to touches.\nProvides a material \"ink ripple\" interaction effect for supported platforms (>= Android Lollipop).\nOn unsupported platforms, it falls back to a highlight effect.\n\n<div class=\"screenshots\">\n  <figure>\n    <img class=\"small\" src=\"screenshots/touchable-ripple.gif\" />\n  </figure>\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { View } from 'react-native';\nimport { Text, TouchableRipple } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <TouchableRipple\n    onPress={() => console.log('Pressed')}\n    rippleColor=\"rgba(0, 0, 0, .32)\"\n  >\n    <Text>Press anywhere</Text>\n  </TouchableRipple>\n);\n\nexport default MyComponent;\n```\n\n@extends Pressable props https://reactnative.dev/docs/Pressable#props","displayName":"TouchableRipple","methods":[],"statics":[],"props":{"borderless":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to render the ripple outside the view bounds.","defaultValue":{"value":"false","computed":false}},"background":{"required":false,"tsType":{"name":"Object"},"description":"Type of background drawabale to display the feedback (Android).\nhttps://reactnative.dev/docs/pressable#rippleconfig"},"centered":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to start the ripple at the center (Web)."},"disabled":{"required":false,"tsType":{"name":"boolean"},"description":"Whether to prevent interaction with the touchable."},"onPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on press. If not set, will cause the touchable to be disabled."},"onLongPress":{"required":false,"tsType":{"name":"signature","type":"function","raw":"(e: GestureResponderEvent) => void","signature":{"arguments":[{"name":"e","type":{"name":"GestureResponderEvent"}}],"return":{"name":"void"}}},"description":"Function to execute on long press."},"rippleColor":{"required":false,"tsType":{"name":"string"},"description":"Color of the ripple effect (Android >= 5.0 and Web)."},"underlayColor":{"required":false,"tsType":{"name":"string"},"description":"Color of the underlay for the highlight effect (Android < 5.0 and iOS)."},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":"Content of the `TouchableRipple`."},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"ViewStyle"}],"raw":"StyleProp<ViewStyle>"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":"@optional"}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/TouchableRipple/TouchableRipple.tsx"]},{"filepath":"../src/components/Typography/Text.tsx","title":"Text","description":"Typography component showing styles complied with passed `variant` prop and supported by the type system.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/typography.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Text } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <>\n    <Text variant=\"displayLarge\">Display Large</Text>\n    <Text variant=\"displayMedium\">Display Medium</Text>\n    <Text variant=\"displaySmall\">Display small</Text>\n\n    <Text variant=\"headlineLarge\">Headline Large</Text>\n    <Text variant=\"headlineMedium\">Headline Medium</Text>\n    <Text variant=\"headlineSmall\">Headline Small</Text>\n\n    <Text variant=\"titleLarge\">Title Large</Text>\n    <Text variant=\"titleMedium\">Title Medium</Text>\n    <Text variant=\"titleSmall\">Title Small</Text>\n\n    <Text variant=\"bodyLarge\">Body Large</Text>\n    <Text variant=\"bodyMedium\">Body Medium</Text>\n    <Text variant=\"bodySmall\">Body Small</Text>\n\n    <Text variant=\"labelLarge\">Label Large</Text>\n    <Text variant=\"labelMedium\">Label Medium</Text>\n    <Text variant=\"labelSmall\">Label Small</Text>\n </>\n);\n\nexport default MyComponent;\n```\n\n@extends Text props https://reactnative.dev/docs/text#props","link":"text","data":{"description":"Typography component showing styles complied with passed `variant` prop and supported by the type system.\n\n<div class=\"screenshots\">\n  <img class=\"small\" src=\"screenshots/typography.png\" />\n</div>\n\n## Usage\n```js\nimport * as React from 'react';\nimport { Text } from 'react-native-paper';\n\nconst MyComponent = () => (\n  <>\n    <Text variant=\"displayLarge\">Display Large</Text>\n    <Text variant=\"displayMedium\">Display Medium</Text>\n    <Text variant=\"displaySmall\">Display small</Text>\n\n    <Text variant=\"headlineLarge\">Headline Large</Text>\n    <Text variant=\"headlineMedium\">Headline Medium</Text>\n    <Text variant=\"headlineSmall\">Headline Small</Text>\n\n    <Text variant=\"titleLarge\">Title Large</Text>\n    <Text variant=\"titleMedium\">Title Medium</Text>\n    <Text variant=\"titleSmall\">Title Small</Text>\n\n    <Text variant=\"bodyLarge\">Body Large</Text>\n    <Text variant=\"bodyMedium\">Body Medium</Text>\n    <Text variant=\"bodySmall\">Body Small</Text>\n\n    <Text variant=\"labelLarge\">Label Large</Text>\n    <Text variant=\"labelMedium\">Label Medium</Text>\n    <Text variant=\"labelSmall\">Label Small</Text>\n </>\n);\n\nexport default MyComponent;\n```\n\n@extends Text props https://reactnative.dev/docs/text#props","methods":[],"statics":[],"props":{"variant":{"required":false,"tsType":{"name":"unknown"},"description":"@supported Available in v5.x with theme version 3\n\nVariant defines appropriate text styles for type role and its size.\nAvailable variants:\n\n Display: `displayLarge`, `displayMedium`, `displaySmall`\n\n Headline: `headlineLarge`, `headlineMedium`, `headlineSmall`\n\n Title: `titleLarge`, `titleMedium`, `titleSmall`\n\n Label:  `labelLarge`, `labelMedium`, `labelSmall`\n\n Body: `bodyLarge`, `bodyMedium`, `bodySmall`"},"children":{"required":true,"tsType":{"name":"ReactReactNode","raw":"React.ReactNode"},"description":""},"theme":{"required":false,"tsType":{"name":"ThemeProp"},"description":""},"style":{"required":false,"tsType":{"name":"StyleProp","elements":[{"name":"TextStyle"}],"raw":"StyleProp<TextStyle>"},"description":""}}},"type":"component","dependencies":["/home/circleci/react-native-paper/src/components/Typography/Text.tsx"],"group":"Typography"}
]