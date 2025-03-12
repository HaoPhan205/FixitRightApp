import axios from "axios"
import { getHeaders } from "../token";
const userURL = process.env.EXPO_PUBLIC_API_USER_URL

export const getMechaAccount = async (value:string)=>{
  const headers = await getHeaders()
  try {
    //console.log("Sending Login Request:", authenURL);
    const response = await axios.get(`${userURL}/${value}`, {
      headers: headers
    });

    if (response.status === 200 || response.status === 201) {
     // console.log("User Data:", response);
      return response.data.data;
    } else {
      console.log("Get User Failed with Status:", response.status);
      return null //response.data.Errors.Description; // Accodring to BE response really?
    }
  } catch (error) {
    const err = error as any;
    console.error("Fetch User Error:", err.response ? err.response.data : err);
    return null;
  }
}

export const updateAccountMecha = async (value: AuthenProps) => {
  //console.log("Login Value:", value);
  const headers = await getHeaders()
    try {
      //console.log("Sending Login Request:", authenURL);
      const response = await axios.post(`${userURL}/login`, value, {
        headers: headers
      });
  
      if (response.status === 200) {
        console.log("Login Data:", response.data.data);
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
