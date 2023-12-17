import React, { useEffect } from 'react'
import DisplayOutput from '../components/display/DisplayOutput';
import { useCallData } from '../contexts/CallContext';
import { debounce } from 'lodash'
import "../styleCSS/display.css"


export default function DIsplay() {
  const { affichage , affiche_call , Call , fetchData , isAffiche , setIsAffiche , display , setAffichage  } = useCallData();

  const debouncefetch = debounce(fetchData , 2000)
  useEffect(() => {
     debouncefetch()
     return () => {
        debouncefetch.cancel()
     };
  }, [Call]);

  useEffect(()=>{
    if(Call.length>0){
      const TicketId = Call[0].ticket_id
      affiche_call(TicketId)
    }else{
      setAffichage([])
    }
  },[isAffiche , Call])

  const num = affichage.num_ticket_temp ;
  const motif = affichage.motif

  return (
    <>
    <div className='main_body_display'>
      <div className='main_container_display'>
          <div className='displayBody'>
            <DisplayOutput  num={num} motif={motif} isAffiche={isAffiche} />
          </div>
      </div>
    </div>
    </>
  )
}
