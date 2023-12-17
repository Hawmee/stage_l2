import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Entry() {
  const storageKey = 'ACCESS_TOKEN'
  const {token , AdUs , setAdUs} =useStateContext()

  useEffect(()=>{
    const HandleLogin = (ev)=>{
      if(ev.key == storageKey){
        const data = localStorage.getItem(storageKey);
        if(data){
          window.location.reload()
        }
      }
    }

    window.addEventListener('storage' , HandleLogin)

    return() =>{
      window.removeEventListener('storage' , HandleLogin)
    }
  } , [])


  if(token){
    if(AdUs == "Client"){
      return(
        <Navigate to="/" />
      )
    }else{
      return(
        <Navigate to="/call" />
      )
    }
  }

  // console.log(AdUs);

  return (
    <>
        <Outlet />
        <ToastContainer />
    
    </>
  )
}
