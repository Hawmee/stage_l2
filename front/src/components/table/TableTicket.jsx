import React, { Component, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import TicketContents from '../table_contents/TicketContents'
import axios from 'axios'
// import SimpleBar from 'simplebar-react';

export default function TableTicket({fetchData , ticket , scrollContainerRef ,scrolling  , setMotif_modif}) {

  const url = "http://127.0.0.1:8000/api/tickets"

  const debouncefetch = debounce(fetchData, 1000)

  useEffect(() => {
    debouncefetch()
    return () => {
      debouncefetch.cancel()
    };
  }, [debouncefetch]);



  return (
    <>
      <div className='ticket__table_body' ref={scrollContainerRef} onMouseEnter={scrolling} onTouchStart={scrolling} >
        <table className='ticket_table' ref={scrollContainerRef} >
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Motif</th>
              <th>Status du Ticket</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {
              ticket.map((tickets ,i) =>{
                return <TicketContents ticket={tickets} key={i} setMotif_modif={setMotif_modif} />
              })
            }        
          </tbody>
        </table>
      </div>
    </>
  )
}
