import axios from "axios"
import toast from "react-hot-toast"

export const getDoctorsAPI = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/User/doctors`)
        return data
    } catch (err) {
        toast.error(err?.message)
    }
}

// get doctor data
export const getDoctorDataAPI = async (id) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/User/doctor/${id}`)
        return data
    } catch (err) {
        toast.error(err?.message)
    }
}

// ask question
export const sendQuestionAPI = async (message, id) => {
    const token = localStorage.getItem("loginToken") || null
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASEURL}/Consultation`, {
            doctorId: id,
            message
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        return data
    } catch (err) {
        toast.error(err?.message)
    }
}

export const getQuestionsAPI = async () => {
    const token = localStorage.getItem("loginToken") || null
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/Consultation/my-consultations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (err) {
        toast.error(err?.message)
    }
}


export const sendReplyAPI = async (conId, replies) => {
    try {
        const token = localStorage.getItem("loginToken") || null
        const { data } = await axios.post(
            `${import.meta.env.VITE_BASEURL}/Consultation/reply`,
            {
                conId,
                reply: replies[conId], // fixed field name
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data

    } catch (err) {
        toast.error(err?.message);
    }
};