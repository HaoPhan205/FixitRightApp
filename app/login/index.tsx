import { View, Text, TextInput, TouchableOpacity, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/style/signinscreen";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginAccountMecha } from "@/api/authenticate/authenticate";
import { useRouter } from "expo-router";

export default function SignIn() {
  const [hidePassword,setHidePassword] = useState(true)
  const [mailValue, setMailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const nav = useRouter()
  const goToSignup = ()=>{
    nav.replace("./login/signup")
  }
  const SignIn = async()=>{
    var valueProp:authenProps = {
      UserName: mailValue,
      Password: passwordValue
    }
    const data:authenData = await loginAccountMecha(valueProp)
    if(data){
      //console.log("Login Success:", data.AccessToken);
      await AsyncStorage.setItem(data.AccessToken,"access_token")
      await AsyncStorage.setItem(data.RefreshToken,"refresh_token")
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Welcome Back, Mechanic!</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="username..."
        placeholderTextColor="gray"
        onChangeText={(text)=>{setMailValue(text)}}
      />
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          secureTextEntry={hidePassword}
          placeholder="******"
          placeholderTextColor="gray"
          onChangeText={(text)=>{setPasswordValue(text)}}
        />
        <Pressable style={styles.eyeIcon} onPress={()=>{setHidePassword(!hidePassword)}}>
          <Ionicons name={hidePassword?"eye-off":"eye"} size={20} color="black" />
        </Pressable>
      </View>
      <Pressable>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </Pressable>

      <Pressable style={styles.signInButton}
        onPress={()=>{SignIn()}}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </Pressable>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or sign in with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.icon}>
          <Image source={require("@/assets/images/apple.png")} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image source={require("@/assets/images/google.png")} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image source={require("@/assets/images/facebook.png")} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don’t have an account? 
          </Text>
          <Pressable
              onPress={()=>{
                goToSignup()
              }}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Pressable>
      </View>
    </View>
  );
}
