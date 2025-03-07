import { View, Text, Pressable } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function profile() {
    const nav = useRouter()
    const logout = async()=>{
        await AsyncStorage.removeItem("user_profile")
        nav.dismissAll()
    }
  return (
    <View>
        <Pressable
            onPress={()=>{logout()}}
        >
            <Text>Log Out</Text>
        </Pressable>
    </View>
  )
}