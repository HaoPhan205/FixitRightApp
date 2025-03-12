

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {styles} from "@/style/profile"
import { LinearGradient } from 'expo-linear-gradient';
import LoadingScreen from '@/component/loadingScreen';
import { getMechaAccount } from '@/api/user/user';


export default function profile() {
  const [isLoading,setIsLoading] = useState(false)
  const [user, setUser] = useState<UserProps>()
    const nav = useRouter()
    const logout = async()=>{
        await AsyncStorage.removeItem("user_profile")
        nav.dismissAll()
    }

    useFocusEffect(useCallback(()=>{
      const prevUser = async()=>{
        setIsLoading(true)
        const data = await AsyncStorage.getItem("user_profile")
        if(data){
          const user:UserProps = JSON.parse(data)
          //console.log(user)
          const userExist = await getMechaAccount(user.Id)
          if(userExist!=null){
              setUser(userExist)
            }
            else{
              failedFetchData()
            }
        }
        else{
          failedFetchData()
        }
        setIsLoading(false)
      }
      prevUser()
    },[]))

    const failedFetchData = ()=>{
      Alert.alert("User Data Fetching Failed!","Please Try Login Again")
      nav.replace("../login")
    }

  return (
    <>
    {isLoading??<LoadingScreen/>}
    <View style={styles.container}>
         <LinearGradient
        colors={['#DFF2EB', '#4A628A']} // Light Blue gradient
        style={styles.gradientBackground}
      >
    <View style={styles.profileSection}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>
          <Image source={{uri:user?.Avatar}} style={styles.profileImage} />
          <Pressable style={styles.editIcon}>
            <Ionicons name="pencil" size={16} color="black" />
          </Pressable>
        </View>
      </View>
      <Text style={styles.profileName}>{user?.Fullname}</Text>
    </View>


    <ScrollView style={styles.optionsContainer}>
      <Pressable style={styles.optionItem}>
        <View style={styles.optionContent}>
          <Ionicons name="person-outline" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Your profile</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </Pressable>

      <Pressable style={styles.optionItem}>
        <View style={styles.optionContent}>
          <Ionicons name="location-outline" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Manage Address</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </Pressable>

      <Pressable style={styles.optionItem}>
        <View style={styles.optionContent}>
          <Ionicons name="calendar-outline" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>My Bookings</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </Pressable>

      <Pressable style={styles.optionItem}>
        <View style={styles.optionContent}>
          <Ionicons name="wallet-outline" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>My Wallet</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </Pressable>

      <Pressable style={styles.optionItem}>
        <View style={styles.optionContent}>
          <Ionicons name="settings-outline" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Settings</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </Pressable>

      <Pressable style={styles.optionItem}>
        <View style={styles.optionContent}>
          <Ionicons name="help-circle-outline" size={24} color="black" style={styles.optionIcon} />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </Pressable>

      <Pressable onPress={()=>{logout()}} style={styles.optionItem}>
        <View style={styles.optionDeleteContent}>
          <Ionicons name="log-out" size={24} color="black" style={styles.optionDeleteIcon} />
          <Text style={styles.optionDeleteText}>Log Out</Text>
        </View>
      </Pressable>
    </ScrollView>
    </LinearGradient>
  </View>
  </>
  )
}