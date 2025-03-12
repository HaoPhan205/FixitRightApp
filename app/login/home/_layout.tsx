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
        headerStyle: { backgroundColor: "#DFF2EB", height: 120 },
        headerTitleAlign: "center",
        headerTitleContainerStyle: {},
        headerTitleStyle: { fontSize: 24 },
        tabBarStyle: {
          backgroundColor: "#4A628A",
          height: 80,
          borderRadius: 17,
          paddingTop: 10,
        },
        tabBarLabelStyle: { fontSize: 12, color: "white" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#DFF2EB",
      }}
    >
      {Object.entries(tabIcons).map(([name, icon]) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: name.charAt(0).toUpperCase() + name.slice(1),
            title: name.charAt(0).toUpperCase() + name.slice(1),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
