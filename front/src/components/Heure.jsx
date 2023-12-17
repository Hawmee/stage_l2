import React, { useState } from 'react'
import '../styleCSS/heure.css'

export default function Heure() {
  const[Hr , setHr] =useState(0);
  const[Min , setMin] =useState(0); 
  const[Sec , setSec] =useState(0); 

  function AfficheHeure(){
 
    var dateTime = new Date();
    var hr = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();

    if (hr<10){
        hr ='0'+hr;
    }
    if (min<10){
        min ='0'+min;
    }
    if (sec<10){
        sec ='0'+sec;
    }
           
    // document.getElementById('hour').innerHTML = hr ; 
    // document.getElementById('minute').innerHTML = min ; 
    // document.getElementById('second').innerHTML = sec ; 
    setHr(hr);
    setMin(min);
    setSec(sec);

  }
  setInterval(AfficheHeure , 1000)

  

  return (
    <>     
      <div className='heure_container'>
        <p className='heure'>{Hr}:{Min}:{Sec}</p>
      </div>
      
    </>
  )
}
