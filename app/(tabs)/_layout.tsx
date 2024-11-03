import { Tabs } from 'expo-router';
import React from 'react';

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
      tabBarStyle: { backgroundColor: '#10A78B' }, 
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'}  size={focused ? 37 : 30} color={'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'}  size={focused ? 37 : 30} color={'white'}/>
          ),
        }}
      />
      <Tabs.Screen
        name="trash"
        options={{
          title: 'Trash',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'trash' : 'trash-outline'} size={focused ? 37 : 30} color={'white'}/>
          ),
        }}
      />
    </Tabs>
  );
}
