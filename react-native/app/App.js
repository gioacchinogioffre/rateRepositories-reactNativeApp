import React from 'react'
import {  NativeBaseProvider } from 'native-base'
import LoginScreen from './src/Screens/LoginScreen.js'
import PaymentScreen from './src/Screens/PaymentScreen'


export default function App() {
  return (
    <NativeBaseProvider>
      <PaymentScreen/>
    </NativeBaseProvider>
  );
}

