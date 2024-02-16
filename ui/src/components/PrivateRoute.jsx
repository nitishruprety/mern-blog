import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../store/user.slice"
import http from "../http"

export const PrivateRoute = ({element}) => {
    const user = useSelector(state => state.user.value)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(user).length == 0) {
            const token = localStorage.getItem('token')

            if(token) {
                http.get('/auth/user')
                    .then(resp => {
                        dispatch(setUser(resp.data))
                    })
                    .catch(err => {
                        localStorage.removeItem('token')
                        navigate('/cms/login')
                    })
            } else {
                navigate('/cms/login')
            }
        }
    }, [user])

    return element
}