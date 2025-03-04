import { View, Text, Image, Pressable } from "react-native";
import {styles} from "@/style/splashscreen";
import { useRouter } from "expo-router";

export default function locationscreen() {
  const navigate = useRouter()
      const goNext = ()=>{
        navigate.replace("./login")
      }
      const getLocation = () => {
        alert("Location Tracked!");
        goNext()
      }
      return (
        <View style={styles.container}>
    
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/splashscreen4.png")} 
              style={styles.image}
            />
          </View>
        
          <Text style={styles.title}>Enable Current Location</Text>
          <Pressable
            onPressIn={getLocation}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Use My Location</Text>
          </Pressable>
    
          <Pressable
            onPressIn={goNext}
          >
            <Text style={styles.skipButton}>Skip For Now</Text>
          </Pressable>
        </View>
      );
}