import AsyncStorage from "@react-native-async-storage/async-storage";

// Define authentication data type (optional)

export const getToken = async ()=> {
  try {
    const data = await AsyncStorage.getItem("access_token");
    if(data){
      const token:AuthenData = JSON.parse(data);
      //console.log("Fetch Token:", token);
      return token; 
    }
    return null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const getHeaders = async () => {
  try {
    const token:AuthenData|null = await getToken();
    //console.log("Get Token:", token); 
    if (!token) {
      console.warn("No token found in storage");
      return { "Content-Type": "application/json" };
    }

    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.AccessToken}`,
    };
  } catch (error) {
    console.error("Error retrieving headers:", error);
    return { "Content-Type": "application/json" };
  }
};
