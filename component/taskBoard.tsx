import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {styles} from "@/style/taskBoard"
import { useFocusEffect } from 'expo-router';
import { getServiceByStatus } from '@/api/ServiceApi/ServiceApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './loadingScreen';

export default function TaskBoard({data}:any) {
      const [isLoading,setIsLoading] = useState(false)
    const status = ['Pending', "Accepted","Cancelled","Completed"]
    
    useFocusEffect(useCallback(()=>{
        const getAllServices = async ()=>{
            setIsLoading(true)
            const localdata = await AsyncStorage.getItem("user_profile")
            if(localdata){
                const user:UserProps = JSON.parse(data)
                status.map(async(status)=>{
                    const response = await getServiceByStatus(status,user.Id)
                    console.log("response: ",response)
                })
            }
        }
        getAllServices()
    },[]))
    const statuses = [
        { label: 'PENDING', count: 10, color: '#FFA500' },
        { label: 'ACCEPTED', count: 0, color: '#00FF00' },
        { label: 'COMPLETED', count: 0, color: '#00BFFF' },
        { label: 'CANCELLED', count: 0, color: '#FF4040' },
      ];
      const totalOrders = statuses.reduce((sum, status) => sum + status.count, 0);
      return (
        <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Service Booking Stats</Text>
            <Text style={styles.date}>As of March 15, 2025</Text>
          </View>
    
          {/* Status List */}
          <View style={styles.statusContainer}>
            {statuses.map((status, index) => (
              <View key={index} style={styles.statusItem}>
                <Text style={styles.statusLabel}>{status.label}</Text>
                <Text style={[styles.statusCount, { color: status.color }]}>
                  {status.count}
                </Text>
              </View>
            ))}
          </View>
    
          {/* Custom Total Orders Ring */}
          <View style={styles.ringContainer}>
            <View style={styles.ring}>
              <View style={styles.ringInner}>
                <Text style={styles.ringText}>{totalOrders}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      );
}