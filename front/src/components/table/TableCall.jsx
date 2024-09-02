import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import "../../styleCSS/calls.css"
import axios from 'axios'
import CallContents from '../table_contents/CallContents'
import { ContextProvider, useStateContext } from '../../contexts/ContextProvider'
import { useCallData } from '../../contexts/CallContext'

export default function TableCall({call }) {

   const url = "http://127.0.0.1:8000/api/tickets/"
   const table = document.getElementById('table')

   const { urlCall ,Call , setCall , servName} = useCallData()


   // console.log(servName )

   const fetchData = () =>{
         axios
         .get(urlCall)
         .then(response =>{
           const data = response.data
           const filterdata = data.filter(
             (item)=> ( item.service_name == servName &&(item.ticket_status === 'En attente' || item.ticket_status === 'En appel'))
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

  }


  const debouncefetch = debounce(fetchData , 1000)
   useEffect(() => {
         debouncefetch()
         return () => {
            debouncefetch.cancel() 
         }
   }, [Call]);
      
   return (
      <>
         <div className='call_table_body' >
            <table className='call_table' id='table'  >
               <thead>
                  <tr>
                  <th>Ticket</th>
                  <th>Service visé</th>
                  <th>Status du ticket</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     call.map((calls , i)=>{
                        return( 
                           <CallContents call={calls} i={i} key={i} />
                        )
                     })
                  }
               </tbody>
            </table>
         </div>
      </>
   )
}
