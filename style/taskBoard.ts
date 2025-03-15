import { StyleSheet ,Dimensions} from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2A2A2A',
      padding: 10,
    },
    header: {
      marginBottom: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#66B0FF',
      textAlign: 'center',
    },
    date: {
      fontSize: 14,
      color: '#BBB',
      textAlign: 'center',
      marginBottom: 10,
    },
    statusContainer: {
      marginBottom: 20,
    },
    statusItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#444',
    },
    statusLabel: {
      fontSize: 16,
      color: 'white',
    },
    statusCount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    ringContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    ring: {
      width: Dimensions.get('window').width * 0.4, // Responsive size (40% of screen width)
      height: Dimensions.get('window').width * 0.4,
      borderRadius: (Dimensions.get('window').width * 0.4) / 2,
      borderWidth: 8,
      borderColor: '#1E90FF', // Static color (you can use a gradient with additional styling if needed)
      backgroundColor: '#2A2A2A',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ringInner: {
      width: '80%',
      height: '80%',
      borderRadius: (Dimensions.get('window').width * 0.4 * 0.8) / 2,
      backgroundColor: '#2A2A2A',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ringText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
  });