import axios from "axios"
import { getHeaders } from "../token";
const serviceURL = process.env.EXPO_PUBLIC_API_SERVICE_URL

export const getServiceByStatus = async(statusQuery:string,accountId:string)=>{
    const headers = await getHeaders()
    console.log("headers: ",headers)
    try {
      const response = await axios.get(`${serviceURL}/${accountId}?Status=${statusQuery}`, {
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