import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: "10%",
  },
  elementContainer: {
    flex: 1,
    backgroundColor: "lightblue", // dark blue background
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3e5090", // Dark blue
  },
  button: {
    backgroundColor: "#3e5090", // Dark blue
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  chartContainer: {
    marginTop: 20,
  },
  chart: {
    borderRadius: 16,
  },
  icon: {
    color: "white",
  },
  buttonContainer: {
    backgroundColor: "#DFF2EB",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 3, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  navbutton: {
    backgroundColor: "#4A628A", // Match the darker color of the gradient for contrast
    flexDirection: "row", // Align icon and text in a row
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    gap: 8, // Space between icon and text
  },
  buttonPressed: {
    backgroundColor: "#3A4F73", // Slightly darker shade when pressed
    opacity: 0.8,
  },
  navbuttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
