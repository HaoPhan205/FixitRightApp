import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import {styles} from '@/style/tabs'
import { Ionicons } from "@expo/vector-icons";

export default function _layout() {
  return (
   <Tabs
      screenOptions={{
        headerShown:false,
        tabBarStyle:styles.tabBar,
        tabBarActiveTintColor: "#E1F2EC", // light blue
        tabBarInactiveTintColor: "#3C4D70", // default
      }}
   >
     <Tabs.Screen name="index" 
         options={{ tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={"white"} />,

         }}
     />
      <Tabs.Screen name="bookmark" 
         options={{ tabBarLabel: 'Bookmark',
          tabBarIcon: ({ color }) => <Ionicons name="bookmark" size={24}  color={"white"} />,
          }}
     />
     <Tabs.Screen name="chat" 
         options={{ tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => <Ionicons name="chatbox-ellipses" size={24}  color={"white"} />,
          }}
     />
     <Tabs.Screen name="profile" 
         options={{ tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-sharp" size={24}  color={"white"} />,
          }}
     />

   </Tabs>
  )
}