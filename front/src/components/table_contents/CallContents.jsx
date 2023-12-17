import React from 'react'

export default function CallContents({call , i}) {
    const {id ,num_ticket_temp , motif , ticket_status} = call

  return (
    <>
        <tr key ={id}>
            <td>nᵒ {num_ticket_temp}</td>
            <td> {motif}</td>
            <td> { ticket_status } </td>
        </tr>
    </>
  )
}
