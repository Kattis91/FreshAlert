import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: 'white', 
      tabBarInactiveTintColor: '#fff',
      tabBarStyle: { backgroundColor: '#338F85' }, 
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color="white"
              size={focused ? 33 : 30}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 13 : 12,
                color: "white",
                marginTop: focused ? 4 : 0,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => (
            Platform.OS === 'ios' ? (
              <Ionicons 
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={focused ? 32 : 30} 
                color="white"
              />
            ) : (
              <TabBarIcon
                name={focused ? "add-circle" : "add-circle-outline"}
                color="white"
                size={focused ? 31 : 30}
              />
            )
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 13 : 12,
                color: "white",
                marginTop: focused ? 4 : 0,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Add
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="trash"
        options={{
          title: 'Trash',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name={focused ? 'trash' : 'trash-outline'} 
              size={focused ? 33 : 30} 
              color="white"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 13 : 12,
                color: "white",
                marginTop: focused ? 4 : 0,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Trash
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
