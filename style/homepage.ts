import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff', // Light blue background
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#3e5090', // Dark blue
    },
    button: {
      backgroundColor: '#3e5090', // Dark blue
      borderRadius: 20,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    chartContainer: {
      marginTop: 20,
    },
    chart: {
      borderRadius: 16,
    },
    icon: {
      color: 'white'
    }

})