import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { debounce } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useCallData } from "./CallContext";

const StateContext = createContext( {
    user: null , 
    token: null ,
    AdUs: 'Client' , 
    label_call_app: 'Appeler' , 
    options : [] ,
    optionsTicket : [] ,
    setUser: ()=>{} ,
    setToken: ()=>{} , 
    setAdUs: ()=>{} , 
    setLabel_call_app: ()=>{} , 
    Notify : ()=>{} ,
    setServices : ()=>{}
})

 export const ContextProvider = ({children})=>{
    const [user , setUser] =useState(null)
    const [token , _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [AdUs , setAdUs] = useState('Client')
    const [label_call_app , setLabel_call_app] = useState("Appeler")
    const UrlServ = 'http://127.0.0.1:8000/api/services'
    const [services , setServices] = useState([])
    const [optionsTicket , setOptionsTicket] = useState([])
    const [options , setOptions] = useState([])
    const onLogoutRef = useRef()

    const {Call} = useCallData()

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

    const fetchServices = ()=>{
        axios
        .get(UrlServ)
        .then(response =>{
          const data = response.data
          if(services.length!==data.length || services.length == 0){
            setServices(data)
          }else{
            return
          }
        })
        .catch(error=>{
          console.error("error fetching :" , error)
        })
    } 

    useEffect(()=>{
        const debounce_services = debounce(fetchServices , 1000)
        debounce_services()

        return ()=>{
            debounce_services.cancel()
          }
    } , [services , Call])

    useEffect(()=>{
        let optionTemp = []
        let optionTempTicket = []
        if(services.length > 0 ){
           optionTemp = services.map(service=>({
              label:service.service_name
           }))
           optionTempTicket = services.map(service=>({
            label:service.service_name
         }))
          optionTempTicket.unshift({label: "Autre"})
           setOptionsTicket(optionTempTicket.filter(option => option.label !== 'Acceuil'))
           optionTemp.unshift({ label: "Ajouter" })
           setOptions(optionTemp)   
        }else{
          optionTemp.unshift({ label: "Ajouter" })
          optionTempTicket.unshift({label: "Autre"})
          setOptions(optionTemp)
          setOptionsTicket(optionTempTicket.filter(option => option.label!=='Acceuil'||option.label!=='acceuil' ))
        }
     },[services])

    // console.log(user)

    return(
        <StateContext.Provider value={{
            user , 
            token ,
            AdUs ,
            label_call_app , 
            onLogoutRef ,
            options ,
            optionsTicket ,
            setUser ,
            setToken ,
            setAdUs ,
            setLabel_call_app, 
            Notify,
            setServices
        }}>
            {children}
        </StateContext.Provider>
    )

 }

 export const useStateContext =()=>{
    return useContext(StateContext)
 }