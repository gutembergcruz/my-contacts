import axios from 'axios';
//Configuração basica da API
const api = axios.create({
  baseURL: 'https://662491d904457d4aaf9c7b15.mockapi.io/',
  timeout: 5000,
  headers: {    
    'Content-Type': 'application/json',
  },
});

export default api;