import { StyleSheet, Dimensions  } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#2A2A2A',
      borderRadius: 10,
      margin: 10,
      padding: 10,
      elevation: 3, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    leftSection: {
      flex: 1, // 50% of the width
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    rightSection: {
      flex: 1, // 50% of the width
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    sectionTitle: {
      fontSize: 16,
      color: '#66B0FF',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    sectionValue: {
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
    },
    circle: {
      width: Dimensions.get('window').width * 0.3, // Circular shape
      height: Dimensions.get('window').width * 0.3,
      borderRadius: (Dimensions.get('window').width * 0.3) / 2,
      backgroundColor: '#444',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: '#FFD700', // Gold border for emphasis
    },
    averageRating: {
      fontSize: 28,
      color: '#FFD700', // Gold color to match the border
      fontWeight: 'bold',
    },
    ratingLabel: {
      fontSize: 14,
      color: '#BBB',
      marginTop: 5,
    },
  });