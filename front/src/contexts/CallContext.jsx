import axios from "axios";
import { debounce } from 'lodash';
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const CallContext = createContext({
  desactive_call : ()=>{} ,
  noResp : ()=>{}
})

export const CallProvider = ({children})=>{
    const [Call , setCall]= useState([]) 
    const [disp , setDisp]=useState([])
    const [isAffiche , setIsAffiche] = useState([])
    const [affichage , setAffichage]= useState([])
    const urlCall = 'http://127.0.0.1:8000/api/tickets/'
    const urlCall_status = 'http://127.0.0.1:8000/api/calls/'
    const table= document.getElementById('table')
  


    const add_status= async($ticket_id , user_id)=>{
      const status = {
        ticket_id: $ticket_id , 
        user_id: user_id ,
        Call_Status:1
      }
      En_Appel($ticket_id)
      axios.post(urlCall_status , status)
    }

    const suivant=(TicketId)=>{
      // const id_actu = Call[0].id
      if(affichage.length >1){
      }    
      Appele(TicketId)
    }

    const En_Appel= (id)=>{
      const num = Call[0].num_ticket_temp
      const motif = Call[0].motif
      const ticket_status ={
        num_ticket_temp: num ,
        motif: motif,
        ticket_status:'En appel'
      }
      axios.put(urlCall+id , ticket_status)
    }

    const Appele= ( TicketId )=>{
      const num = Call[0].num_ticket_temp
      const ticket_actu ={
        num_ticket_temp: num ,
        motif: Call[0].motif,
        ticket_status:'Appelé'
      }
      axios.put(urlCall+TicketId , ticket_actu)    
    }

    const active_call = (TicketId , status)=>{
      // const idTicket=Call[0].id
      const modif = {
        ticket_id: TicketId , 
        Call_Status: status ,
      }
      En_Appel(TicketId)
      axios.put(urlCall_status+TicketId , modif )
    }

    const desactive_call = (TicketId)=>{

      if(Call[0]){
        const num = Call[0].num_ticket_temp
        const motif = Call[0].motif
        const ticket_status ={
          num_ticket_temp: num ,
          motif: motif,
          ticket_status:'En attente'
        }

        const findId = isAffiche.some((item)=>item.ticket_id == TicketId)
        if(findId){
          const modif = {
            ticket_id: TicketId , 
            Call_Status: 0 ,
          }
          axios.put(urlCall_status+TicketId , modif )
        }

        axios.put(urlCall+TicketId , ticket_status)
      }

    }

    const affiche_call= (TicketId)=>{
      if(Call.length>0 && isAffiche.length>0){
        const isTicketId = isAffiche.find((item)=>item.ticket_id == TicketId)
        if(isTicketId ){
          setAffichage(Call[0])
        }else{
          setAffichage([])
        }
      }else{
        setAffichage([])
      }
    }


    const zeroStat = (TicketId )=>{

      // const dataValue = {
      //   ticket_id: TicketId , 
      //   Call_Status: 0 ,
      // }

      axios.delete(urlCall_status+TicketId )

    }

    const Switching = (id_actu , id_suivant , actu , suivant )=>{
      
      const modif_actu ={
        num_ticket_temp: suivant.num_ticket_temp ,
        motif: suivant.motif,
        ticket_status:'En attente'
      }

      const modif_suiv ={
        num_ticket_temp: actu.num_ticket_temp ,
        motif : actu.motif ,
        ticket_status: "En attente"
      }

      axios.put(urlCall+id_actu , modif_actu)
      axios.put(urlCall+id_suivant , modif_suiv)
    }





    const En_fil =(inc)=>{

      if(Call[0]){
        const callTicketId = Call[0].ticket_id

        const actu = Call[0]
        const suivant = Call[inc]
        const id_actu = actu.ticket_id
        const id_suivant = suivant.ticket_id

        let isDone = false 
        if(isAffiche.length>0){
          const searchedTicketId = isAffiche.find((item)=>item.ticket_id == callTicketId)
          if(searchedTicketId){
            const foundTicketId = searchedTicketId.ticket_id
            zeroStat(foundTicketId)
            isDone = true
          }else{
            isDone =true
          }
        }else{
          isDone=true
        }

        if(isDone){
          Switching(id_actu , id_suivant , actu , suivant)
          isDone= false
        }
      }
  
    }



    const noResp = (TicketId)=>{
      if(Call[0]){
        const isTicketId = Call.some((item)=>item.ticket_id == TicketId)
        if(isTicketId){
          axios.delete(urlCall+TicketId)
        }
      }
    }




    const fetch_status = async()=>{      
      await axios
      .get(urlCall_status)
      .then(response =>{
        const data = response.data

        if(Call.length>0){
          const callTicketId = Call[0].ticket_id 
          const filterdata = data.filter(
            (item)=> item.ticket_id == callTicketId 
          )

          const dataSt = JSON.stringify(data)
          const isAfficheSt = JSON.stringify(isAffiche)

          if(isAfficheSt !== dataSt){
            setIsAffiche(filterdata)
          }
        }else{
          setIsAffiche({})
        }  
      })
    }





    const fetchData = useCallback(() =>{
      axios
      .get(urlCall)
      .then(response =>{
        const data = response.data
        const filterdata = data.filter(
          (item)=> item.ticket_status === 'En attente' || item.ticket_status === 'En appel'
        )
        if(Call.length!==data.length || data.length == 0){
          setCall(filterdata)
        }else{
          for(let i=0 ; i<Call.length ; i++){
            if(data[i].num_ticket_temp!==Call[i].num_ticket_temp || 
            data[i].motif!==Call[i].motif || 
            data[i].ticket_status!==Call[i].ticket_status ){
              setCall(filterdata)
            }
            else{
              return
            }
          }
        }
        // setCall(filterdata)
      })
      .catch(error=>{
        console.error("error fetching :" , error)
      })
    },[])





    const display = useCallback(()=>{
      if(table && Call.length>0){
        const firstRow = table.querySelector('tbody tr:first-child')

         if(firstRow){
            const Rowdata = Array.from(firstRow.getElementsByTagName('td')).map(td =>{
               const text = td.textContent
               return text.replace('nᵒ', '').trim()
            })
            setDisp([...Rowdata])
         }
      }else if(Call.length==0){
        setDisp([])
      }
      
    } , [Call])





    useEffect(() => {
      const debounce_status = debounce(fetch_status,1000)
      debounce_status()

      return ()=>{
        debounce_status.cancel()
      }
    }, [Call]);




    return (
        <CallContext.Provider value={{ 
          Call, 
          setCall , 
          fetchData , 
          disp , 
          display , 
          affichage ,
          setAffichage ,
          setIsAffiche , 
          add_status , 
          isAffiche ,
          fetch_status , 
          urlCall_status , 
          active_call , 
          affiche_call , 
          En_Appel ,
          suivant , 
          En_fil , 
          desactive_call,
          noResp }}>
          {children}
        </CallContext.Provider>
      );

}

export const useCallData =()=>{
    return useContext(CallContext) ;
}