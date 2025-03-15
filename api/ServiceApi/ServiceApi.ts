import axios from "axios"
import { getHeaders } from "../token";
const serviceURL = process.env.EXPO_PUBLIC_API_SERVICE_URL

export const getServiceByStatus = async(statusQuery:string,accountId:string)=>{
    const headers = await getHeaders()
    // console.log("statusQuery:",statusQuery)
    // console.log("accountId:",accountId)
    // console.log(`${serviceURL}/${accountId}?Status=${statusQuery}`)
    //console.log(headers)
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