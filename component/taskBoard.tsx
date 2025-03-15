import React from 'react';
import { View, Text, } from 'react-native';
import {styles} from "@/style/taskBoard";

const TaskBoard = ({ data }:any) => {
  // Calculate counts for each status from the categorized data
  const statusCounts = [
    { label: 'PENDING', count: data.Pending.length, color: '#FFA500' },
    { label: 'ACCEPTED', count: data.Accepted.length, color: '#00FF00' },
    { label: 'COMPLETED', count: data.Completed.length, color: '#00BFFF' },
    { label: 'CANCELLED', count: data.Cancelled.length, color: '#FF4040' },
  ];
  const currentDate = new Date().toLocaleDateString('VN-vn', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate total orders
  const totalOrders = statusCounts.reduce((sum, status) => sum + status.count, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Service Booking Stats</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      <View style={styles.statusContainer}>
        {statusCounts.map((status, index) => (
          <View key={index} style={styles.statusItem}>
            <Text style={styles.statusLabel}>{status.label}</Text>
            <Text style={[styles.statusCount, { color: status.color }]}>
              {status.count}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.ringContainer}>
        <View style={styles.ring}>
          <View style={styles.ringInner}>
            <Text style={styles.ringText}>{totalOrders}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};


export default TaskBoard;