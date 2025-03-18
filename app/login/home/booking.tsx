import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";

type BookingType = {
  Id: number;
  Status: string;
  Address: string;
  WorkingDate: string;
  WorkingTime: string;
  Service: {
    Name: string;
    Image: string;
  };
};

export default function Booking() {
  const [bookings, setBookings] = useState<BookingType[]>([]);

  const [loading, setLoading] = useState(true);
  const [mechanistId, setMechanistId] = useState(null);
  const [filteredBookings, setFilteredBookings] = useState<BookingType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigation = useNavigation();
  const statusList = ["All", "Pending", "Completed", "Cancelled"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy token một lần duy nhất
        const tokenData = await AsyncStorage.getItem("access_token");
        if (!tokenData) throw new Error("No token found");

        const { AccessToken } = JSON.parse(tokenData);
        setAccessToken(AccessToken);

        const userRes = await axios.get(
          "https://fixitright.azurewebsites.net/api/authentications/current-user",
          {
            headers: { Authorization: `Bearer ${AccessToken}` },
          }
        );

        const userId = userRes.data.data.Id;
        setMechanistId(userId);

        const bookingRes = await axios.post(
          `https://fixitright.azurewebsites.net/api/bookings/get-bookings-by-mechanist/${userId}`,
          { mechanistId: userId },
          {
            headers: { Authorization: `Bearer ${AccessToken}` },
          }
        );

        setBookings(bookingRes.data.data);
        setFilteredBookings(bookingRes.data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((item) => item.Status === selectedStatus)
      );
    }
  }, [selectedStatus, bookings]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        You have {filteredBookings.length}{" "}
        {filteredBookings.length === 1 ? "request" : "requests"}
      </Text>

      {filteredBookings.length > 0 && (
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
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/login/detail/${item.Id}`)}
            >
              <FastImage
                style={styles.image}
                source={{ uri: item.Service.Image }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.info}>
                <Text style={styles.serviceName}>{item.Service.Name}</Text>
                <Text style={styles.status}>Status: {item.Status}</Text>
                <Text>Address: {item.Address}</Text>
                <Text>Working Date: {item.WorkingDate}</Text>
                <Text>Time: {item.WorkingTime}</Text>
              </View>
            </TouchableOpacity>
          )}
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
});
