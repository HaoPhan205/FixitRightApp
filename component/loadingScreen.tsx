import { View, Text } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'

export default function LoadingScreen() {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0, left: 0,
        right: 0, bottom: 0,
        zIndex: 1000,
        width: '100%', height: '100%',
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        opacity:0.8
      }}
      >
      <Image
      style={{ width: '100%', height: '100%', resizeMode: 'cover' }} 
            source={require('@/assets/images/loading.gif')}
      />
    </View>
  )
}