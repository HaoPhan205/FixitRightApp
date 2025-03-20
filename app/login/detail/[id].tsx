import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

type BookingType = {
  Id: string;
  CustomerId: string;
  MechanistId: string;
  ServiceId: string;
  Service: {
    Name: string;
    Image: string;
    Id: string;
    Description: string;
    Price: string;
    Active: boolean;
    Category: { Id: string; Name: string };
  };
  Rating: number;
  Status: string;
  Address: string;
  WorkingDate: string;
  WorkingTime: string;
  BookingDate: string;
  Note: string;
};

export default function BookingDetail() {
  const { id } = useLocalSearchParams() as { id: string };
  const navigation = useNavigation();
  const [booking, setBooking] = useState<BookingType | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!id) {
        Alert.alert("Error", "Invalid booking ID");
        setLoading(false);
        return;
      }

      const tokenData = await AsyncStorage.getItem("access_token");
      if (!tokenData) throw new Error("No token found");

      const AccessToken = JSON.parse(tokenData)?.AccessToken || tokenData;
      setAccessToken(AccessToken);

      try {
        console.log("Fetching booking for ID:", id);
        const response = await axios.get(
          `https://fixitright.azurewebsites.net/api/bookings/${id}`,
          {
            headers: { Authorization: `Bearer ${AccessToken}` },
          }
        );
        console.log("API Response:", response.data);

        if (response.data && response.data.data) {
          setBooking(response.data.data);
          setStatus(response.data.data.Status);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Fetch error:", error);

        if (axios.isAxiosError(error)) {
          Alert.alert(
            "Error",
            error.response?.data?.message || "Failed to fetch booking details"
          );
        } else {
          Alert.alert("Error", "Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const updateBookingStatus = async (newStatus: string) => {
    if (status === newStatus) {
      Alert.alert("Notice", "Booking is already in this status");
      return;
    }

    const tokenData = await AsyncStorage.getItem("access_token");
    if (!tokenData) throw new Error("No token found");

    const AccessToken = JSON.parse(tokenData)?.AccessToken || tokenData;
    setAccessToken(AccessToken);

    try {
      await axios.put(
        `https://fixitright.azurewebsites.net/api/bookings/${id}`,
        { Status: newStatus },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      );
      setStatus(newStatus);
      Alert.alert("Success", `Booking updated to ${newStatus}`);

      if (newStatus === "Completed" || newStatus === "Cancelled") {
        navigation.goBack();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to update booking";
        Alert.alert("Error", message);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    }
  };

  const renderActionButton = () => {
    if (status === "Pending") {
      return (
        <>
          <Button
            title="Accept"
            onPress={() => updateBookingStatus("Accepted")}
          />
          <Button
            title="Cancel"
            onPress={() => updateBookingStatus("Cancelled")}
            color="red"
          />
        </>
      );
    }
    if (status === "Accepted") {
      return (
        <Button
          title="Complete"
          onPress={() => updateBookingStatus("Completed")}
        />
      );
    }
    return null;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Booking not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{booking.Service.Name}</Text>
      <Text style={styles.status}>Status: {status}</Text>
      <Text>Address: {booking.Address}</Text>
      <Text>Working Date: {booking.WorkingDate}</Text>
      <Text>Time: {booking.WorkingTime}</Text>
      {renderActionButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  status: { fontSize: 18, color: "#007BFF", marginBottom: 10 },
});
