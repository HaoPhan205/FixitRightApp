import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

const tabIcons = {
  home: "home-outline",
  bookmark: "bookmark-outline",
  explore: "compass-outline",
  chat: "chatbubble-outline",
  profile: "person-outline",
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown:false,
        tabBarStyle:styles.tabBar,
        tabBarActiveTintColor: "#E1F2EC", // light blue
        tabBarInactiveTintColor: "white", // default
      }}
   >
     <Tabs.Screen name="index" 
         options={{ tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,

         }}
     />
      <Tabs.Screen name="booking" 
         options={{ tabBarLabel: 'Booking',
          tabBarIcon: ({ color }) => <Ionicons name="bookmark" size={24}  color={color} />,
          }}
     />
     <Tabs.Screen name="chat" 
         options={{ tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => <Ionicons name="chatbox-ellipses" size={24}  color={color} />,
          }}
     />
     <Tabs.Screen name="profile" 
         options={{ tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-sharp" size={24}  color={color} />,
          }}
     />

   </Tabs>
  )
}
