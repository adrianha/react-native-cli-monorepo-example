import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export function log(msg) {
  console.log(`[@rnws/util] ${msg}`);
}

export function warn(msg) {
  console.warn(`[@rnws/util] ${msg}`);
}

export function openDatePicker() {
  DateTimePickerAndroid.open({ mode: "date", value: new Date() });
}
