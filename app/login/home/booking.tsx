import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

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
    Category: {
      Id: string;
      Name: string;
    };
  };
  Rating: number;
  Status: string;
  Address: string;
  WorkingDate: string;
  WorkingTime: string;
  BookingDate: string;
  Note: string;
};

export default function Booking() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mechanistId, setMechanistId] = useState<string | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<BookingType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const statusList = ["Pending", "Accepted", "Completed", "Cancelled"];

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);

          const tokenData = await AsyncStorage.getItem("access_token");
          if (!tokenData) throw new Error("No token found");

          const AccessToken = JSON.parse(tokenData)?.AccessToken || tokenData;
          setAccessToken(AccessToken);

          const userRes = await axios.get(
            "https://fixitright.azurewebsites.net/api/authentications/current-user",
            {
              headers: { Authorization: `Bearer ${AccessToken}` },
            }
          );

          const userId = userRes.data?.data?.Id;
          setMechanistId(userId);

          const bookingRes = await axios.post(
            `https://fixitright.azurewebsites.net/api/bookings/get-bookings-by-mechanist/${userId}?Status=${selectedStatus}`,
            {},
            {
              headers: { Authorization: `Bearer ${AccessToken}` },
            }
          );

          const bookingData = bookingRes.data?.data?.Data;
          if (!Array.isArray(bookingData)) {
            throw new Error("Invalid booking data format");
          }
          setBookings(bookingData);
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "An unknown error occurred"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [selectedStatus])
  );

  useEffect(() => {
    if (!bookings || !Array.isArray(bookings)) {
      setFilteredBookings([]);
      return;
    }

    const filtered = bookings.filter((item) => item.Status === selectedStatus);
    setFilteredBookings(filtered);
  }, [selectedStatus, bookings]);

  useEffect(() => {
    console.log("Filtered Bookings: ", filteredBookings);
  }, [filteredBookings]);

  return (
    <LinearGradient style={styles.container} colors={["#4A628A", "#DFF2EB"]}>
      <View style={styles.container}>
        <Text style={styles.title}>
          You have {filteredBookings.length}{" "}
          {filteredBookings.length === 1 ? "request" : "requests"}
        </Text>

        {statusList.length > 0 && (
          <View style={styles.statusContainer}>
            {statusList.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  selectedStatus === status && styles.activeStatusButton,
                ]}
                onPress={() => setSelectedStatus(status)}
              >
                <Text
                  style={[
                    styles.statusText,
                    selectedStatus === status && styles.activeStatusText,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : filteredBookings.length > 0 ? (
          <FlatList
            data={filteredBookings}
            keyExtractor={(item) => item.Id}
            renderItem={({ item }) => {
              if (!item || !item.Service) return null;
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    console.log("Booking ID:", item.Id);

                    router.push(`/login/detail/${item.Id}`);
                  }}
                >
                  {item.Service?.Image ? (
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.Service.Image.startsWith("http")
                          ? item.Service.Image
                          : "https://default-image-url.com",
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.imagePlaceholder} />
                  )}

                  <View style={styles.info}>
                    <Text style={styles.serviceName}>
                      {item.Service?.Name || "Unknown Service"}
                    </Text>
                    <Text style={styles.status}>
                      Status: {item.Status || "Unknown"}
                    </Text>

                    <Text>Address: {item.Address || "N/A"}</Text>
                    <Text>Working Date: {item.WorkingDate || "N/A"}</Text>
                    <Text>Time: {item.WorkingTime || "N/A"}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text style={styles.noRequests}>No requests available</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#E9ECEF",
  },
  activeStatusButton: {
    backgroundColor: "#3C4D70",
  },
  statusText: {
    fontSize: 14,
    color: "#6C757D",
  },
  activeStatusText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: "#28A745",
    marginBottom: 4,
  },
  errorText: {
    color: "#DC3545",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  noRequests: {
    textAlign: "center",
    fontSize: 16,
    color: "#6C757D",
    marginTop: 20,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
