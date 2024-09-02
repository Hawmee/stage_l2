import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { useCallData } from '../../contexts/CallContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket,faDisplay,faBullhorn,faArrowRightFromBracket,faBars, faUser, faMicrochip, faMicrophone, faPersonArrowDownToLine, faSortNumericDown, faArrowsDownToPeople, faTentArrowsDown, faSortDown, faArrowDownUpLock, faArrowsDownToLine, faLevelDown, faPauseCircle, faCirclePause, faPause, faStopCircle, faWarning, faUserLock, faUserAlt, faUserSlash, faSlash, faChainSlash, faEyeSlash, faTextSlash, faStoreSlash, faVideoSlash, faUsersSlash, faDiagramNext, faAlignRight, faRightToBracket, faAngleDoubleLeft, faAngleRight, faArrowRight, faRightLong, faRightLeft, faAngleDoubleRight, faTicketAlt, faTicketSimple, faCheckCircle, faCheckSquare, faCheck, faUsers } from '@fortawesome/free-solid-svg-icons'

export default function DisplayCall({num , service , isAffiche , activate , suivant , En_fil , call , setAffichage , add}) {
  const [label_call , setLabel_call] = useState("Appeler")
  const [suivant_terminer , setSuivant_terminer] = useState("teminer")
  const [skip , setSkip] = useState("Mettre en fil")
  const [index , setIndex] = useState(1)
  const { user ,onLogoutRef ,  setLabel_call_app} = useStateContext()

  const {desactive_call , noResp , logingOut} = useCallData()




   useEffect(()=>{
      const callBtn = document.getElementById('call')
      const pauseBtn = document.getElementById('pause') 
      const norespBtn = document.getElementById('no_resp')
      const suivantBtn = document.getElementById('suivant')
      // console.log(isAffiche)
      if(isAffiche.length>0){
         if(isAffiche[0].Call_Status == 0){
            setLabel_call("Appeler")
            callBtn.style.display = "inline-block"
            pauseBtn.style.display = "none"
         }else{
            setLabel_call("Pauser")
            callBtn.style.display = "none"
            pauseBtn.style.display = "inline-block"
            if(call.length <= 1){
               setSuivant_terminer("terminer")
            }else{
               setSuivant_terminer("Suivant")
            }
         }
      }else{
         setLabel_call("Appeler")
      }

      // if(isAffiche.length < 0 ){
      //    const suivantBtn = document.getElementById('suivant')
      //    suivantBtn.style.display = "none"
      // }

      if(call.length >0){
         if(call[0].ticket_status == "En appel"){
            suivantBtn.style.display = "inline-block"
            norespBtn.style.display = "inline-Block"
         }else{
            suivantBtn.style.display = "none"
            norespBtn.style.display = "none"
            callBtn.style.display = "inline-block"
            pauseBtn.style.display = "none"
            setLabel_call('Appeler')
         }
      }else{
         suivantBtn.style.display = "none"
         norespBtn.style.display = "none"
         callBtn.style.display = "inline-block"
         pauseBtn.style.display = "none"
      }
   } ,[call])


   // console.log(isAffiche);

   function onCall(){
      if(call.length>0){
         const callTicketId = call[0].ticket_id ;            
         // console.log(isAffiche);
         if(user.user_id){
            const user_id = user.user_id
            if(isAffiche.length > 0 ){
               const hasTicketId = isAffiche.some((item)=>item.ticket_id == callTicketId)
               if(!hasTicketId){
                  add(callTicketId , user_id)
               }
            }else{
               add(callTicketId , user_id)
            }
   
            if(label_call == "Appeler"){
               const status = 1
               activate(callTicketId , status)
               setLabel_call_app("Pauser")
            }
            if(label_call=="Pauser"){
               const status =0
               activate(callTicketId , status)
               setLabel_call_app("Appeler")
            }
         }

      }
   }

   function onSuivant(){
      if(call.length>0){
         const callTicketId = call[0].ticket_id ;
         // const id = isAffiche[0].id
         const status = 0
         setIndex(1)
         activate(callTicketId , status)
         suivant(callTicketId)
      }
   }

   function onNoResp(){
      if(call.length>0){
         const TicketId = call[0].ticket_id 
         noResp(TicketId)
      }
   }

   function fil(){
      if(call.length>0){
         En_fil(index)
         setIndex(index+1)
      }

   }

   function onFil(){
      if(call.length >1){
         if(index <= (call.length-1)){
            fil()
         }else{
            setIndex(1)
         }
      }
   }
  
   function onLogout() {
      if(isAffiche[0]){
         const TicketId = isAffiche[0].ticket_id
         logingOut(TicketId)
         // console.log(TicketId)
      }else{
         // console.log("Huhu");
      }
   }

   return (
    <>
      <div className='display_conatiner'>
         <div className='body_display_container'>
         <h3>Appeler :</h3>
            <div className='display_call' >
               <p>Ticket:  {num}</p>
               <p>Service visé: {service}</p>
            </div>
            <div className='first_btn_div'>
               <button className='Btn_call' onClick={onCall} >
                  <i id="call"> <FontAwesomeIcon icon={faMicrophone} /> </i>        
                  <i id="pause" style={{ display:'none' }} > <FontAwesomeIcon icon={faPause} />  </i>            
               </button>
               <button onClick={onSuivant} className='suivant' id='suivant'> <FontAwesomeIcon icon={faCheck} /> </button>
               <button onClick={onLogout} ref={onLogoutRef} style={{ display: 'none' }}  >here</button>
               <button onClick={onNoResp} id='no_resp'> <FontAwesomeIcon icon={faUserSlash} /> </button>
            </div>
            <div className='second_btn_div'>
               <button className='Btn_fil' onClick={onFil} > <FontAwesomeIcon icon={faUserAlt} /> <FontAwesomeIcon icon={faLevelDown} />  </button>
               
            </div>
         </div>
      </div>
    </>
  )
}
