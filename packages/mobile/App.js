/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {log, openDatePicker, warn} from '@rnws/util';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 8,
          }}>
          <Button
            title="Log"
            onPress={() => {
              log('log from mobile');
            }}
          />
          <View style={{height: 8}} />
          <Button
            title="Warn"
            onPress={() => {
              warn('warn from mobile');
            }}
          />
          <View style={{height: 8}} />
          <Button
            title="Open DatePicker"
            onPress={() => {
              openDatePicker();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
