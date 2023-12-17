import { faArrowDown, faArrowUp, faHomeUser, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'

export default function NewAdmin({newUser}) {

   const {setUser , setToken , token , user , Notify} = useStateContext()
   const [err , setErr] = useState(null)

   const nameRef = useRef();
   const postRef = useRef();
   const userNameRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmationRef = useRef();


   const inFocus =( inputValue , inputElement)=>{
      const parentDivE = inputElement.closest('.inputContainer')
  
      if(inputElement === document.activeElement || inputValue !== ''){
        parentDivE.classList.add('focus')
      }else{
        parentDivE.classList.remove('focus')
      }
   }

   const onSubmit = (e)=>{
      e.preventDefault();
      
      setErr(null)
      const payload = {
         name : nameRef.current.value,
         // post : postRef.current.value,
         user_name : userNameRef.current.value,
         password:passwordRef.current.value,
         password_confirmation : passwordConfirmationRef.current.value,
      }

      axiosClient.post('/signup' , payload)
      .then(({data})=>{
         setUser(data.user)
         setToken(data.token)
      })
      .catch(err =>{
         const response = err.response ; 
         if(response && response.status == 422){
            // console.log(response.data.errors);
            setErr(response.data.errors)
         }
      })

      // console.log(payload);
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
      <div className='h2Container'> <p className='h2'> S'enregistrer </p> </div>

      <form className="formEContainer" onSubmit={onSubmit}>
         <div className='formEdit'>

            <div className='inputContainer one '>
               <div className='icon' >
                  <i><FontAwesomeIcon icon={faUser} /></i>
               </div>
               <div>
                  <h5>  Nom </h5>
                  <input
                        ref={nameRef}
                     className='inputform' 
                     type="text" 
                     onFocus={(e)=>{inFocus(e.target.value , e.target)}}
                     onBlur={(e)=>{inFocus(e.target.value , e.target)}} />
               </div>
            </div>

            {/* <div className='inputContainer one '>
               <div className='icon' >
                  <i><FontAwesomeIcon icon={faHomeUser} /></i>
               </div>
               <div>
                  <h5>  Poste </h5>
                  <input
                     ref={postRef}
                     className='inputform' 
                     type="text" 
                     onFocus={(e)=>{inFocus(e.target.value , e.target)}}
                     onBlur={(e)=>{inFocus(e.target.value , e.target)}} />
               </div>
            </div> */}

            <div id="newPass">
               <div className='inputContainer two '>
                  <div className='icon' >
                     <i><FontAwesomeIcon icon={faUser} /></i>
                  </div>
                  <div>
                     <h5> Nom d'utilisateur</h5>
                     <input
                        ref={userNameRef}
                        className='inputform ' 
                        type="text"
                        onFocus={(e)=>{inFocus(e.target.value , e.target)}}
                        onBlur={(e)=>{inFocus(e.target.value , e.target)}} />
                  </div>
               </div>

               <div className='inputContainer three' >
                  <div className='icon' >
                     <i><FontAwesomeIcon icon={faLock} /></i>
                  </div>
                  <div>
                     <h5> Mot De Passe</h5>
                     <input
                        ref={passwordRef}
                        className='inputform ' 
                        type="password"
                        onFocus={(e)=>{inFocus(e.target.value , e.target)}}
                        onBlur={(e)=>{inFocus(e.target.value , e.target)}} />
                  </div>
               </div>
            </div>

            <div className='inputContainer four' >
               <div className='icon' >
                  <i><FontAwesomeIcon icon={faLock} /></i>
               </div>
               <div>
                  <h5> Confirmation du mot de passe </h5>
                  <input
                     ref={passwordConfirmationRef}
                     className='inputform ' 
                     type="password" 
                     onFocus={(e)=>{inFocus(e.target.value , e.target)}}
                     onBlur={(e)=>{inFocus(e.target.value , e.target)}} />
               </div>
            </div>
            <p className='' onClick={newUser} >S'identifier</p>

            <div className="btnDiv">
                  <input type="submit" className='btn' value="Valider"  />
            </div>

         </div>
      </form>
    </>
  )
}
