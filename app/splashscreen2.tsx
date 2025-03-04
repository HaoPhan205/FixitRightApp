import { View, Text, Image, Pressable } from "react-native";
import {styles} from "@/style/splashscreen";
import { useRouter } from "expo-router";

export default function splashscreen2() {
   const navigate = useRouter()
    const goNext = ()=>{
      navigate.push("./splashscreen3")
    }
    return (
      <View style={styles.container}>
  
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/splashscreen2.png")} 
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
                index === 1 ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    );
}