import axios from "axios"
import { getHeaders } from "../token";
const authenURL = process.env.EXPO_PUBLIC_API_AUTHENTICATIONS_URL

export const registerMechaAccount = async (value:UserRequestProps)=>{
  const headers = await getHeaders()
  try {
    //console.log("Sending Login Request:", authenURL);
    const response = await axios.post(`${authenURL}/mechanists`, value, {
      headers: headers
    });

    if (response.status === 200 || response.status === 201) {
      console.log("Register Data:", response);
      return true;
    } else {
      console.log("Register Failed with Status:", response.status);
      return null //response.data.Errors.Description; // Accodring to BE response really?
    }
  } catch (error) {
    const err = error as any;
    console.error("Register Error:", err.response ? err.response.data : err);
    return null;
  }
}

export const loginAccountMecha = async (value: AuthenProps) => {
  //console.log("Login Value:", value);
  const headers = await getHeaders()
    try {
      //console.log("Sending Login Request:", authenURL);
      const response = await axios.post(`${authenURL}/login`, value, {
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

  export const decodeAuthen = async()=>{
    const headers = await getHeaders()
    console.log("headers: ",headers)
    try {
      const response = await axios.get(`${authenURL}/current-user`, {
        headers: headers
      });
  
      if (response.status === 200) {
        //console.log("User Data Fetch Success:", response.data);
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
  }