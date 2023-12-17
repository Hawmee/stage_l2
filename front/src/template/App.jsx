
import Header from "../components/header"
import "./App.css"
import { Route, Routes ,RouterProvider, Outlet, Navigate } from "react-router-dom"
import { useState,useEffect } from "react"
import Heure from "../components/Heure"
import { CallProvider } from "../contexts/CallContext"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios-client"

function App() {
  const storageKey = 'ACCESS_TOKEN'
  const {token , user , label_call_app , onLogoutRef , setToken , setUser  ,setAdUs  }= useStateContext()

  if(!token){
    return (
      <Navigate to='/login'/>
    )
  }

  console.log(user);

  useEffect(()=>{
    const HandleLogin = (ev)=>{
      if(ev.key == storageKey){
        const data = localStorage.getItem(storageKey);
        if(!data){
          window.location.reload()
        }
      }
    }

    window.addEventListener('storage' , HandleLogin)

    return() =>{
      window.removeEventListener('storage' , HandleLogin)
    }
  } , [])

  
  // if(localStorage){
  //   // window.location.reload()
  //   console.log(localStorage.length);
  // }




  const onLogout = (e)=>{
    e.preventDefault()
    setAdUs('Client')
    if(token !== 'user_token' ){
      axiosClient.post('/logout')
      .then(()=>{
        setUser({})
        setToken(null)
      })
    }else{
      setUser({})
      setToken(null)
    }

    if(label_call_app == "Pauser"){
      if(onLogoutRef.current){
        onLogoutRef.current.click()
      }
    }
    
  }




  useEffect(()=>{
    if(token !== 'user_token'){
      axiosClient.get('/user')
      .then(({data})=>{
        setUser(data)
      })
    }
  },[token])




  useEffect(()=>{

    if(!user && token == "user_token" ){
      const UserIdentifcation = {
        name: 'user' ,
        user_name : 'User' ,
      }
      setUser(UserIdentifcation)
    }

    console.log(user)
  } ,[user , token] )




  return (

    <>   
      <div>
        <Header onLogout={onLogout} user={user} token={token} label_call_app={label_call_app} onLogoutRef={onLogoutRef} />
        <div className="Body">
          {/* <Heure /> */}
          <CallProvider>
            <Outlet />
          </CallProvider>
        </div>
      </div>

    </>
  )
}

export default App
