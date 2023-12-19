import { faArrowDown, faArrowUp, faHomeUser, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'
import Select from 'react-select'
import NewService from './NewService'

export default function NewAdmin({newUser}) {

   const {setUser , setToken , token , user , Notify , services , setServices} = useStateContext()
   const [err , setErr] = useState(null)
   const [servValue , setServValue]= useState(null)
   const nameRef = useRef();
   const postRef = useRef();
   const userNameRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmationRef = useRef();
   const [isNewServ ,  setIsNewServ]=useState(false)
   const [options , setOptions] = useState([])
   // let options = []

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
         service_name: servValue.label ,
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


   useEffect(()=>{
      let optionTemp = []
      if(services.length > 0 ){
         optionTemp = services.map(service=>({
            label:service.service_name
         }))
         optionTemp.unshift({ label: "Ajouter" })
         setOptions(optionTemp)   
      }
   },[services])


   useEffect(()=>{
      if(isNewServ){
         console.log("okok");
         // setIsNewServ(false)
      }
   } , [isNewServ])


   const customStyle = {
      control: (provided, state) => ({
         ...provided,
         // backgroundColor: 'transparent',
         // boxShadow: 'none',
         border: state.isFocused ? '2px solid white' : provided.border,
         '&:hover': {
           borderColor: 'white',
         },
         boxShadow: state.isFocused ? '0 0 0 5px white' : provided.boxShadow,
         boxShadow: state.isFocused ? null : null,
         // height: '12px',
         // minHeight: '32px',
         marginLeft : '12px',
         marginRight : '12px',
         padding: '0 7px ',
         maxWidth:'350px',
         width:'300px',
       }),
       menuList: (provided) => ({
         ...provided,
         // Add a max height and overflow for scrollable menu
         maxHeight: '150px',
         overflow: 'auto',
         color: 'grey'
       }),
   }


   const handlevalue = (selectedOption)=>{
      setServValue(selectedOption)
   }

   // function submit(e){
   //    e.preventDefault();
   //    console.log(isNewServ);
   // }

   useEffect(()=>{
      if(servValue && servValue.label == "Ajouter"){
         setIsNewServ(true)
      }else{
         setIsNewServ(false)
      }
   } , [servValue])

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
            
            <div className="ServContainer">
               <Select
                  options={options}
                  styles={customStyle}
                  onChange={handlevalue}
                  value={servValue}
                  placeholder='Services'
                  isClearable />
            </div>

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

      <NewService isNewServ={isNewServ} setIsNewServ={setIsNewServ} setServValue={setServValue} />
    </>
  )
}
