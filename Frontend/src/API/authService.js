import axios from "./axiosConfig"

export const signUpService = async (data) => {
  try {
    const res = await axios.post('/auth/register', data);
    return res;
  }
  catch (error) {
    console.log(error);
  }
};

export const logInService = async (data) => {
  try {
    const res = await axios.post('/auth/login', data);
    return res;
  }
  catch(error) {
    console.log(error);
  }
}

export const currentUserServices = async () =>{
  try{
    const {data} = await axios.get('/auth/current-user');
    console.log(data);
  }
  catch(error){
    console.log('error-> ')
  }
}

// export const logOutService = async () => {
//   try {
//     const res = await axios.post('/auth/logout');
//     return res;
//   }
//   catch(error) {
//     console.log(error);
//   }
// }
