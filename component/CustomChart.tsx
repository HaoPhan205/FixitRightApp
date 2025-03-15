import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Svg, Path } from 'react-native-svg';
import { styles } from "@/style/homepage";

const chartWidth = Dimensions.get('window').width - 50;
const halfWidth = chartWidth / 2;

const generateYLabels = (maxValue) => {
  const intervals = 5; // 0, 5M, 10M, 15M, 20M
  const step = maxValue / (intervals - 1);
  return Array(intervals)
    .fill(0)
    .map((_, i) => Math.round(i * step).toLocaleString() + ' VND');
};

export const BarChartComponent = ({ item }) => {
  const dataValues = item.datasets[0].data;
  const maxValue = Math.max(...dataValues, 20000000); // Ensure max is at least 20M
  const yLabels = generateYLabels(maxValue);
  const barData = dataValues.map((value, index) => ({
    value,
    label: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][index],
    frontColor: '#2C3E50', // Base color for bars
    gradientColor: '#3498DB', // Gradient end color
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
                {label}
              </Text>
            ))}
          </View>
          {/* Bar Chart (50% width) */}
          <View style={{ width: halfWidth, height: 220 }}>
            <BarChart
              data={barData}
              width={halfWidth}
              height={220}
              barWidth={20}
              noOfSections={4} // Adjust for 5 intervals (0 to max)
              maxValue={maxValue}
              yAxisLabelWidth={0} // Disable default y-axis labels
              xAxisLabelTextStyle={{ fontSize: 10, color: 'rgba(44, 62, 80, 1)' }}
              yAxisTextStyle={{ display: 'none' }} // Hide default y-axis text
              showLine={true}
              lineConfig={{
                color: '#dfe4ea',
                thickness: 1,
              }}
              isAnimated={true}
              gradientDirection="vertical"
            />
          </View>
        </View>
      </View>
    </View>
  );
};