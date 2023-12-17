import React, { useEffect, useState } from 'react'
import '../../styleCSS/ticket.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare , faPrint} from '@fortawesome/free-solid-svg-icons'
import Ticket from '../../pages/Ticket'



export default function TicketContents({ticket , setMotif_modif }) {
  const {ticket_id ,num_ticket_temp , motif , ticket_status} = ticket
  
  function afficheForm(){
    const newTicket = document.getElementById('new_ticket')
    const modifTicket = document.getElementById('modif_ticket')
    newTicket.style.display= "none"
    modifTicket.style.display = "flex"
  }

  function affichePopUp(){
    const PopUp = document.getElementById('printCompo')
    PopUp.style.display="flex"
  }

  function onEdit(){
    // setTick(ticket)
    afficheForm()
    const label = document.getElementById('label_m')
    const id = document.getElementById('ticket_num_m')
    const motf =document.getElementById('Motif_m')
    const stat = document.getElementById('ticket_stat_m')

    const val_motif = motif
    const val_id = ticket.ticket_id
    const ticknum = num_ticket_temp
    const val_stat = ticket_status  

    label.innerText = "Ticket nᵒ"+ticknum
    id.value = val_id
    motf.value = val_motif
    stat.value = val_stat
    setMotif_modif(val_motif)
  }

  function onPrint(){
    const numero = "Ticket: nᵒ"+num_ticket_temp
    const motif_text = "Motif: "+motif
    const numero_place = document.getElementById('numero_ticket')
    const motif_place = document.getElementById('motif_ticket')
    const numero_place_print = document.getElementById('numero_ticket_print')
    const motif_place_print = document.getElementById('motif_ticket_print')
    numero_place.innerText = numero
    motif_place.innerText = motif_text
    numero_place_print.innerText = numero
    motif_place_print.innerText = motif_text
    affichePopUp()
  }



  return (
    <>
      <tr>
        <td>nᵒ {num_ticket_temp}</td>
        <td> {motif}</td>
        <td> { ticket_status } </td>
        <td> 
          <button className='btn_modif'  onClick={onEdit}> <FontAwesomeIcon icon={faPenToSquare} /></button> 
          <button className='btn_print' onClick={onPrint}  > <FontAwesomeIcon icon={faPrint} /> </button>
        </td>
      </tr>
    </>

  )
}
