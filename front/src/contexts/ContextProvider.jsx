import { createContext, useContext, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StateContext = createContext( {
    user: null , 
    token: null ,
    AdUs: 'Client' , 
    label_call_app: 'Appeler' , 
    setUser: ()=>{} ,
    setToken: ()=>{} , 
    setAdUs: ()=>{} , 
    setLabel_call_app: ()=>{} , 
    Notify : ()=>{} ,
})

 export const ContextProvider = ({children})=>{
    const [user , setUser] =useState(null)
    const [token , _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [AdUs , setAdUs] = useState('Client')
    const [label_call_app , setLabel_call_app] = useState("Appeler")
    const onLogoutRef = useRef()

    const setToken =(token)=>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    const Notify=(err)=>{
        toast.error(err , {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        })
    }

    return(
        <StateContext.Provider value={{
            user , 
            token ,
            AdUs ,
            label_call_app , 
            onLogoutRef ,
            setUser ,
            setToken ,
            setAdUs ,
            setLabel_call_app, 
            Notify
        }}>
            {children}
        </StateContext.Provider>
    )

 }

 export const useStateContext =()=>{
    return useContext(StateContext)
 }