# react-native-cli-monorepo-example

## Project Structure:
    .
    ├── packages
    │   ├── mobile      # @rnws/mobile
    │   ├── util        # @rnws/util
    └── package.json    # @rnws/root

## How to Run:

1. Ensure you've already followed this [instruction](https://github.com/react-native-community/cli/blob/main/CONTRIBUTING.md#contributing-to-react-native-cli) for setting cli environment.
2. Run `yarn` to install dependencies
3. Run `cd packages/mobile` and `yarn link "@react-native-community/cli-platform-ios" "@react-native-community/cli-platform-android" "@react-native-community/cli" "@react-native-community/cli-server-api" "@react-native-community/cli-types" "@react-native-community/cli-tools" "@react-native-community/cli-debugger-ui" "@react-native-community/cli-hermes" "@react-native-community/cli-plugin-metro" "@react-native-community/cli-clean"
` to use cli symlinks.
4. Run `yarn start` to start packager
5. Run `yarn android` to build and install android app

## What to Expect:

1. `@react-native-community/datetimepicker` should be listed as dependencies when you run `npx react-native config` in `packages/mobile` directory. `@react-native-community/datetimepicker` is defined as dependency in [packages/util/package.json](packages/util/package.json#L15)
2. DatePicker should be displayed when you press `Open DatePicker` button in app
