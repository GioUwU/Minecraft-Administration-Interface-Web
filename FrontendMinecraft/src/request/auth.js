import api from "./api";

export const loginUser = async (loginData) => {
    try {
        const resp = await api.post('/login', loginData);
        return resp;
    } catch (error) {
      return error;
    }
};

export const getDataUser = async () => {
    try {
        const resp = await api.get('/user');
        return resp;
    } catch (error) {
      return error;
    }
}

export const logoutUser = async () => {
    try {
        const resp = await api.post('/logout');
        return resp;
    } catch (error) {
      return error;
    }
}