import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { styles } from "@/style/homepage";
import { LinearGradient } from "expo-linear-gradient";
import TaskBoard from "@/component/taskBoard";
import { useFocusEffect, useRouter } from "expo-router";
import {
  getAverageRating,
  getServiceByStatus,
} from "@/api/ServiceApi/ServiceApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "@/component/loadingScreen";
import { Ionicons } from "@expo/vector-icons"; // Import Expo Vector Icons
import RatingBoard from "@/component/ratingboard";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const statusList = ["Pending", "Accepted", "Cancelled", "Completed"];
  const [averageRating, setAverageRating] = useState(0);
  const [categorizedServices, setCategorizedServices] = useState({
    Pending: [],
    Accepted: [],
    Completed: [],
    Cancelled: [],
  });
  const nav = useRouter();

  const gotoWork = () => {
    nav.navigate("./booking");
  };

  const customerChat = () => {
    Alert.alert("Coming Soon", "This feature is coming soon. Stay tuned!");
  };

  const profile = () => {
    nav.navigate("./profile");
  };

  useFocusEffect(
    useCallback(() => {
      const getAllServices = async () => {
        setIsLoading(true);
        try {
          const localData = await AsyncStorage.getItem("user_profile");
          if (localData) {
            const user = JSON.parse(localData);
            const responses = await Promise.all(
              statusList.map(async (status) => {
                const response = await getServiceByStatus(status, user.Id);
                return { status, data: response || [] };
              })
            );
            const categorized = responses.reduce(
              (acc, { status, data }) => {
                acc[status] = data;
                return acc;
              },
              { Pending: [], Accepted: [], Completed: [], Cancelled: [] }
            );

            setCategorizedServices(categorized);
          }
        } catch (error) {
          console.error("Error fetching services:", error);
        } finally {
          setIsLoading(false);
        }
      };
      const getRating = async () => {
        try {
          const localData = await AsyncStorage.getItem("user_profile");
          if (localData) {
            const user = JSON.parse(localData);
            const data = await getAverageRating(user.Id);
            console.log("Average Rating:", data);
            setAverageRating(data);
          }
        } catch (error) {
          console.error("Error fetching average rating:", error);
        }
      };
      getRating();
      getAllServices();
    }, [])
  );

  const chartData = {
    labels: ["12", "13", "14", "15", "16", "17", "18"],
    datasets: [
      {
        data: [90000, 150000, 200000, 50000, 20000, 100000, 160000],
      },
    ],
  };

  function NavButtons() {
    return (
      <View style={styles.buttonContainer}>
        {/* Work Button */}
        <Pressable
          style={({ pressed }) => [
            styles.navbutton,
            pressed && styles.buttonPressed,
          ]}
          onPress={gotoWork}
        >
          <Ionicons name="briefcase-outline" size={24} color="#FFF" />
          <Text style={styles.navbuttonText}>Work</Text>
        </Pressable>

        {/* Chat Button */}
        <Pressable
          style={({ pressed }) => [
            styles.navbutton,
            pressed && styles.buttonPressed,
          ]}
          onPress={customerChat}
        >
          <Ionicons name="chatbubbles-outline" size={24} color="#FFF" />
          <Text style={styles.navbuttonText}>Chat</Text>
        </Pressable>

        {/* Profile Button */}
        <Pressable
          style={({ pressed }) => [
            styles.navbutton,
            pressed && styles.buttonPressed,
          ]}
          onPress={profile}
        >
          <Ionicons name="person-outline" size={24} color="#FFF" />
          <Text style={styles.navbuttonText}>Profile</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      <ScrollView>
        <LinearGradient
          style={styles.container}
          colors={["#4A628A", "#DFF2EB"]}
        >
          <NavButtons />
          <TaskBoard data={categorizedServices} />
          <RatingBoard
            data={categorizedServices}
            averageRating={averageRating}
          />
        </LinearGradient>
      </ScrollView>
    </>
  );
}
