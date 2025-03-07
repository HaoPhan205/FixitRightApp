import axios from "axios"
const authenURL = process.env.EXPO_PUBLIC_API_AUTHENTICATIONS_URL

export const loginAccountMecha = async (value: authenProps) => {
    try {
      console.log("Sending Login Request:", authenURL);
  
      const response = await axios.post(`${authenURL}/login`, value, {
        headers: {
          "Content-Type": "application/json",  
        },
      });
  
      console.log("Response:", response.data);
  
      if (response.status === 200) {
        console.log("Login Success:", response.data);
        return response.data.data;
      } else {
        console.log("Login Failed with Status:", response.status);
        return null;
      }
    } catch (error) {
      const err = error as any;
      console.error("Login Error:", err.response ? err.response.data : err);
      return null;
    }
  };