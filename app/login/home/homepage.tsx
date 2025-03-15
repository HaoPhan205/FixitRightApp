import React from 'react';
import {ScrollView } from 'react-native';
import {styles} from "@/style/homepage"
import { LinearGradient } from 'expo-linear-gradient';
import { BarChartComponent } from '@/component/CustomChart';

export default function HomePage() {
  const chartData = {
  labels: ['12', '13', '14', '15', '16', '17', '18'],
  datasets: [
    {
      data: [90000, 150000, 200000, 50000, 20000, 100000, 160000],
    },
  ],
};
  return (
    <LinearGradient
    style={styles.container}
    colors={[ '#4A628A','#DFF2EB']} >
    <ScrollView>
     

  </ScrollView>
  </LinearGradient>
  )
}
