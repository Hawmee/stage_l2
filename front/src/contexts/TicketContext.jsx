import { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export function useTicketContext(){
    return useContext(TicketContext)
}

export function TicketProvider([children]){
    const [ticket,setTicket] =useState([])

    return(
        <TicketContext.Provider value={{ ticket , setTicket }}>
            {children}
        </TicketContext.Provider>
    )
}