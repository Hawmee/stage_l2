import React, { useEffect } from 'react'

export default function TableDisplay({call, setCall , fetchData}) {


   // useEffect( ()=>{
   //    fetchData()
   // },[])

   return (
      <>
         <div className='call__table_body' >
            <table className='call_table'  >
               <thead>
                  <tr>
                  <th>Ticket</th>
                  <th>dep</th>
                  <th>Ticket Status</th>
                  <th>Action</th>
                  </tr>
               </thead>
               <tbody>                 
                  {/* {
                  ticket.map((tickets ,i) =>{
                     return <TicketContents ticket={tickets} key={i} />
                  })
                  }         */}
               </tbody>
            </table>
         </div>
      </>
   )
}
