import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isIpad = Platform.OS === 'ios' && Platform.isPad;
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
              size={isIpad ? 28 : 30}
              style={{ paddingRight: isIpad ? 5 : 0 }}
            />
          ),
          tabBarLabel: !isIpad
            ? ({ focused }) => (
                <Text
                  style={{
                    fontSize: focused ? 13 : 12,
                    color: 'white',
                    marginTop: focused ? 4 : 0,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Home
                </Text>
              )
            : "",
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
                size={focused ? 30 : 30}
                color="white"
                style={{ paddingRight: isIpad ? 30 : 0 }}
              />
            ) : (
              <TabBarIcon
                name={focused ? "add-circle" : "add-circle-outline"}
                color="white"
                size={isIpad ? 28 : 30} 
              />
            )
          ),
          tabBarLabel: !isIpad
            ? ({ focused }) => (
                <Text
                  style={{
                    fontSize: focused ? 13 : 12,
                    color: 'white',
                    marginTop: focused ? 4 : 0,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Add
                </Text>
              )
            : "",
        }}
      />
      <Tabs.Screen
        name="trash"
        options={{
          title: 'Trash',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'trash' : 'trash-outline'}
              size={isIpad ? 28 : 30}
              color="white"
            />
          ),
          tabBarLabel: !isIpad
            ? ({ focused }) => (
                <Text
                  style={{
                    fontSize: focused ? 13 : 12,
                    color: 'white',
                    marginTop: focused ? 4 : 0,
                    fontWeight: focused ? 'bold' : 'normal',
                  }}
                >
                  Expired
                </Text>
              )
            : "",
        }}
      />
    </Tabs>
  );
}