import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks/useAuthStore"
import { useEffect } from "react"




export const AppRouter = () => {

    const {status,checkAuthToken} =   useAuthStore()
    //const authStatus = 'not-auth'

    useEffect(() => {
      checkAuthToken();
    
      
    }, [])
    

    if (status === 'checking'){
        return (
            <h3>Cargando...</h3>
        )
    }



    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ?   (
                        <>
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                            <Route path="/auth/*" element={<LoginPage />} />
                        </>
                        
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="" />} />
                        </>
                        
                    )  
            }
            

           
            
        </Routes>
    )
}

