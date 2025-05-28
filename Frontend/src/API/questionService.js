import axios from './axiosConfig.js'

export const createQuestionService = async (data)=>{
    try{
        const res = await axios.post('/question/create', data);
         return res;
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

export const viewQuestionByIdService = async (id)=>{
    try{
        const res = await axios.get(`/question/view/${id}`);
         return res;
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

export const updateAnswerByIdService = async (id)=>{
    try{
        const res = await axios.put(`/question/update-answer/${id}`);
         return res;
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

