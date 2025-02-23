# COLORINGBOOK

a.k.a Mewarika, is a thesis project to create drawing app using `react-native`. The main purpose is to get a wide-range asset from `Freepik API` and use it for drawing object.

## Created using?

- React Native
- React Navigation (for navigation system)
- React Native Skia (for drawing the canvas)
- React Native Gesture Handler (for drawing handler)
- React Native Vector Icons (for icons pack)
- OsmiCSX (for easier styling)
- Zustand (for global state management)

## Getting started

Install package

```bash
yarn install
```

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

Then, run this project

```bash
yarn start # --reset-cache (optional)
```

Finally, choose what platform to start

```bash
yarn android # or yarn ios
```

## Others required functionality

### For linking native asset?

Use `react-native-asset` for linking asset to native system. Usage:

```bash
npx react-native-asset
```
