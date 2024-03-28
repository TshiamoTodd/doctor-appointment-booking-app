const { default: axios } = require("axios")

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
});

const getCategory = async () => axiosClient.get('/categories?populate=*');

const getDoctorList = async () => axiosClient.get('/doctors?populate=*');

const getDoctorListByCategory = async (category) => axiosClient.get(`/doctors?filters[categories][Name][$in]=${category}&populate=*`);

export default { 
    getCategory,
    getDoctorList,
    getDoctorListByCategory
}