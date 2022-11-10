import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import LoginScreen from './Screens/LoginScreen.js';
import RegisterScreen from './Screens/RegisterScreen.js';
import HomeScreen from './Screens/HomeScreen.js';
import ProfileScreen from './Screens/ProfileScreen.js';
import InvitesScreen from './Screens/InvitesScreen';
import Photos from './Screens/CollectPhotos';
import Videos from './Screens/RecordVideo'
import AnotatePhotos from './Screens/Anotator'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const BLUESH = '#3185FC';
const BACKGROUND = '#F5FAFF';
const MILK = '#e7dddcff';
const ORANGE = '#FD6B03';
const SHADOWGREY = '#E8E8E8';
export default function App() {
  return (
    <View style={styles.mainview}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
            name="Anotator"
            component={AnotatePhotos}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Video"
            component={Videos}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Photo"
            component={Photos}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Invites"
            component={InvitesScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  mainview: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});
