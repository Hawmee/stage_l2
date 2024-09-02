import React from 'react'

export default function CallContents({call , i}) {
    const {id ,num_ticket_temp , service_name , ticket_status} = call

  return (
    <>
        <tr key ={id}>
            <td>nᵒ {num_ticket_temp}</td>
            <td> {service_name}</td>
            <td> { ticket_status } </td>
        </tr>
    </>
  )
}
