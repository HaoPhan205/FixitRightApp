import React from 'react';
import { View, Text} from 'react-native';
import {styles} from '@/style/ratingboard'

interface RatingBoardProps {
    data:any,
    averageRating: number,
}
const RatingBoard = ({ data, averageRating }: RatingBoardProps) => {
  // Calculate the total number of ratings from completed bookings
  const totalRatings = data.Completed?.reduce((totalReviews:number, booking:any) => {
    return totalReviews + (booking.Rating ? 1 : 0);
  }, 0) || 0;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.sectionTitle}>Total Ratings</Text>
        <Text style={styles.sectionValue}>{totalRatings}</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.circle}>
          <Text style={styles.averageRating}>{averageRating?.toFixed(1) || '0.0'}</Text>
          <Text style={styles.ratingLabel}>Avg Rating</Text>
        </View>
      </View>
    </View>
  );
};



export default RatingBoard;