import React, { useEffect, useState } from 'react'
import { useCallData } from '../contexts/CallContext';
import TableCall from '../components/table/TableCall';
import DisplayCall from '../components/display/DisplayCall';
import axios from 'axios';


export default function Call() {
  const { Call , fetchData ,disp , display , add_status ,isAffiche ,  active_call , suivant , En_fil , setAffichage} = useCallData()

  // const func = ()=>{
  //   if(Call.length!==0){
  //     if(isAffiche.length <=1 ){
  //       add_status()
  //     }
  //   }
  // }

  useEffect(()=>{
    display()
 } , [Call] )

  return (
    <>
      <div className='main_call_container'>
        <div className='call_table_main'>
          <TableCall call={Call}  fetchData={fetchData} />      
        </div>
        <div className='displayOutput'>
          <DisplayCall num={disp[0]} motif={disp[1]} isAffiche={isAffiche} activate={active_call} suivant={suivant} En_fil={En_fil} call={Call} setAffichage={setAffichage} add={add_status} />
        </div> 
      </div>
    </>
  )
}
