import React, { useCallback, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // If using Expo; remove if not needed
import styles from "@/style/register";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";

export default function RegisterScreen() {
  const nav = useRouter()
  const returnPage = ()=>{
    nav.replace("/login")
  }
  // register Format
  const [user, setUser] = useState<UserRequestProps>({
    Fullname: "",
    Gender: "Male",
    Birthday: new Date().toISOString().split('T')[0],
    Address: "",
    UserName: "",
    Password: "",
    Email: "",
  });

  const [hidePassword, setHidePassword] = useState(true);

  // Helper function to update any field
  const handleChange = (field: keyof UserRequestProps, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for the Register button
  const handleRegister = () => {
    console.log("User Data:", user);
    //TODO
  };

  return (
    <View style={styles.container}>
        <Pressable onPress={returnPage} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        placeholderTextColor="#666"
        value={user.Fullname}
        onChangeText={(text) => handleChange("Fullname", text)}
      />
      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        placeholder="Male"
        placeholderTextColor="#666"
        value={user.Gender}
        onChangeText={(text) => handleChange("Gender", text)}
      />
      <Text style={styles.label}>Birthday</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#666"
        value={user.Birthday}
        onChangeText={(text) => handleChange("Birthday", text)}
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="123 Main St"
        placeholderTextColor="#666"
        value={user.Address}
        onChangeText={(text) => handleChange("Address", text)}
      />
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="john_doe"
        placeholderTextColor="#666"
        value={user.UserName}
        onChangeText={(text) => handleChange("UserName", text)}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="#666"
        value={user.Email}
        onChangeText={(text) => handleChange("Email", text)}
      />
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          secureTextEntry={hidePassword}
          placeholder="******"
          placeholderTextColor="#666"
          value={user.Password}
          onChangeText={(text) => handleChange("Password", text)}
        />
        <Pressable onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? "eye-off" : "eye"} size={20} color="black" />
        </Pressable>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
