import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { debounce } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const StateContext = createContext( {
    user: null , 
    token: null ,
    AdUs: 'Client' , 
    label_call_app: 'Appeler' , 
    services : [] ,
    setUser: ()=>{} ,
    setToken: ()=>{} , 
    setAdUs: ()=>{} , 
    setLabel_call_app: ()=>{} , 
    Notify : ()=>{} ,
    setServices: ()=>{}
})

 export const ContextProvider = ({children})=>{
    const [user , setUser] =useState(null)
    const [token , _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [AdUs , setAdUs] = useState('Client')
    const [label_call_app , setLabel_call_app] = useState("Appeler")
    const UrlServ = 'http://127.0.0.1:8000/api/services'
    const [services , setServices] = useState([])
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

    const fetchServices = useCallback(()=>{
        axios
        .get(UrlServ)
        .then(response =>{
          const data = response.data
          if(services.length!==data.length || data.length == 0){
            setServices(data)
          }else{
            for(let i=0 ; i<services.length ; i++){
              if(data[i].service_name!==services[i].service_name ){
                setServices(data)
              }
              else{
                return
              }
            }
          }
        })
        .catch(error=>{
          console.error("error fetching :" , error)
        })
    } , [])

    useEffect(()=>{
        const debounce_services = debounce(fetchServices , 1000)
        debounce_services()

        return ()=>{
            debounce_services.cancel()
          }
    } , [services])

    return(
        <StateContext.Provider value={{
            user , 
            token ,
            AdUs ,
            label_call_app , 
            onLogoutRef ,
            services ,
            setUser ,
            setToken ,
            setAdUs ,
            setLabel_call_app,
            setServices , 
            Notify
        }}>
            {children}
        </StateContext.Provider>
    )

 }

 export const useStateContext =()=>{
    return useContext(StateContext)
 }