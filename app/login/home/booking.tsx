import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

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
  const statusList = ["Pending", "Completed", "Accepted", "Cancelled"];

  useEffect(() => {
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
  }, [selectedStatus]);

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  activeStatusButton: {
    backgroundColor: "#007BFF",
  },
  statusText: {
    fontSize: 14,
    color: "#333",
  },
  activeStatusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#007BFF",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  noRequests: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
