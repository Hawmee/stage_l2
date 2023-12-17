import React from 'react'
import logo from "../assets/logosmmc.png"
import "../styleCSS/popup.css"

export default function PrintTicket() {
  return (
    <div className='main_body_print'  >
        <div className='main_container_popup' id='printTicket'>
            <div className='popupBody'>
                <div id='bodyPrint'>
                    <div className='container_ticket_logo'>
                        <div className='logo_container'>
                            SMMC
                        </div>
                    </div>
                    <div id='printing'>
                        <div>
                            <p id='numero_ticket_print'>Ticket numero</p>
                            <p id='motif_ticket_print'>motif</p>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    </div>
  )
}
