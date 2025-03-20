import React from "react";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Chi tiết sản phẩm",
          headerStyle: { backgroundColor: "#DFF2EB" },
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
              >
                Detail
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="DFF2EB" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
