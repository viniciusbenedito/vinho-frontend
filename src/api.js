import axios from 'axios';

const api = axios.create({
    baseURL:'https://vinho-backend.herokuapp.com/'
});
export default api;
