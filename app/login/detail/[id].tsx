import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

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
  const router = useRouter();
  const [booking, setBooking] = useState<BookingType | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!id) {
        Alert.alert("Error", "Invalid booking ID");
        setLoading(false);
        return;
      }

      const tokenData = await AsyncStorage.getItem("access_token");
      if (!tokenData) throw new Error("Token not found");

      const AccessToken = JSON.parse(tokenData)?.AccessToken || tokenData;
      setAccessToken(AccessToken);

      try {
        const response = await axios.get(
          `https://fixitright.azurewebsites.net/api/bookings/${id}`,
          {
            headers: { Authorization: `Bearer ${AccessToken}` },
          }
        );

        if (response.data && response.data.data) {
          setBooking(response.data.data);
          setStatus(response.data.data.Status);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve booking information");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
    setConfirmModal(true);
  };

  const confirmStatusChange = async () => {
    setConfirmModal(false);

    if (status === selectedStatus) {
      Alert.alert("Notification", "The order has already been updated.");
      return;
    }

    const tokenData = await AsyncStorage.getItem("access_token");
    if (!tokenData) throw new Error("Token not found");

    const AccessToken = JSON.parse(tokenData)?.AccessToken || tokenData;
    setAccessToken(AccessToken);

    try {
      await axios.put(
        `https://fixitright.azurewebsites.net/api/bookings/${id}`,
        { Status: selectedStatus },
        {
          headers: { Authorization: `Bearer ${AccessToken}` },
        }
      );
      setStatus(selectedStatus);
      Alert.alert("Success", `Order has been updated to ${selectedStatus}`);

      if (selectedStatus === "Completed" || selectedStatus === "Cancelled") {
        router.back();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update booking status");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>Booking information not found</Text>
      </View>
    );
  }

  return (
    <LinearGradient style={styles.container} colors={["#4A628A", "#DFF2EB"]}>
      <Image
        source={{ uri: booking.Service.Image }}
        style={styles.image}
        resizeMode="cover"
      />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.whiteBackground}>
          <Text style={styles.title}>{booking.Service.Name}</Text>
          <Text style={styles.category}>
            Category: {booking.Service.Category.Name}
          </Text>
          <Text style={styles.price}>Price: {booking.Service.Price} VND</Text>
          <Text style={styles.description}>{booking.Service.Description}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{booking.Address}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Working Date:</Text>
            <Text style={styles.value}>{booking.WorkingDate}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Working Time:</Text>
            <Text style={styles.value}>{booking.WorkingTime}</Text>
          </View>

          <Text style={styles.status}>Status: {status}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {status === "Pending" && (
            <>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleStatusChange("Accepted")}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => handleStatusChange("Cancelled")}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          {status === "Accepted" && (
            <TouchableOpacity
              style={[styles.button, styles.completeButton]}
              onPress={() => handleStatusChange("Completed")}
            >
              <Text style={styles.buttonText}>Complete</Text>
            </TouchableOpacity>
          )}
        </View>

        <Modal visible={confirmModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Are you sure you want to update status to "{selectedStatus}
                "?
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.acceptButton]}
                  onPress={confirmStatusChange}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setConfirmModal(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 250 },
  title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 10 },
  category: { fontSize: 16, color: "#666", marginBottom: 5 },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 10,
  },
  description: { fontSize: 16, marginBottom: 20 },
  infoContainer: { flexDirection: "row", marginBottom: 10 },
  label: { fontWeight: "bold", fontSize: 16, marginRight: 5 },
  value: { fontSize: 16 },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  acceptButton: { backgroundColor: "#3C4D70" },
  cancelButton: { backgroundColor: "#dc3545" },
  completeButton: { backgroundColor: "#3C4D70" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    maxHeight: "80%",
  },
  modalText: { fontSize: 16, marginBottom: 20 },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  whiteBackground: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
