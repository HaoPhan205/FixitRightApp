
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen
        name="signup"
        options={{
          title: "Register",
          headerLeft: () => null, // Prevents default back button
        }}
      />
    </Stack>

   
  )
}