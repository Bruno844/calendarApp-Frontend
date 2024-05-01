import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onLogOut, onLogin } from "../store/auth/authSlice"
import { onLogOutCalendar } from "../store/calendar/calendarSlice"


export const useAuthStore = () => {

    const {status,user,errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async({email,password}) => {
        
        dispatch(onChecking());
        try {

            const {data} = await calendarApi.post('/auth/login', {email,password})
            console.log({data})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            console.log(error)

            dispatch(onLogOut('credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }
    }


    const startRegister = async({name,email,password}) => {

        dispatch(onChecking());

        try {
            const {data} = await calendarApi.post('/auth/register', {name,email,password})
            console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({name: data.name, uid: data.uid, email: data.email}))
            
        } catch (error) {
            
            dispatch(onLogOut(error.response.data?.msg))
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }



    }


    const checkAuthToken = async() => {
        //*preguntamos si viene el token 
        //*si no viene retornamos el reducer onLogOut
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogOut());

        //*hacemos un get al backend y renovamos el token
        //* y seteamos un nuevo token en el local storage
        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token',data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({name: data.name, uid: data.uid}))
            
        } catch (error) {
            localStorage.clear();
            dispatch(onLogOut());
        }
    }


    const startLogOut = () => {
        localStorage.clear();
        dispatch(onLogOutCalendar());
        dispatch(onLogOut());
    }







    return {
        //*propiedades
        status,
        user,
        errorMessage,

        //*metodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogOut
    }

}