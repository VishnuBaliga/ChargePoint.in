import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "./Screens/Welcome";
import Dashboard from "./Screens/Dashboard";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ChargePoint" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'ChargePoint.in' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55C595',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
