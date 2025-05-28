import axios from './axiosConfig.js'

export const createInterviewService = async (data) => {
    try {
        const res = await axios.post('/interview/create', data);
        return res;
    }
    catch (error) {
        console.log("Error ----> ", error.response.data.message);
    }
}

export const viewAllInterviewService = async () => {
    try {
        const res = await axios.get('/interview/view-all');
         return res;
    }
    catch (error) {
        console.log("Error ----> ", error.response.data.message);
    }
}

export const viewInterviewByIdService = async (id) => {
    try {
        console.log('interview is in service ----->',id)
        const res = await axios.get(`/interview/view/${id}`);
        // console.log("response of interview ",res.data.data);
        return res;
    }
    catch (error) {
        console.log("Error ----> ", error.response.data.message);
    }
}

export const startInterviewByIdService = async (id) => {
    try {
        const res = await axios.put(`/interview/start/${id}`);
        return res;
    }
    catch (error) {
        console.log("Error ----> ", error.response.data.message);
    }
}

export const endInterviewByIdService = async () => {
    try {
        const res = await axios.put(`/interview/end/${id}`);
        return res;
    }
    catch (error) {
        console.log("Error ----> ", error.response.data.message);
    }
}