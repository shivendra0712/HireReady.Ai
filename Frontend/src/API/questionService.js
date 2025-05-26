import axios from './axiosConfig.js'

export const createQuestionService = async (data)=>{
    try{
        const res = await axios.post('/question/create', data);
        console.log(res);
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

export const viewQuestionByIdService = async ()=>{
    try{
        const res = await axios.get('/question/view/:id');
        console.log(res);
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

export const updateAnswerByIdService = async ()=>{
    try{
        const res = await axios.put('/question/update-answer/:id');
        console.log(res);
    }
    catch(error){
        console.log("Error ----> " , error.response.data.message);
    }
}

