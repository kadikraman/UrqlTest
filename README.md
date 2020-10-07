# React Native urql example app

This is an example app for a React Native app with [urql](https://github.com/FormidableLabs/urql).

It uses:

- [urql](https://github.com/FormidableLabs/urql)
- [urql devtools](https://github.com/FormidableLabs/urql-devtools)
- [artsy](https://github.com/artsy/metaphysics) art api
- [React Navigation](https://reactnavigation.org/)

## Setup instructions

This is a plain React Native app, meaning that in order to run it, you'll need to have XCode (for iOS) or Android Studio (for Android) set up.

First, clone the repo and install the JavaSctipt dependencies with

```sh
yarn
```

### iOS

To run the app on iOS:

```sh
npx pod-install
react-native run-ios
```

### Android

To run the app on Android, you may need to open your Android emulator first. Then run:

```sh
react-native run-android
```
