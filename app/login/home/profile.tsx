import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/style/profile";
import { LinearGradient } from "expo-linear-gradient";

export default function profile() {
  const nav = useRouter();
  const logout = async () => {
    await AsyncStorage.removeItem("user_profile");
    nav.dismissAll();
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#DFF2EB", "#4A628A"]}
        style={styles.gradientBackground}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Ionicons
                name="person-circle-outline"
                size={80}
                color="#ADD8E6"
              />
              <Pressable style={styles.editIcon}>
                <Ionicons name="pencil" size={16} color="black" />
              </Pressable>
            </View>
          </View>
          <Text style={styles.profileName}>Name Here</Text>
        </View>

        <ScrollView style={styles.optionsContainer}>
          <Pressable style={styles.optionItem}>
            <View style={styles.optionContent}>
              <Ionicons
                name="person-outline"
                size={24}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Your profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </Pressable>

          <Pressable style={styles.optionItem}>
            <View style={styles.optionContent}>
              <Ionicons
                name="location-outline"
                size={24}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Manage Address</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </Pressable>

          <Pressable style={styles.optionItem}>
            <View style={styles.optionContent}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>My Bookings</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </Pressable>

          <Pressable style={styles.optionItem}>
            <View style={styles.optionContent}>
              <Ionicons
                name="wallet-outline"
                size={24}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>My Wallet</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </Pressable>

          <Pressable style={styles.optionItem}>
            <View style={styles.optionContent}>
              <Ionicons
                name="settings-outline"
                size={24}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </Pressable>

          <Pressable style={styles.optionItem}>
            <View style={styles.optionContent}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </Pressable>

          <Pressable
            onPress={() => {
              logout();
            }}
            style={styles.optionItem}
          >
            <View style={styles.optionDeleteContent}>
              <Ionicons
                name="log-out"
                size={24}
                color="black"
                style={styles.optionDeleteIcon}
              />
              <Text style={styles.optionDeleteText}>Log Out</Text>
            </View>
          </Pressable>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
