import { View, Text, TextInput, TouchableOpacity, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/style/signinscreen";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeAuthen, loginAccountMecha } from "@/api/authenticate/authenticate";
import { useFocusEffect, useRouter } from "expo-router";
import { checkAuthorization } from "@/service/authentication";

export default function SignIn() {
  const [login, setLogin] = useState(false)
  const [hidePassword,setHidePassword] = useState(true)
  const [mailValue, setMailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const nav = useRouter()
  const goToSignup = ()=>{
    nav.replace("./login/signup")
  }
  const SignIn = async()=>{
    var valueProp:AuthenProps = {
      UserName: mailValue,
      Password: passwordValue
    }
    const data:AuthenData = await loginAccountMecha(valueProp)
    if(data){
      console.log("Login Success:", data.AccessToken);
      await AsyncStorage.setItem("access_token",JSON.stringify(data))
      const user:UserProps = await decodeAuthen()
      if(user){
        //await AsyncStorage.removeItem("access_token")
        console.log(user)
        await AsyncStorage.setItem("user_profile",JSON.stringify(user))
        setLogin(!login)
      }
    }
    else{
      errorLoginToast("Invalid Email or Password")
    }
  }
  useFocusEffect(
    useCallback(()=>{
      const fetchData = async () => {
        const data = await AsyncStorage.getItem("user_profile")
        if(data){
          const user:UserProps = JSON.parse(data)
          const isMecha = checkAuthorization(user)
          if(isMecha){
            nav.push("./login/home/")
          }
          else{
            errorLoginToast("You are not authorized")
          }
        }else{

        }
      }
      fetchData();
    },[login])
  )

  const errorLoginToast = (message:string)=>{
    Alert.alert(
      "Error",
      message,
      [
        { text: "OK", onPress: () => console.log("Ok?") },
      ],
      { cancelable: false }
    );
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
