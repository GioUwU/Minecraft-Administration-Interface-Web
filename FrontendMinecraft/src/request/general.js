import api from './api';

export const getAllTimes = async () => {
    try {
        const response = await api.get("/getAllTimes");
        return response;
    } catch (error) {
        return error;
    }
};

export const getAllRules = async () => {
    try {
        const response = await api.get("/getAllRules");
        return response;
    } catch (error) {
        return error;
    }
}

export const newTime = async (data) => {
    try {
        const response = await api.post("/newTime", data);
        return response;
    } catch (error) {
        return error;
    }
}

export const newRule = async (data) => {
    try {
        const response = await api.post("/newRule", data);
        return response;
    } catch (error) {
        return error;
    }
}

