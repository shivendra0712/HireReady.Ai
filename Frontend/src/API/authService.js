import axios from "./axiosConfig"

export const registerService = async (data) => {
  try {
    const res = await axios.post('/auth/register', data);
    return res;
  }
  catch (error) {
    console.log("Error ----> " , error.response.data.message);
    
  }
};

export const logInService = async (data) => {
  try {
    const res = await axios.post('/auth/login', data);
    return res;
  }
  catch(error) {
     console.log("Error ----> " , error.response.data.message);
  }
}

export const currentUserService = async () =>{
  try{
    const {data} = await axios.get('/auth/current-user');
    // console.log(data);
    return data;
  }
  catch(error){
     console.log("Error ----> " , error.response.data.message);
  }
}

export const logOutService = async () => {
  try {
    const res = await axios.post('/auth/logout');
    return res;
  }
  catch(error) {
     console.log("Error ----> " , error.response.data.message);
  }
}
