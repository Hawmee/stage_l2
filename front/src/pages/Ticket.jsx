import React, { useCallback,  useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NewTicket from '../components/form/NewTicket'
import axios from 'axios'
import TableTicket from '../components/table/TableTicket'
import '../styleCSS/ticket.css'
import { useCallData } from '../contexts/CallContext'
import PopUp from '../components/PopUp'
import PrintTicket from '../components/PrintTicket'

export default function Ticket() {


  const url = 'http://127.0.0.1:8000/api/tickets/'
  const[ticket , setTicket] = useState([])
  const scrollContainerRef = useRef(null)
  const { Call, setCall  } = useCallData();
  const [scroll , setScroll] =useState(true)
  const [inc , setInc] = useState(0)
  const [motif_modif , setMotif_modif] = useState('')

  const fetchData = useCallback(()=>{
    axios
    .get(url)
    .then(response =>{
      const data = response.data 
      if(ticket.length!==data.length || data.length == 0){
        setTicket(data)
      }else{
        for(let i=0 ; i<ticket.length ; i++){
          if(data[i].num_ticket_temp!==ticket[i].num_ticket_temp || 
          data[i].motif!==ticket[i].motif || 
          data[i].ticket_status!==ticket[i].ticket_status ){
            setTicket(data)
            // console.log(ticket)
          }
          else{
            return
          }
        }
        return
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
  } , [])

  const scrolling = ()=>{
    setScroll(false)
  }

  const scrolling_out = ()=>{
    setScroll(true)
  }

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight 
    }
  }

  return (
    <>
      <div className='main_container'>
        <div className='table_container'>
            <TableTicket fetchData={fetchData}
            setTicket={setTicket}
            ticket={ticket} 
            scrollContainerRef={scrollContainerRef} 
            scrollToBottom={scrollToBottom}
            scroll={scroll}
            setScroll={setScroll} 
            scrolling={scrolling}
            scrolling_out={scrolling_out}
            inc={inc}
            setInc={setInc}
            setMotif_modif={setMotif_modif} />
        </div>
        <div className='new_ticket_container'>
            <NewTicket fetchData={fetchData} 
            setTicket={setTicket}
            ticket={ticket}  
            Call={Call}
            setCall={setCall}
            scroll={scroll}
            setScroll={setScroll}
            scrollContainerRef={scrollContainerRef} 
            scrollToBottom={scrollToBottom}
            inc={inc}
            setInc={setInc}
            motif_modif={motif_modif}
            setMotif_modif={setMotif_modif} />
        </div>
      </div>
      <PopUp />
      <PrintTicket />
    </>

  )
}
