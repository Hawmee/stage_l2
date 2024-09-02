import React, { useEffect, useRef, useState } from 'react'
import { useCallData } from '../../contexts/CallContext'
// import 'speak-tts'

export default function DisplayOutput({ num , service , isAffiche}) {

  const [isDisp , setIsDisp] = useState(0)
  const [isWait , setIsWait] = useState(0)
  const ButtonRef = useRef()

  const {Call} = useCallData

  useEffect(()=>{
    if(isDisp==1){
      if(isWait==1){
        const interv = setInterval(() => {
          ButtonRef.current.click()
        }, 10000);

        return()=>{
          clearInterval(interv)
        }
      }else{
        const intervout = setTimeout(() => {
          ButtonRef.current.click()
        }, 2000)

        return()=>{
          clearTimeout(intervout)
        }
      }
    }else{
      StopAppeler()
    }
       
  }, [isDisp , isWait])

  useEffect(()=>{
    if(isAffiche.length > 0){
      if(isAffiche[0].Call_Status !== isDisp){
        setIsDisp(isAffiche[0].Call_Status)
      }
    }else{
      setIsDisp(0)
    }
  } , [isAffiche])


    const appeler = ()=>{

      let text 

      if(service == "Acceuil"){
        text = " Le Ticket:Numero"+num+", veuillez vous joindre au responsable du service"+"Aqueuil"
      }else{
        text = " Le Ticket:Numero"+num+", veuillez vous joindre au responsable du service"+service
      }

      // const text = " Le Ticket:Numero"+num+", veuillez vous joindre au responsable du service"+service
      const lecture = new SpeechSynthesisUtterance(text)

      const voices = window.speechSynthesis.getVoices();
      const originVoice = voices.find(voice=>voice.localService == true)
      const Othervoice = voices.find(voice =>voice.lang=='fr-FR' && voice.localService==true && voice.name=="Microsoft Paul - French (France)")
      const frenchVoice = voices.find(voice => voice.lang === 'fr-F')
      if (frenchVoice) {
        lecture.voice = frenchVoice
      }else if(Othervoice){
        lecture.voice= Othervoice
      }else{
        lecture.voice = originVoice
      }
      lecture.rate = 0.6;

      // console.log(voices);
      window.speechSynthesis.speak(lecture)

      if(isWait==0){
        setIsWait(1)
    }

  }

  const StopAppeler = ()=>{
    window.speechSynthesis.cancel()
    setIsWait(0)
  }


  return (
    <>
    <div>
      <div id="id_speech">
        <h3>Appel :</h3>
        <p className='point'>.</p>
        <br/>
        <p>Ticket :{num}</p>
      </div>
    </div>

    <button onClick={appeler} ref={ButtonRef} className='BtnAppel'>
      here
    </button>
  </>
  )
}
