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

const getDoctorById = async (id) => axiosClient.get(`/doctors/${id}?populate=*`);

const bookAppointment = async (data) => axiosClient.post('/appointments', data);

const sendEmail = async (data) => axios.post('/api/sendEmail', data);

const getUserBookingList = async (email) => axiosClient.get(`/appointments?[filters][Email][$eq]=${email}&populate[doctor][populate][image][populate][0]=url&populate=*`);

const deleteBooking = async (id) => axiosClient.delete(`/appointments/${id}`);

export default { 
    getCategory,
    getDoctorList,
    getDoctorListByCategory,
    getDoctorById,
    bookAppointment,
    sendEmail,
    getUserBookingList,
    deleteBooking,
}