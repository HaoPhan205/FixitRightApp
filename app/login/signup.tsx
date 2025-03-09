import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; 
import styles from "@/style/register";
import { useRouter } from "expo-router";
import { ageValidation } from "@/service/validation";
import { registerMechaAccount } from "@/api/authenticate/authenticate";

export default function RegisterScreen() {
  const nav = useRouter();
  const returnPage = () => nav.replace("/login");

  const [user, setUser] = useState<UserRequestProps>({
    Fullname: "",
    Gender: "Male",
    Birthday: new Date().toISOString().split("T")[0], 
    // Default to today. What? It is acceptable child labor
    Address: "",
    UserName: "",
    Password: "",
    Email: "",
  });

  const [hidePassword, setHidePassword] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rePassword, setRePassword] = useState("");

  // Handle field updates
  const handleChange = (field: keyof UserRequestProps, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // Handle date selection
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      if (ageValidation(formattedDate)) {
        handleChange("Birthday", formattedDate);
      } else {
        Alert.alert("Invalid Age", "You must be 18 years or older.");
      }
    }
  };

  const registerAccount = async() => {
    if (user.Password!==rePassword) {
      Alert.alert("Password Mismatch", "Passwords do not match");
      return;
    }
    try {
      const response = await registerMechaAccount(user);
      if (response) {
        console.log(response);
        Alert.alert("Registration Successful!", "Please Verify Your Account Via Email");
        nav.push("/login");
      }
      else{
        Alert.alert("Registration Failed!","Please Try Again");
      }
    } catch (error:any) {
      Alert.alert("Registration Failed", error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={returnPage} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <Text style={styles.title}>Create Your Account</Text>

 
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="John Doe" value={user.Fullname} onChangeText={(text) => handleChange("Fullname", text)} />


      <Text style={styles.label}>Gender</Text>
      <TextInput style={styles.input} placeholder="Male" value={user.Gender} onChangeText={(text) => handleChange("Gender", text)} />


      <Text style={styles.label}>Birthday</Text>
      <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>{user.Birthday}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker mode="date" value={new Date(user.Birthday)} display="default" onChange={onChangeDate} />
      )}

 
      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} placeholder="123 Main St" value={user.Address} onChangeText={(text) => handleChange("Address", text)} />

 
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} placeholder="john_doe" value={user.UserName} onChangeText={(text) => handleChange("UserName", text)} />


      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="example@gmail.com" value={user.Email} onChangeText={(text) => handleChange("Email", text)} />


      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput style={styles.passwordInput} secureTextEntry={hidePassword} placeholder="******" value={user.Password} onChangeText={(text) => handleChange("Password", text)} />
        <Pressable onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? "eye-off" : "eye"} size={20} color="black" />
        </Pressable>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput style={styles.passwordInput} secureTextEntry={hidePassword} placeholder="Re-Enter Password..." onChangeText={(text) => setRePassword(text)} />
      </View>
      <Pressable
          onPress={()=>{registerAccount()}}
          style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </Pressable>
    </ScrollView>
  );
}
