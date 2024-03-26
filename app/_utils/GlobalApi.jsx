const { default: axios } = require("axios")

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
});

const getCategory = async () => axiosClient.get('/categories?populate=*');
export default { getCategory }