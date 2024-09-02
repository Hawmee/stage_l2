import React, { useState } from 'react'
import ReactToPrint from 'react-to-print'
import printJS from 'print-js'
import html2canvas from 'html2canvas';
import logo from "../assets/logosmmc.png"
import "../styleCSS/popup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

export default function PopUp() {
    const [printContent , setPrintContent]=useState(null)

    const print = (e=React.FormEvent)=>{
        const printElement = document.getElementById('printTicket');
        html2canvas(printElement).then((canvas) => {
          const dataURL = canvas.toDataURL('application/pdf');
          const newWindow = window.open('', '_blank');
          newWindow.document.body.innerHTML = `<img src="${dataURL}" style="width: 100%; height: 100%;" />`;
          newWindow.print();
          newWindow.close();
        });
    }

    const close = ()=>{
        const print_page = document.getElementById('printCompo')
        print_page.style.display="none"
    }

  return (
    <div className='main_body_popup' id='printCompo'>
        <div className='main_container_popup'>
            <div className='close_container'>
                <button className='close_popup' onClick={close}>X</button>
            </div>
            <div className='popupBody'>
                <div id='bodyPrint'>
                    <div className='container_ticket_logo'>
                        <div className='logo_container'>
                            SMMC
                        </div>
                    </div>
                    <div id='printing'>
                        <div>
                            <p id='numero_ticket'>Ticket numero</p>
                            <p id='motif_ticket'>Service : </p>
                        </div>
                    </div>
                </div>
                <ReactToPrint 
                trigger={()=> <button className='print_popup' > <FontAwesomeIcon icon={faPrint} /></button>}
                content={()=>document.getElementById('printTicket')} />
                {/* <button className='print_popup' onClick={print} >Print</button> */}
                
            </div>
        </div>
    </div>
  )
}
