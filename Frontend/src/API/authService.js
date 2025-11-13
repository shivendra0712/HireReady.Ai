import { toast } from "react-toastify";
import axios from "./axiosConfig"

export const registerService = async (data) => {
  try {
    const res = await axios.post('/authuser/register', data);
    toast.success("User Registered Successfully")
    return res;
  }
  catch (error) {
    toast.error(error.response.data.message)
    console.log("Error ----> " , error.response.data.message);
    
  }
};

export const logInService = async (data) => {
  try {
    const res = await axios.post('/authuser/login', data);
    toast.success("User Logged In Successfully")
    // Store token in localStorage
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res;
  }
  catch(error) {
    toast.error(error.response.data.message)
     console.log("Error ----> " , error.response.data.message);
  }
}

export const currentUserService = async () =>{
  try{
    const {data} = await axios.get('/authuser/current-user');

    return data;
  }
  catch(error){
     console.log("Error ----> " , error.response.data.message);
  }
}

export const logOutService = async () => {
  try {
    const res = await axios.post('/authuser/logout');
    toast.success("User Logged Out Successfully")
    // Remove token from localStorage
    localStorage.removeItem('token');
    return res;
  }
  catch(error) {
    toast.error(error.response.data.message)
     console.log("Error ----> " , error.response.data.message);
  }
}

export const updateService = async (data) => {
  try {
    const res = await axios.patch('/authuser/update', data);
    toast.success("User Updated Successfully")
    return res;
  }
  catch(error) {
    toast.error(error.response.data.message)
     console.log("Error ----> " , error.response.data.message);
  }
}
export const updateFeedbackService = async (data) => {
  try {
    const res = await axios.patch('/authuser/update-feedback', data);
    toast.success("Feedback Updated Successfully")
    return res;
  }
  catch(error) {
    toast.error(error.response.data.message)
     console.log("Error ----> " , error.response.data.message);
  }
}

export const deleteService = async (data) => {
  try {
    const res = await axios.delete('/authuser/delete' , {data:data});
    toast.success("User Deleted Successfully")
    return res;
  }
  catch(error) {
    toast.error(error.response.data.message)
     console.log("Error ----> " , error.response.data.message);

  }
}
