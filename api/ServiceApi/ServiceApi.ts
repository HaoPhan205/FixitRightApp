import axios from "axios"
import { getHeaders } from "../token";
const serviceURL = process.env.EXPO_PUBLIC_API_SERVICE_URL
const ratingURL = process.env.EXPO_PUBLIC_API_RATING_URL

export const getServiceByStatus = async(statusQuery:string,accountId:string)=>{
    const headers = await getHeaders()

    try {
      const response = await axios.post(`${serviceURL}/${accountId}?Status=${statusQuery}`,{}, {
        headers: headers
      });
  
      if (response.status === 200) { 
        //console.log("Service Data Fetch Success:", response.data.data);
        return response.data.data.Data; // Accordingly to BE
      } else {
        console.log("Fetch Failed with Status:", response.status);
        return null;
      }
    } catch (error) {
      const err = error as any;
      console.error("Service Error:", err.response ? err.response.data : err.message);
      return null;
    }
  }

  export const getAverageRating = async(accountId:string)=>{
    const headers = await getHeaders()
    try {
      const response = await axios.get(`${ratingURL}/${accountId}/average-rating`, {
        headers: headers
      });
  
      if (response.status === 200) { 
        //console.log("Service Data Fetch Success:", response.data.data);
        return response.data.data; // Accordingly to BE
      } else {
        console.log("Fetch Failed with Status:", response.status);
        return null;
      }
    } catch (error) {
      const err = error as any;
      console.error("Rating Error:", err.response ? err.response.data : err.message);
      return null;
    }
  }