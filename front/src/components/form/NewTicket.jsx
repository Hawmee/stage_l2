import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styleCSS/ticket.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from '../../contexts/ContextProvider';


export default function NewTicket({ ticket , setTicket  , scrollToBottom ,scroll , setScroll  ,setInc , motif_modif , setMotif_modif}) {

  const url = 'http://127.0.0.1:8000/api/tickets/'

  const num_base = 100
  const[ticket_num , setTicket_num] = useState(100)
  const [boolNum , setBoolNum] = useState(true)
  const [motif , setMotif] = useState('')

  const [services , setServices] = useState(null);
  const{optionsTicket} = useStateContext()

  const [autre , setAutre ] = useState(null)


  const handleChange =(selectedOption)=>{
    setServices(selectedOption)
  }

  const handleSubmitNew = (e)=>{
    e.preventDefault()
    console.log(services);
    setServices(null)
  }

  const options = [
    { value: 'chocolate', label: 'Service Logistique' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Service Logistique' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Service Logistique' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    {label:'Autre'},
  ];
  

  useEffect(()=>{
    if(boolNum){
      if(ticket.length >0){
        const index = (ticket.length - 1)
        const num_ticket_base = ticket[index].num_ticket_temp
        const existed_num = ticket.some((item)=>item.num_ticket_temp == num_ticket_base)

        if(existed_num){
          setTicket_num((ticket[index].num_ticket_temp+1))
        }else{
          setTicket_num((ticket[index].num_ticket_temp+1))
        }
        setBoolNum(false)
      }else{
        setTicket_num(100)
      }
    }
  } , [ticket])




  useEffect(()=>{

    function Reset_num_ticket(){
      var dateTime = new Date();
      var hr = dateTime.getHours();
      var min = dateTime.getMinutes();
      var sec = dateTime.getSeconds();

      if((hr===0 && min===0 && sec===0) || (hr==10 && min===32 && sec===0)){
        setBoolNum(false)
        setTicket_num(num_base)
      }
    }

    if(scroll){
      scrollToBottom() 
    }

    setInterval(Reset_num_ticket)  
  })




  useEffect(()=>{
    if(ticket.length == 0){
      setTicket_num(100)
    }
  },[ticket])

  useEffect(()=>{
    if(services && services.label == "Autre"){
      setServices({label:"Acceuil"})
    }
  },[services])


  const notify = ()=> {
    toast.error('Veuillez verifier votre saisie choisir le service correspondant à votre demande.', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      });
  }




  function afficheForm(){
    const newTicket = document.getElementById('new_ticket')
    const modifTicket = document.getElementById('modif_ticket')
    newTicket.style.display= "flex"
    modifTicket.style.display = "none"
  }




  const increment_num_ticktet =()=>{
    setTicket_num((numPrev)=> numPrev+1)
    setScroll(true)
    setBoolNum(false)
  }

  const Ajout = async (ajout_data)=>{
    try{
      const result = await axios.post(url , ajout_data)
      // setTicket((x)=>[...x , ajout_data])      
    }catch(error){
      console.log(error)
    }
  }

  const onAjout = (e)=>{
    e.preventDefault() ;
    const ticket_num = document.getElementById('ticket_num') ;
    const ticket_num_value = ticket_num.value ;

    if(services){

      const ajout_data = {
        num_ticket_temp: ticket_num_value ,
        service_name: services.label ,
        ticket_status:"En attente"
      }

      Ajout(ajout_data ) ;
      setServices(null)
      increment_num_ticktet() ;
    }else{
      notify()
    }

  }




  const Modif = async (id , updated_serv)=>{
    try{
      const result = await axios.put(url+id , updated_serv) ;
      console.log(result);
    }catch(error){
      console.log(error) ;
    }
  }
 
 
 
 
  const onUpdate =(e)=>{
    e.preventDefault()

    const id = document.getElementById('ticket_num_m') ;
    const value_id = id.value ;
    const num_ticket = document.getElementById('label_m') ;
    const value_num = num_ticket.innerText ;
    const status = document.getElementById('ticket_stat_m') ;
    const value_status = status.value ;
    const num = parseInt(value_num.replace('Ticket nᵒ',''),10) ;

    if(services){
      const update_data = {
        ticket_id : value_id ,
        num_ticket_temp: num ,
        service_name: services.label ,
        ticket_status: value_status
      }

      Modif(value_id , update_data) ;
      afficheForm() ;
      setInc(0) ;
      setServices(null)
      console.log(update_data)
    }else{
      notify()
    }

  }


  const customStyle ={
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      // boxShadow: 'none',
      border: state.isFocused ? '2px solid green' : provided.border,
      '&:hover': {
        borderColor: 'green',
      },
      boxShadow: state.isFocused ? '0 0 0 1px green' : provided.boxShadow,
      // boxShadow: state.isFocused ? null : null,
      height: '12px',
      minHeight: '32px',
      marginLeft : '12px',
      marginRight : '12px',
      padding: '0 7px ',
      maxWidth:'250px',
      width:'200px',
    }),

    // valueContainer: (provided) => ({
    //   ...provided,
    //   border: state.isFocused ? '1px solid red' : provided.border,
    //   height: '28px',
    //   padding: '0 12px'
    // }),

    input: (provided) => ({
      ...provided,
      margin: '0px',
      marginBottom: '5px' , 
      paddingTop: '5px',

    }),

    placeholder: (provided) => ({
      ...provided,
      margin: '0px',
      marginBottom: '4px' , 
      padding: 0,

    }),

    valueContainer: (provided) => ({
      ...provided,
      margin: '0px',
      marginBottom: '8px' , 
      padding: 0,

    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      // Add margin to the indicator container
      marginBottom: '10px',
      height : '30px' ,
      padding:'0px 0px' , 
      backgoundColor: 'red' ,
    }),

    menu: (provided) => ({
      ...provided,
      // Adjust the position to appear above the select input
      bottom: '100%',
      top: 'auto' ,
    }),
    menuList: (provided) => ({
      ...provided,
      // Add a max height and overflow for scrollable menu
      maxHeight: '150px',
      overflow: 'auto'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : state.isFocused ? 'lightgray' : null,
      color: "grey"
    }),
  }
  

  return (
    <div>
      <form onSubmit={onAjout} className='new_ticket' id='new_ticket'>
        <label className='label_ticket' id='label_ticket'>Ticket nᵒ{ticket_num}</label>
        <input readOnly type="text" className='ticket_num' id='ticket_num' value={ticket_num}  />
        <div className='container_motif_m'>
          {/* <input type="text" className='Motif' id='Motif' placeholder='Motif' onChange={remplir_motif}/>
          <button className='btn_delete_all' type='Button' id='btn_delete' onClick={vider_motif} > X </button> */}
            <Select
              placeholder = "Services"
              styles={customStyle}
              options={optionsTicket}
              value={services}
              onChange={handleChange}
              isClearable
            />
        </div>
        <button className='btn_add' type='submit' > <FontAwesomeIcon icon={faPlus} /> Ajouter</button>
      </form>

      <form onSubmit={onUpdate}  className='modif_ticket' id='modif_ticket'>
        <label id='label_m'>Ticket nᵒ{ticket_num}</label>
        <input readOnly type="text" className='ticket_num_m' id='ticket_num_m' />
        <input readOnly type="text" className='ticket_stat_m' id='ticket_stat_m' />
        <div className='container_motif_m'>
        <Select
              placeholder = "Services"
              styles={customStyle}
              options={optionsTicket}
              value={services}
              onChange={handleChange}
              isClearable
            />
        </div>
        <button className='btn_valider' type='submit'> Valider </button>
      </form>
      <ToastContainer />
    </div>
  )
}
