import { View, Text, Image, Pressable } from "react-native";
import {styles} from "@/style/splashscreen";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function splashscreen3() {
    const navigate = useRouter()
    const goNext = ()=>{
      navigate.push("./locationscreen")
    }
    return (
        <LinearGradient
                         style={styles.container}
                         colors={['#DFF2EB', '#4A628A']} >
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/splashscreen3.png")} 
            style={styles.image}
          />
        </View>
  
        <Text style={styles.title}>Earn Money</Text>
  
        <Pressable
        style={styles.button}
          onPressIn={goNext}
        >
          <Text style={styles.buttonText}>START NOW!</Text>
        </Pressable>
        <View style={styles.pagination}>
          {[0, 1, 2].map((value, index) => (
            <View
              key={value+index}
              style={[
                styles.dot,
                index === 2 ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </LinearGradient>
    );
}