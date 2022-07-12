import React, { useState } from "react";
import { Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export function log(msg) {
  console.log(`[@rnws/util] ${msg}`);
}

export function warn(msg) {
  console.warn(`[@rnws/util] ${msg}`);
}

export function DatePicker() {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Button title="Show DatePicker" onPress={() => setIsVisible(true)} />
      {isVisible && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={(_, selectedDate) => {
            if (Platform.OS === "android") setIsVisible(false);
            setDate(selectedDate);
          }}
        />
      )}
    </>
  );
}
