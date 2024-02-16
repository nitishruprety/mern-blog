import axios from "axios"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

http.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}, err => Promise.reject(err))

http.interceptors.response.use(resp => {
    if('success' in resp.data) {
        toast.success(resp.data.success)
    }

    return resp
}, err => {
    if('error' in err.response.data) {
        toast.error(err.response.data.error)
    }

    return Promise.reject(err)
})

export default http