import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import "../../styleCSS/calls.css"
import axios from 'axios'
import CallContents from '../table_contents/CallContents'

export default function TableCall({call , fetchData }) {

   const url = "http://127.0.0.1:8000/api/tickets/"
   const table = document.getElementById('table')

   const debouncefetch = debounce(fetchData , 2000)
   

   useEffect(() => {
      debouncefetch()
      return () => {
         debouncefetch.cancel()
      };
   }, [call]);
   
   return (
      <>
         <div className='call_table_body' >
            <table className='call_table' id='table'  >
               <thead>
                  <tr>
                  <th>Ticket</th>
                  <th>Motif</th>
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
