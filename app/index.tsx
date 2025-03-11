import { View, Text, Image, Pressable } from "react-native";
import {styles} from "@/style/splashscreen";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function index() {
  const navigate = useRouter()
  const goNext = ()=>{
    navigate.push("./splashscreen2")
  }
  useFocusEffect(useCallback(()=>{
    const prevUser = async()=>{
      const userExist = await AsyncStorage.getItem("user_profile")
      if(userExist){
        navigate.push("./login")
      }
    }
    prevUser()
  },[]))
  return (
        <LinearGradient
        style={styles.container}
        colors={['#DFF2EB', '#4A628A']} >
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/splashscreen1.png")} 
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>Accept a Job</Text>

      <Pressable
        onPressIn={goNext}
      >
        <Text style={styles.skipButton}>Skip</Text>
      </Pressable>
      <View style={styles.pagination}>
        {[0, 1, 2].map((value, index) => (
          <View
            key={value+index}
            style={[
              styles.dot,
              index === 0 ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      </LinearGradient>
  );
}
