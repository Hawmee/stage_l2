import React, { useRef } from 'react'
import'../../styleCSS/modalServ.css'
import { toast } from 'react-toastify'
import axiosClient from '../../axios-client'
import axios from 'axios'
import { useStateContext } from '../../contexts/ContextProvider'

export default function NewService({isNewServ , setIsNewServ ,  setServValue}) {

   const ServiceRef = useRef()
   const {services , setServices , Notify} = useStateContext()
   const UrlServ = "http://127.0.0.1:8000/api/services"


   const exist = (element)=>{
      if(services){
         const isexist = services.some(service=> service.service_name == element)
         return isexist
      }
   }
  
  const Ajout = async(payload)=>{
   try{
      const result = await axios.post(UrlServ , payload)
      setServices((x)=>[...x , payload])
   }catch(error){
      console.log(error)
   }
  }

  const capitalize = (word) => {
   return word.charAt(0).toUpperCase() + word.slice(1);
   };

   const onSubmit = (e)=>{
      e.preventDefault()
      const service = capitalize(ServiceRef.current.value)
      const isexist = exist(service)

      const payload = {
         service_name:service ,
      }

      
      if(service.trim() == ""){
         const err = "verifier Votre Saisie"
         Notify(err)
      }else if(isexist){
         const err = "verifier Votre Saisie .  Service Deja existant"
         Notify(err)
      }else{
         Ajout(payload) 
         setIsNewServ(false)
         setServValue(null)
      }
   } 

   const closeModal = ()=>{
      setIsNewServ(false)
      setServValue(null)
   }

   if(!isNewServ) return null
  return (
    <>
      <div className="overlay">
         <div className="modalContainer">
            <button className='button_close' type='Button' onClick={closeModal}>
               x
            </button>
            <form onSubmit={onSubmit}>
               <h3>Ajout d'un Service</h3>
               <div className="inputServ">
                  <input type="text" ref={ServiceRef} className='inputServInput' placeholder='Nom du Service' />
               </div>
               <button className='button_Valider'>Valider</button>
            </form>
         </div>
      </div>
    </>
  )
}
