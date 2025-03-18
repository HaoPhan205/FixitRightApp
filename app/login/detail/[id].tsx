import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

type BookingType = {
  Id: number;
  Status: string;
  Address: string;
  WorkingDate: string;
  WorkingTime: string;
  Service: { Name: string };
};

type BookingDetailRouteProp = RouteProp<
  { params: { booking: BookingType } },
  "params"
>;

export default function BookingDetail() {
  const route = useRoute<BookingDetailRouteProp>();
  const navigation = useNavigation();
  const { booking } = route.params;
  const [status, setStatus] = useState<string>(booking.Status);

  const updateBookingStatus = async (newStatus: string) => {
    if (status === newStatus) {
      Alert.alert("Notice", "Booking is already in this status");
      return;
    }

    try {
      await axios.put(
        `https://fixitright.azurewebsites.net/api/bookings/${booking.Id}`,
        { Status: newStatus }
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
