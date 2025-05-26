import axios from './axiosConfig.js'

export const createInterviewService = async (data)=>{
    try{
        const res = await axios.post('/interview/create', data);
        return res;
    }
    catch(error){
       console.log("Error ----> " , error.response.data.message);
    }
}

export const viewAllInterviewService = async ()=>{
    try{
        const res = await axios.get('/interview/view-all');
        console.log(res);
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

export const viewInterviewByIdService = async ()=>{
    try{
        const res = await axios.get('/interview/view/:id');
        console.log(res);
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

export const startInterviewByIdService = async ()=>{
    try{
        const res = await axios.put('/interview/start/:id');
        console.log(res);
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

export const endInterviewByIdService = async ()=>{
    try{
        const res = await axios.put('/interview/end/:id');
        console.log(res);
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}