import axios from 'axios';
import store from '../redux/store/store'; //

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.user.userInfoTh; // Get token from Redux state
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});

export default api;

