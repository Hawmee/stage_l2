import React, { useEffect, useState } from 'react'
import { Link , NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket,faDisplay,faBullhorn,faArrowRightFromBracket,faBars, faUser, faUserCircle, faBusinessTime } from '@fortawesome/free-solid-svg-icons'
import "../styleCSS/Header.css"
import logo from '../assets/logosmmc.png'
import Heure from './Heure';

export default function Header({onLogout , user , token }) {

  function uncheck(){
    const check_btn=document.getElementById('check')
    if(check_btn){
      check_btn.checked = false
    }
  }
  
  useEffect(()=>{
    const ticket = document.getElementById('ticket')
    const affichage = document.getElementById('affichage')
    if(token == 'user_token' && user){
      affichage.style.display = "none"
      appel.style.display = "none"
    }
  },[user , token])

  return (
    <div>
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="btn_min"><FontAwesomeIcon icon={faBars} /></label>            
            <Link to="/"><img src={logo} alt="" className="logo" /></Link>
            <Heure />
            <ul>
                <li id='ticket'>  <NavLink to="/" onClick={uncheck}> <FontAwesomeIcon icon={faTicket} id='i' />Tickets </NavLink></li>  
                <li id='affichage'>  <NavLink to="/display" onClick={uncheck} > <FontAwesomeIcon icon={faDisplay} id='i' />Affichage  </NavLink> </li>
                <li id='appel'>  <NavLink to ="/call" onClick={uncheck} > <FontAwesomeIcon icon={faBullhorn} id='i' /> Appel </NavLink></li>
                <li id='appel'>  <NavLink to ="/manager" onClick={uncheck} > <FontAwesomeIcon icon={faBusinessTime} id='i' /> Manager </NavLink></li>
                <li className="out"> <Link onClick={onLogout}> <FontAwesomeIcon icon={faArrowRightFromBracket} id='i2' />Logout </Link> </li>
            </ul>
        </nav>
    </div>
  )
}
