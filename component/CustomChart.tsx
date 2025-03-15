import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Svg, Path, LinearGradient, Stop, Defs } from 'react-native-svg';
import { styles } from "@/style/homepage";

const chartWidth = Dimensions.get('window').width - 50;
const halfWidth = chartWidth / 2;

const generateYLabels = (maxValue) => {
  const intervals = 5; // 0, 5M, 10M, 15M, 20M
  const step = maxValue / (intervals - 1);
  return Array(intervals)
    .fill(0)
    .map((_, i) => Math.round(i * step).toLocaleString());
};

export const BarChartComponent = ({ item }) => {
  const dataValues = item.datasets[0].data;
  const maxValue = Math.max(...dataValues, 20000000); // Ensure max is at least 20M
  const yLabels = generateYLabels(maxValue);
  const barData = dataValues.map((value, index) => ({
    value,
    svg: {
      fill: `url(#gradient-${index})`,
    },
    label: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][index],
  }));

  return (
    <View style={styles.elementContainer}>
      <Text style={styles.title}>Earnings by day</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>View by Day</Text>
        <Svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          color={styles.icon?.color || '#3e5090'}
        >
          <Path d="M19 9l-7 7-7-7" />
        </Svg>
      </Pressable>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>12 Sep 2025 - 18 Sep 2025</Text>
        <Svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          color={styles.icon?.color || '#3e5090'}
        >
          <Path d="M19 9l-7 7-7-7" />
        </Svg>
      </Pressable>

      <View style={styles.chartContainer}>
        <View style={{ flexDirection: 'row', width: chartWidth, height: 220 }}>
          {/* Custom Y-Axis (50% width) */}
          <View style={{ width: halfWidth, justifyContent: 'space-between', paddingVertical: 10 }}>
            {yLabels.map((label, index) => (
              <Text
                key={index}
                style={{ fontSize: 10, color: 'rgba(44, 62, 80, 1)', textAlign: 'right', paddingRight: 10 }}
              >
                {label + ' VND'}
              </Text>
            ))}
          </View>
          {/* Bar Chart (50% width) */}
          <View style={{ width: halfWidth, height: 220 }}>
            <Svg width={halfWidth} height={220}>
              <Defs>
                {barData.map((_, index) => (
                  <LinearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="rgba(44, 62, 80, 0.9)" />
                    <Stop offset="100%" stopColor="rgba(52, 152, 219, 0.7)" />
                  </LinearGradient>
                ))}
              </Defs>
              <BarChart
                style={{ flex: 1 }}
                data={barData}
                svg={{ fill: 'url(#gradient-0)' }} // Default gradient
                contentInset={{ top: 10, bottom: 10 }}
                gridMin={0}
                gridMax={maxValue}
                yAccessor={({ item }) => item.value}
                spacing={0.2}
                gridProps={{
                  stroke: '#dfe4ea',
                  strokeWidth: 1,
                }}
              >
                <Grid />
              </BarChart>
            </Svg>
          </View>
        </View>
      </View>
    </View>
  );
};