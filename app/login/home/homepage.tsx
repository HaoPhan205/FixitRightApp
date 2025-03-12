import React from 'react';
import { View, Text, Pressable,ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Svg, Path } from 'react-native-svg'; 
import {styles} from "@/style/homepage"
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
  const chartData = {
  labels: ['12', '13', '14', '15', '16', '17', '18'],
  datasets: [
    {
      data: [90000, 150000, 200000, 50000, 20000, 100000, 160000],
    },
  ],
};
const chartConfig = {
  backgroundColor: 'white',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(62, 80, 144, ${opacity})`, // Match bar color
  labelColor: (opacity = 1) => `rgba(62, 80, 144, ${opacity})`, // Match label color
  barPercentage: 0.6, // Adjust bar width
  height: 220,
  width: Dimensions.get('window').width - 40,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#dfe4ea',
  },
  formatYLabel: (yLabel:any) => {
    if (yLabel >= 1000000) {
      return `${yLabel / 1000000}M VND`;
    } else if (yLabel >= 1000) {
      return `${yLabel / 1000}K VND`;
    }
    return `${yLabel} VND`;
  },
};

const BarChartComponent = (item:any)=>{
  return(
    <View style={styles.elementContainer}>
    <Text style={styles.title}>Earnings by day</Text>
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>View by Day</Text>
      <Svg // Using react-native-svg for the icon
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        color={styles.icon.color}
      >
        <Path d="M19 9l-7 7-7-7" />
      </Svg>
    </Pressable>

    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>12 Sep 2025 - 18 Sep 2025</Text>
      <Svg // Using react-native-svg for the icon
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        color={styles.icon.color}
      >
        <Path d="M19 9l-7 7-7-7" />
      </Svg>
    </Pressable>

    <View style={styles.chartContainer}>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 40} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </View>
    </View>
  )
}

  return (
    <LinearGradient
    style={styles.container}
    colors={[ '#4A628A','#DFF2EB']} >
    <ScrollView>
      <BarChartComponent/>

  </ScrollView>
  </LinearGradient>
  )
}
