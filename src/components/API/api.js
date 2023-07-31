import axios from "axios";

const KEY = '36838957-ef31fcc6ae2ed56636f44e964';

const imagesApi = axios.create({
    baseURL: `https://pixabay.com/api/`,
});

export const getData = async (query, page) => {
const response = await imagesApi.get('', {
params: {
    key:KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    q:query,
    page}});
    
return response.data;
};