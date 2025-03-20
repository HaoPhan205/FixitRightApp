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
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!id) {
        Alert.alert("Lỗi", "ID đặt lịch không hợp lệ");
        setLoading(false);
        return;
      }

      const tokenData = await AsyncStorage.getItem("access_token");
      if (!tokenData) throw new Error("Không tìm thấy token");

      const AccessToken = JSON.parse(tokenData)?.AccessToken || tokenData;
      setAccessToken(AccessToken);

      try {
        console.log("Đang lấy dữ liệu đặt lịch cho ID:", id);
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
          throw new Error("Cấu trúc phản hồi API không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        Alert.alert("Lỗi", "Không thể lấy thông tin đặt lịch");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const updateBookingStatus = async (newStatus: string) => {
    if (status === newStatus) {
      Alert.alert("Thông báo", "Trạng thái đã được cập nhật trước đó");
      return;
    }

    const tokenData = await AsyncStorage.getItem("access_token");
    if (!tokenData) throw new Error("Không tìm thấy token");

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
      Alert.alert(
        "Thành công",
        `Trạng thái đã được cập nhật thành ${newStatus}`
      );

      if (newStatus === "Completed" || newStatus === "Cancelled") {
        router.back();
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái đặt lịch");
    }
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
        <Text style={styles.title}>Không tìm thấy thông tin đặt lịch</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: booking.Service.Image }}
        style={styles.image}
        resizeMode="cover"
      />
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

      <View style={styles.buttonContainer}>
        {status === "Pending" && (
          <>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => updateBookingStatus("Accepted")}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => updateBookingStatus("Cancelled")}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
        {status === "Accepted" && (
          <TouchableOpacity
            style={[styles.button, styles.completeButton]}
            onPress={() => updateBookingStatus("Completed")}
          >
            <Text style={styles.buttonText}>Completed</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  category: { fontSize: 16, color: "#888", marginBottom: 5 },
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
    color: "#007BFF",
    fontWeight: "bold",
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  acceptButton: { backgroundColor: "#28a745" },
  cancelButton: { backgroundColor: "#dc3545" },
  completeButton: { backgroundColor: "#007bff" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
