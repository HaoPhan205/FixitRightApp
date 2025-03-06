import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#647E93",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D1D8E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "black",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
    color: "black",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    color: "black",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#E6F0E6",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 5,
    color: "black",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  forgotPassword: {
    textAlign: "right",
    color: "black",
    fontSize: 14,
    marginTop: 5,
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4A628A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  signInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  orText: {
    marginHorizontal: 10,
    color: "black",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "#EAEAEA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  signUpText: {
    textAlign: "center",
    color: "black",
    fontSize: 14,
  },
  signUpLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default styles;
