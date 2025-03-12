import React from 'react';
import { View, Text, Pressable,ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Svg, Path } from 'react-native-svg'; 
import {styles} from "@/style/homepage"

export default function HomePage() {
  const chartData = {
  labels: ['12\nMON', '13\nTUE', '14\nWED', '15\nTHU', '16\nFRI', '17\nSAT', '18\nSUN'],
  datasets: [
    {
      data: [1000000, 15000000, 10000000, 5000000, 2000000, 7000000, 16000000],
    },
  ],
};
const chartConfig = {
  backgroundColor: 'transparent',
  backgroundGradientFrom: 'transparent',
  backgroundGradientTo: 'transparent',
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

  return (
    <ScrollView style={styles.container}>
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
  </ScrollView>
  )
}
