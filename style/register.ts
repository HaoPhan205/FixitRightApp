import { StyleSheet, Dimensions } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BDCFC5", 
    paddingHorizontal: 20,
  },
  backButton: {
    zIndex: 1000,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D1D8E0",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 45,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 10,
    color: "black",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
    color: "black",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "black",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#E6F0E6",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#E6F0E6",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4A628A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default styles;
