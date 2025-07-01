import axios from './axiosConfig.js'

export const processPaymentService = async (data) => {
    try {
        const res = await axios.post('/payment/process', data);
        return res;
    }
    catch (error) {
        console.log("Error ----> ", error.response.data.message);
    }
}

export const verifyPaymentService = async (data) => {

    try {
        const res = await axios.post('/payment/verify', data);
        return res;
    }
    catch (error) {
        console.log("Error ----> ", error.response.data.message);
    }
}