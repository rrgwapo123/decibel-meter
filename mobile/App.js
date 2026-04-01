import React, { useState } from 'react';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Dashboard" : "Login"}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Dashboard">
              {(props) => <DashboardScreen {...props} onLogout={() => setIsLoggedIn(false)} />}
            </Stack.Screen>
            <Stack.Screen name="Reports" component={ReportsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
