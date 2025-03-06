import axios from "axios"
const authenURL = process.env.AUTHENTICATIONS_URL

export const loginAccountMecha= async(value:authenProps)=>{
    const response = await axios.post(`authenURL${"/login"}`,value)
    if(response.status === 200){
        console.log(response.data)
        return response.data
    }
    else{
        console.log("Login Failed")
        throw new Error("Authentication failed")
    }
} 