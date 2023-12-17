import React, { useEffect, useRef, useState } from 'react'
import waitline from '../assets/waitline.png'
import calling from '../assets/call.png'
import { Typewriter , useTypewriter , Cursor} from 'react-simple-typewriter'
import "../styleCSS/login.css"
import { faArrowAltCircleLeft, faArrowLeft, faArrowRight, faGear, faHeadset, faLock, faLongArrowLeft, faTicket, faUser, faUserAlt, faUserAltSlash, faUserAstronaut, faUserCheck, faUserCircle, faUserClock, faUserCog, faUserEdit, faUserGear, faUserLarge, faUserMd, faUserShield } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'
import NewAdmin from '../components/form/NewAdmin'
import axiosClient from '../axios-client'


export default function Login() {
  // const [AdUs , setAdUs] = useState('User')
  const [isSetting , setIsSetting] = useState(false)
  const [err , setErr] =useState(null)
  const prev = "<"
  const next = ">"
  const passwordRef = useRef();
  const userNameRef = useRef();
  let i = 0

  const {setUser,user , setToken , AdUs , setAdUs , Notify } = useStateContext()


  const inFocus =( inputValue , inputElement)=>{
    const parentDiv = inputElement.closest('.input-div')

    if(inputElement === document.activeElement || inputValue !== ''){
      parentDiv.classList.add('focus')
    }else{
      parentDiv.classList.remove('focus')
    }
  }

  const adminUser = ()=>{
    const admin = document.getElementById('admin')
    const user = document.getElementById('user')
    const formAdmin = document.getElementById('formDiv')
    const formUser = document.getElementById('userLogin')
    const adminEdit = document.getElementById('editAdmin')
    const formCont = document.querySelector('.formContainer')
    if(AdUs == "Client"){
      user.style.display = "none"
      admin.style.display = "block"
      formAdmin.style.display = "inline-block"
      formUser.style.display = "none"
      formCont.style.height = "100vh"
      setAdUs("Gerants")
    }else{
      user.style.display = "block"
      admin.style.display = "none"
      formAdmin.style.display = "none"
      formUser.style.display = "block"
      adminEdit.style.display ="none"
      formCont.style.height = "100vh"
      setAdUs("Client")
      setIsSetting(false)
    }

  }

  const onSubmit = (e)=>{
    e.preventDefault()
    const UserIdentifcation = {
      name: 'user' ,
      user_name : 'User' ,
    }
    const payload = {
      user_name:userNameRef.current.value ,
      password:passwordRef.current.value ,
    }
    setErr(null)    
    if(AdUs == "Client"){
      setUser(UserIdentifcation)
      setToken('user_token')
    }else{
      axiosClient.post('/login',payload)
        .then(({data})=>{
          setUser(data.user)
          setToken(data.token)
        })
        .catch(err=>{
          console.log(err);
          const response = err.response 
          if(response && response.status === 422){
            // console.log(response);
            // setErr(response.data.errors) 
            if(response.data.errors){
              // console.log(err.response.data.errors); 
              setErr(response.data.errors)
            }else{
              setErr({
                error: [response.data.message]
              })
            }

          }       
        })
    }
  }

  const newUser = ()=>{
    const editPage = document.getElementById('editAdmin')
    const adminPage = document.getElementById('formDiv')
    const formCont = document.querySelector('.formContainer')
    if(isSetting){
      editPage.style.display = "none"
      adminPage.style.display = "inline-block"
      formCont.style.height = "100vh"
      setIsSetting(false)
    }else{
      editPage.style.display = "block"
      adminPage.style.display = "none"
      formCont.style.height = "140vh"
      setIsSetting(true)
    }
  }

  useEffect(()=>{
    if(err){
      Object.keys(err).map(key =>(
        Notify(err[key][0])
      ))
    }
    // console.log(err);
  } , [err])

  return (
    <>
      <div className='loginContainer'>
        <div className='img_container'>
          <div className='text'> 
            <Typewriter 
              words={['SMMC','LOG IN']}
              loop={i++}
              cursor
              cursorStyle='_'
              typeSpeed={200}
              deleteSpeed={100}
              delaySpeed={2000} />
          </div>
          <img src={waitline} alt="" className='img_waitline'  id='wait_line'/>
        </div>
        
        <div className='formContainer'>

          <div className='title'>
            <div className="userContainer">
              <div className="ImgContainer">
                <div className='userImg'>
                  <i id='user'> <FontAwesomeIcon icon={faUser} /> </i>
                  <i id='admin'> <FontAwesomeIcon icon={faHeadset}/> </i>
                </div>
              </div>
              <div className='adminuser'>
                <button className='prev' onClick={adminUser} > {prev} </button>
                <p className='adminusertxt'>{AdUs}</p>
                <button className='next' onClick={adminUser} > {next} </button>
              </div>
            </div>
            <div >
              {/* <i id='admin_set' onClick={newUser} ><FontAwesomeIcon icon={faGear}/></i> */}
            </div>
          </div>

          <div className="formDiv" id='formDiv'>
            <div className='h2Container'> <p className='h2'>S'identifier</p> </div>
            
            <form id='formContainer' onSubmit={onSubmit}>
              
              <div className="formContent">

                <div className='input-div one'>
                  <div className="i">
                    <i><FontAwesomeIcon icon={faUser} /></i>
                  </div>
                  <div>
                    <h5>Nom d'Utilisateur</h5>
                    <input 
                      className='input' 
                      type="text" 
                      ref={userNameRef}
                      onFocus={(e)=>{inFocus(e.target.value , e.target)}}
                      onBlur={(e)=>{inFocus(e.target.value , e.target)}} />
                  </div>
                </div>

                <div className="input-div two ">
                  <div className="i">
                    <i><FontAwesomeIcon icon={faLock} /></i>
                  </div>
                  <div>
                    <h5>Mot de passe</h5>
                    <input 
                      className='input' 
                      type="password"
                      ref={passwordRef}
                      onFocus={(e)=>{inFocus(e.target.value , e.target)}}
                      onBlur={(e)=>{inFocus(e.target.value , e.target)}} />
                  </div>
                </div>
                <p className='' onClick={newUser}>S'enregistrer</p>

                <div className="btnDiv">
                  <input type="submit" className='btn' value="Entrer" />
                </div>
               </div>

            </form>
          </div>

          <div className='userLogin' id='userLogin'>
          <div className='h2Container'> <p className='h2'>Se mettre en fil d'attente </p> </div>
            <div className="userEntry">
              <div className='btnUserEntry'>
                <button className='btn' onClick={onSubmit} >Entrer</button>
              </div>
            </div>
          </div>

          <div className='editAdminDiv' id="editAdmin">
            <NewAdmin  newUser={newUser} />
          </div>

        </div>
      </div>
    </>
  )
}
